export default{
    checkMobile: function (value) {
        let phoneReg = /^(1[3-9]{1}\d{9})$/
        if (phoneReg.test(value)) {
          return true
        } else {
          return false
        }
      },
}
