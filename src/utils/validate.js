/* 校验方法库-- 命名格式：isSomeName, 函数传要校验的value, 返回值为布尔值 */
export default {
  methods: {
    /**
     * 非空校验
     * @param  {[ ]}
     * @return {Boolean}
     */
    isNoEmpty: function (value) {
      return !!value;
    },
    /**
     * 工作单位校验
     * @param  {[type]}
     * @return {Boolean}
     */
    isHid: function (id) {
      // var reg = /^[a-zA-Z0-9]{7,20}$/;
      var reg = /^.{3,18}$/;
      return reg.test(id);
    },
    /**
     * 职务名称校验
     * @param  {[type]}
     * @return {Boolean}
     */
    isPost: function (id) {
      var reg = /^.{0,60}$/;
      return reg.test(id);
    },
    /**
     * 姓名校验
     * @param  {string}
     * @return {Boolean}
     */
    isName: function (name) {
      var l = 0;
      var a = name.split('');
      for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
          l++;
        } else {
          l += 2;
        }
      }
      var isp = new RegExp(/^([A-Za-z]|[\u00B7]|[\u4E00-\u9FA5])*$/).test(name);
      var name2 = name.replace(/[·]/g, 0);
      var isp2 = new RegExp(/[.．。，、?]/g).test(name);
      var isp4 = new RegExp(/^(([A-Za-z]|[\u00B7]|[\u4E00-\u9FA5])+0)*([A-Za-z]|[\u00B7]|[\u4E00-\u9FA5])+$/).test(name2);
      if (l < 3 || l > 27 || !isp || isp2 || !isp4) {
        return false;
      }
      return true;
    },
    /**
     * 年龄校验
     * @param  {string}
     * @return {Boolean}
     */
    isAge: function (age) {
      var re = /^[1-9]{1}[0-9]{1,2}$/;
      var intAge = age * 1;
      if (re.test(age) && intAge > 29 && intAge < 121) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 电话号码校验
     * @param  {String}
     * @return {Boolean}
     */
    isPhoneNum: function (phoneNumber) {
      var reg = /^[0-9]{0,18}$/;
      return reg.test(phoneNumber);
    },
    /**
     * 邮箱验证
     * @param  {string}
     * @return {Boolean}
     */
    isEmail: function (value) {
      if (value === '无') {
        return true;
      };
      if (value !== '' && value !== '无') {
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return reg.test(value);
      };
    },
    /**
     * 居住地址校验
     * @param  {string}
     * @return {Boolean}
     */
    isAddress: function (address) {
      var strlen = 0;
      for (var i = 0; i < address.length; i++) {
        if (address.charCodeAt(i) > 255) strlen++;
      }
      if (strlen < 4 || address.length >= 120) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * 电话号码校验
     * @param  {String}
     * @return {Boolean}
     */
    isPhoneNumJ: function (phoneNumber) {
      if (phoneNumber === '无') {
        return true;
      };
      if (phoneNumber !== '' && phoneNumber !== '无') {
        var reg = /^[0-9]{0,18}$/;
        return reg.test(phoneNumber);
      };
    },
    isBooblean: function (value) {
      return value;
    }
  }
};
