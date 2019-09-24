
let isWeiXinFn = () => { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1; };
let isWeiXin;
if (isWeiXinFn()) {
  isWeiXin = true;
  localStorage.setItem('browserType', 'WX');
} else {
  isWeiXin = false;
  localStorage.setItem('browserType', 'FWX');
};
export {isWeiXin};
