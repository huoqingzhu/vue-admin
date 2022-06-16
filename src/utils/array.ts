/**
 * set 去重 {}对象无法去掉
 * @param arr
 */
export const uniqueSet = (arr: any[]): any[] => Array.from(new Set(arr));
/**
 * 双层for循环splice NaN和{}没有去重
 * @param arr
 */
export const uniqueSplice = (arr: any[]): any[] => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        // 第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
};
/**
 *  新建一个空数组 利用indexOf循环加入不重复元素  NaN、{}不能去重
 * @param arr
 * @returns
 */
export const uniqueIndexOf = (arr: any[]): any[] => {
  let array = [];
  for (let i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
};
/**
 *  新建一个空数组 利用includes循环加入不重复元素  {}不能去重
 * @param arr
 * @returns
 */
export const uniqueIncludes = (arr: any[]): any[] => {
  if (!Array.isArray(arr)) {
    return arr;
  }
  let array: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {
      // includes 检测数组是否有某个值
      array.push(arr[i]);
    }
  }
  return array;
};
/**
 *  利用hasOwnProperty 判断是否存在对象属性
 * @param arr
 * @returns
 */
export const uniqueHasOwnProperty = (arr: any[]): any[] => {
  const obj: any = {};
  return arr.filter((item) =>
    obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true)
  );
};
