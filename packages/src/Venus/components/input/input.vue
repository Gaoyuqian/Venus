<template>
<div :class='[boxCls]' >
    <label :class='[labCls]' for='v-input'  v-if='label'>{{label}}</label>
  <input :class='[cls]' :maxlength="max" @focus='beginEventHandel("focus")' @blur='beginEventHandel("blur")' :type='type' :value='value' @input='changeValue' :placeholder="placeholder">
</div>
</template>
<style lang="scss" scoped>
.v-input-box {
  background: #fff;
  display: flex;
  white-space: nowrap;
  align-items: center;
  font-size: 32px;
  padding: 0 20px;
  .v-input-label {
  }
}
.v-input-box-underline {
  border: none;
  border-bottom: 2px solid #888;
}
.v-input {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-radius: 0;
  padding-left: 30px;
}
::-webkit-input-placeholder {
  color: #888888;
  cursor: default;
  font-size: 24px;
}
.v-input-right {
  text-align: right;
}
.v-input-box-isnull {
  border-color: red;
}
</style>

<script>
//暂不支持前面插入图片吧 以后支持
//校验考虑支持，下一版在做
//做校验需要在校验成功之后 调用alertinfo组件显示信息
//必填选填判断
import Valert from "../../components/alert/alert";
import util from "../../_tool/util";
export default {
  name: "VInput",
  components: { Valert },
  props: {
    underline: { type: Boolean, default: false },
    begin: { type: String, default: "left" },
    label: { type: String, default: null },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String
    },
    max: {
      type: String,
      default: "50"
    },
    placeholder: {
      type: String,
      default: ""
    },
    verify: {
      type: Boolean,
      default: false
    },
    options: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  data() {
    return {
      isNull: !!this.value,
      notTel: false
    };
  },
  watch: {
    value: function() {
      if (this.options) return;
      this.isNull = !!this.value;
    }
  },
  computed: {
    boxCls() {
      var boxCls = ["v-input-box"];
      this.underline && boxCls.push(`v-input-box-underline`);
      if (!this.options)
        (!this.isNull || this.notTel) && boxCls.push(`v-input-box-isnull`); //增加选填判断

      return boxCls;
    },
    cls() {
      var cls = ["v-input"];
      cls.push(`v-input-${this.begin}`);
      return cls;
    },
    labCls() {
      var labCls = ["v-input-label"];
      return labCls;
    }
  },
  methods: {
    beginEventHandel(evt) {
      this.$emit(evt);
    },
    changeValue: function(evt) {
      let _target = evt.target.value;
      if (this.type === "num") {
        _target = _target.replace(/[^\d]/g, "");
      }
      if (this.type === "tel") {
        //改成mobile吧
        this.notTel = false;
        if (parseInt(_target.length) >= 11 && !util.checkMobile(_target)) {
          this.notTel = true;
          // this.showAlert("请输入正确的手机号", 3000);
        }
      }
      this.$emit("input", _target);
    }
  }
};
</script>
