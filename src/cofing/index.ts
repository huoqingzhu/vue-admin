const dev = import.meta.env?.DEV || false;
/**
 * svg线上地址
 */
export const IconUrl = "//at.alicdn.com/t/font_2666006_4wstfs1wjv.js";
/**
 * 配置url路径
 */
export const url = dev ? "http://localhost:8888" : window.location.origin;
// 配置后台管理颜色
export const variables = {
  menuText: "#fff",
  menuActiveText: "#fff",
  subMenuActiveText: "#f4f4f5",
  menuBg: "#3f8cff",
  menuHover: "#263445",
  subMenuBg: "#1f2d3d",
  subMenuHover: "#001528",
  sideBarWidth: "210px",
  navbarBg: "#3f8cff",
  navbarText: "#fff",
};
// 编辑器字号
export const codeFontSizeList = [12, 14, 16, 18, 20, 22, 24].map((item) => {
  return {
    name: item + "px",
    value: item,
  };
});
/**
 * 文件名对应的处理语言
 */
export const fileTypes = {
  css: "css",
  scss: "css",
  less: "css",
  js: "javascript",
  json: "json",
  md: "markdown",
  mjs: "javascript",
  ts: "typescript",
  vue: "html",
  html: "html",
};
/**
 * 文件名对应的图标
 */
export const iconTypes = {
  css: "icon-css",
  scss: "icon-scss",
  less: "icon-scss",
  js: "icon-JavaScript",
  json: "icon-JSON",
  md: "icon-markdown",
  mjs: "javascript",
  ts: "icon-typescript-def",
  vue: "icon-Vue",
  html: "icon-html",
  xls: "icon-XSLtubiao",
  jpg: "icon-jpg",
  png: "icon-png",
  ico: "icon-Vue",
  git: "icon-png",
};
// 默认的Code界面主题配置
// https://code.visualstudio.com/api/references/theme-color
export const defaultViewThemeConfig = {
  // 侧边栏#侧边栏背景颜色
  "--sideBar-background": ["#333333"],
  //  侧栏边框颜色
  "--sideBar-border": ["#b2cffb3a"],
  // 标题栏背景颜色
  "--header-background": [
    "titleBar.activeBackground",
    "titleBar.inactiveBackground",
    "#1e1f26",
  ],
  // 标题栏logo颜色
  "--header-logo-color": [
    "titleBar.activeForeground",
    "titleBar.inactiveForeground",
    "#fff",
  ],

  // 标题栏按钮的背景颜色
  "--header-btn-background": ["none"],
  // 标题栏的按钮边框颜色
  "--header-btn-border-color": ["titleBar.activeForeground", "#444857"],
  // 标题栏的按钮颜色
  "--header-btn-color": ["titleBar.activeForeground", "#fff"],

  // 标题栏的下拉菜单的背景颜色
  "--dropdown-background": [
    "menu.background",
    "dropdown.background",
    "#1e1f26",
  ],
  // 标题栏的下拉菜单的边框颜色
  "--dropdown-box-border-color": ["menu.border", "dropdown.border", "none"],
  // 标题栏的下拉菜单的颜色
  "--dropdown-color": ["menu.foreground", "dropdown.foreground", "#fff"],
  // 标题栏的下拉菜单hover时的背景颜色
  "--dropdown-hover-background": ["menu.selectionBackground", "#5a5f73"],
  // 标题栏的下拉菜单hover时的颜色
  "--dropdown-hover-color": ["menu.selectionForeground", "#fff"],

  // 拖动条的背景颜色
  "--touch-bar-background": [
    "scrollbarSlider.background",
    "scrollbarSlider.activeBackground",
    "scrollbarSlider.hoverBackground",
    "#333642",
  ],
  // 拖动条左/上边框颜色
  "--touch-bar-border-left-color": [
    "menu.separatorBackground",
    "rgba(255, 255, 255, 0.05)",
  ],
  // 拖动条右/下边框颜色
  "--touch-bar-border-right-color": [
    "menu.separatorBackground",
    "rgba(0, 0, 0, 0.4)",
  ],

  // 编辑器背景颜色
  "--editor-background": ["editor.background", "#1d1e22"],
  // 编辑器标题栏的背景颜色
  "--editor-header-background": [
    "editorGroupHeader.tabsBackground",
    "editor.background",
    "#1d1e22",
  ],
  // 编辑器标题栏的标题颜色
  "--editor-header-title-color": [
    "tab.activeForeground",
    "editor.foreground",
    "#aaaebc",
  ],
  // 编辑器标题栏的其他部分颜色
  "--editor-header-color": [
    "tab.activeForeground",
    "editor.foreground",
    "#606266",
  ],
  // 编辑器标题栏下边框颜色
  "--editor-header-border-bottom-color": [
    "editorGroup.border",
    "editorGroupHeader.tabsBorder",
    "rgba(255, 255, 255, 0.05)",
  ],

  // 控制台背景颜色
  "--console-background": [
    "panel.background",
    "terminal.background",
    "#131417",
  ],
  // 命令输入栏背景颜色
  "--command-background": ["terminal.background", "rgba(255, 255, 255, 0.1)"],
  // 命令输入栏颜色
  "--command-color": ["terminal.foreground", "#fff"],
};
