export interface MenuStateInterface {
  prop: boolean;
  thismenu: String;
  uppermenu: String;
}

function state(): MenuStateInterface {
  return {
    prop: false,
    thismenu: '未定义',
    uppermenu: '主页',
  };
}

export default state;
