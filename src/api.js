const EVN = require('../config/evn');

var api1 = '/api1';
var api2 = '/api2';
var api3 = '/api3';
var apiProd1 = 'http://api.iambuyer.com'; // 生产环境使用
var apiProd2 = 'http://api.ruhexiu.com'; // 生产环境使用
var apiProd3 = 'http://img01.iambuyer.com'; // 生产环境使用
let Rhxherf = 'http://10.158.41.177:8082';

if (EVN !== 'localTest') {
  api1 = '';
  api2 = '';
  api3 = '';
  Rhxherf = 'http://item.ruhexiu.com';
}
export {api1, api2, api3, apiProd1, apiProd2, apiProd3, Rhxherf};
