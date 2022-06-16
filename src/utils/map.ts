export default {
  name: "gps",

  PI: 3.14159265358979324,
  x_pi: (3.14159265358979324 * 3000.0) / 180.0,

  //偏移量
  delta(lng: number, lat: number) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    let dLat = this.transformLat(lng - 105.0, lat - 35.0);
    let dLng = this.transformLon(lng - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * this.PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * this.PI);
    dLng = (dLng * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * this.PI);
    return { lat: dLat, lng: dLng };
  },

  gps_baidu(wgsLng: any, wgsLat: any) {
    let point = this.gps_gaode(wgsLng, wgsLat);
    return this.gaode_baidu(point.lng, point.lat);
  },

  //WGS-84 to GCJ-02 大地坐标系转火星坐标系
  gps_gaode(wgsLng: number, wgsLat: number) {
    if (this.outOfChina(wgsLng, wgsLat)) {
      return { lat: wgsLat, lng: wgsLng };
    }

    let d = this.delta(wgsLng, wgsLat);
    //@ts-ignore
    return {
      lat: parseFloat(wgsLat) + parseFloat(d.lat),
      lng: parseFloat(wgsLng) + parseFloat(d.lng),
    };
  },
  //GCJ-02 to WGS-84 火星坐标系转大地坐标系
  gaode_gps(gcjLng: number, gcjLat: number) {
    if (this.outOfChina(gcjLng, gcjLat)) {
      return { lat: gcjLat, lng: gcjLng };
    }

    let d = this.delta(gcjLng, gcjLat);
    return { lat: gcjLat - d.lat, lng: gcjLng - d.lng };
  },
  //GCJ-02 to WGS-84 exactly
  gaode_gps_exact(gcjLng: number, gcjLat: number) {
    let initDelta = 0.01;
    let threshold = 0.000000001;
    let dLat = initDelta,
      dLng = initDelta;
    let mLat = gcjLat - dLat,
      mLng = gcjLng - dLng;
    let pLat = gcjLat + dLat,
      pLng = gcjLng + dLng;
    let wgsLat,
      wgsLng,
      i = 0;
    while (1) {
      wgsLat = (mLat + pLat) / 2;
      wgsLng = (mLng + pLng) / 2;
      //@ts-ignore
      let tmp = this.gcj_encrypt(wgsLng, wgsLat);
      dLat = tmp.lat - gcjLat;
      dLng = tmp.lng - gcjLng;
      if (Math.abs(dLat) < threshold && Math.abs(dLng) < threshold) {
        break;
      }

      if (dLat > 0) pLat = wgsLat;
      else mLat = wgsLat;
      if (dLng > 0) pLng = wgsLng;
      else mLng = wgsLng;

      if (++i > 10000) break;
    }
    //console.log(i);
    return { lat: wgsLat, lng: wgsLng };
  },
  //GCJ-02 to BD-09 火星坐标系转百度坐标系
  gaode_baidu(gcjLng: any, gcjLat: any) {
    let x = gcjLng,
      y = gcjLat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    let bdLng = z * Math.cos(theta) + 0.0065;
    let bdLat = z * Math.sin(theta) + 0.006;
    return { lat: bdLat, lng: bdLng };
  },
  //BD-09 to GCJ-02
  baidu_gaode(bdLng: number, bdLat: number) {
    let x = bdLng - 0.0065,
      y = bdLat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
    let gcjLng = z * Math.cos(theta);
    let gcjLat = z * Math.sin(theta);
    return { lat: gcjLat, lng: gcjLng };
  },
  //WGS-84 to Web mercator 大地坐标系转墨卡托坐标系
  //mercatorLat -> y mercatorLon -> x
  mercator_encrypt(wgsLng: number, wgsLat: number) {
    let x = (wgsLng * 20037508.34) / 180;
    let y =
      Math.log(Math.tan(((90 + wgsLat) * this.PI) / 360)) / (this.PI / 180);
    y = (y * 20037508.34) / 180;
    return { lat: y, lng: x };
    /*
     if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
     return null;
     let x = 6378137.0 * wgsLon * 0.017453292519943295;
     let a = wgsLat * 0.017453292519943295;
     let y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
     return {'lat' : y, 'lon' : x};
     //*/
  },

  // Web mercator to WGS-84
  // mercatorLat -> y mercatorLon -> x

  mercator_decrypt(mercatorLat: number, mercatorLng: number) {
    let x = (mercatorLng / 20037508.34) * 180;
    let y = (mercatorLat / 20037508.34) * 180;
    y =
      (180 / this.PI) *
      (2 * Math.atan(Math.exp((y * this.PI) / 180)) - this.PI / 2);
    return { lat: y, lng: x };
    /*
     if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
     return null;
     if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
     return null;
     let a = mercatorLon / 6378137.0 * 57.295779513082323;
     let x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
     let y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
     return {'lat' : y, 'lon' : x};
     //*/
  },
  // two point's distance
  distance(latA: number, lngA: number, latB: number, lngB: number) {
    let earthR = 6371000;
    let x =
      Math.cos((latA * this.PI) / 180) *
      Math.cos((latB * this.PI) / 180) *
      Math.cos(((lngA - lngB) * this.PI) / 180);
    let y = Math.sin((latA * this.PI) / 180) * Math.sin((latB * this.PI) / 180);
    let s = x + y;
    if (s > 1) s = 1;
    if (s < -1) s = -1;
    let alpha = Math.acos(s);
    return alpha * earthR;
  },
  //是否在中国
  outOfChina(lng: number, lat: number) {
    if (lng < 72.004 || lng > 137.8347) {
      return true;
    }
    if (lat < 0.8293 || lat > 55.8271) {
      return true;
    }
    return false;
  },
  transformLat(x: number, y: number) {
    let ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin((y / 3.0) * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * this.PI) +
        320 * Math.sin((y * this.PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  },
  transformLon(x: number, y: number) {
    let ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin((x / 3.0) * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * this.PI) +
        300.0 * Math.sin((x / 30.0) * this.PI)) *
        2.0) /
      3.0;
    return ret;
  },

  /*
   * 批量GPS数据转换
   * */
  gpsConvert(data: any[]) {
    let arr: {}[] = [];
    if (data && data.length > 0) {
      data.forEach((item: { lng: number; lat: number }) => {
        let point: { lng: number; lat: number };
        let newPoint: { lng: number; lat: number };
        point = item;
        newPoint = this.gps_baidu(item.lng, item.lat);
        point.lng = newPoint.lng;
        point.lat = newPoint.lat;
        arr.push(point);
      });
    }
    return arr;
  },
};
