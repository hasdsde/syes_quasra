export interface MenuStateInterface {
  prop: boolean;
  thismenu: String;
  uppermenu: String;

}

function state(): MenuStateInterface {
  return {
    prop: false,
    thismenu: 'undefined',
    uppermenu: 'undefined'
  };
}

export default state;
