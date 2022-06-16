/**
 * 自定义Http请求
 * @param url string
 * @param params obj
 * @param methods string
 */
const baseURL = "/api";
const timeout = 5;
const HTTP = (url = "", params = {}, methods = "GET") =>
  new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let data = "";
    let URL = url;
    const Token = localStorage.getItem("User");
    if (Token) {
      methods === "GET"
        ? (URL =
            url +
            getUrlParam(
              url,
              Object.assign(params, { token: JSON.parse(Token).token })
            ))
        : (data = postData(
            Object.assign(params, { token: JSON.parse(Token).token })
          ));
    } else {
      methods === "GET"
        ? (URL = url + getUrlParam(url, params))
        : (data = postData(params));
    }
    xhr.open(methods, `${baseURL + URL}`, true);
    // 发送合适的请求头信息
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // 设置请求参数
    xhr.send(data);
    xhr.onreadystatechange = () => {
      // xhr.onreadystatechange 这个函数要执行很多次
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        let response = JSON.parse(xhr.responseText);
        resolve(response);
      }
      if (xhr.status > 404) {
        reject(xhr.status);
      }
    };
    // 请求出错
    xhr.onerror = (e) => {
      console.log("请求出错");
      reject("网络超时");
    };
    xhr.timeout = timeout * 1000;
    // 请求超时
    xhr.ontimeout = (e) => {
      console.log("请求超时");
      reject("网络超时");
    };
  });

const getQueryString = (data: { [x: string]: any; token?: any }) => {
  let paramsArr: string[] = [];
  if (data instanceof Object) {
    Object.keys(data).forEach((key) => {
      let val = data[key];
      paramsArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
    });
  }
  return paramsArr.join("&");
};

const getUrlParam = (url: string | string[], data: { token?: any }) => {
  if (!data) {
    return "";
  }
  let paramsStr = data instanceof Object ? getQueryString(data) : data;
  return url.indexOf("?") !== -1 ? paramsStr : "?" + paramsStr;
};
const postData = (data: { token?: any }) => {
  if (data instanceof Object) {
    return JSON.stringify(data);
  }
  if (!data) {
    return "";
  }
  return data;
};
export default HTTP;
