import service from "@/utils/request";
/**
 * 获取目录结构
 * @returns []
 */
export const getCatalogue = () => {
  return service({
    url: "/code/dir",
  });
};
/**
 * 获取具体文件内容
 * @param path
 * @returns string
 */
export const getContent = (path: string[]) => {
  return service({
    url: "/code/content",
    method: "post",
    data: {
      path,
    },
  });
};
/**
 * 写具体文件内容
 * @param path
 * @returns string
 */
export const setContent = (data: { filename: string; code: string }) => {
  return service({
    url: "/code/setvalue",
    method: "post",
    data,
  });
};
