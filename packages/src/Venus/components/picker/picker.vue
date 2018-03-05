<template>
      <popup ref='popup'>
        <div class="v-picker-container"  @touchmove.stop='defaultEvent'>  
          <div class="v-picker-relative">
            <div class="v-picker-sign"></div>
            <div class="v-picker-title">
              <div class="v-picker-cancel" @click='cancel()'>取消</div>
              <div class="v-picker-submit" @click='submitData()'>完成</div>
            </div>
            <div class="v-pick-body-box">
              <pickbody v-for='key in data' :data='key' v-model='key.default' :key='key.default'></pickbody>
            </div>
          </div>
        </div>
      </popup>
</template>
<script>
// 不考虑show的值 只考虑是否变化 保证变化的唯一性
/* @param array [{data:Object,default:String}]  data */
/* @param Boolean show=True||False  show  */
/* @return [param1,param2,param3....,paramN] {show:false}  model */
import pickbody from "./pickerbody";
import popup from "../popup/popup";
export default {
  name: "VPicker",
  components: { pickbody, popup },
  data() {
    return {
      keys: "1",
      dataBack: []
    };
  },
  watch: {
    show(newVal) {
      this.$refs.popup.show();
    }
  },
  mounted() {
    this.popup = !this.popup ? this.$refs.popup : this.popup;
  },
  props: {
    data: { default: "" },
    show: { default: "" }
  },
  mounted() {},
  methods: {
    cancel() {
      this.$refs.popup.close();
    },
    defaultEvent(evt) {
      evt.preventDefault();
    },
    submitData() {
      this.$refs.popup.close();
      for (let i of this.data) {
        this.dataBack.push(i.data[i.default]);
      }
      this.$emit("input", this.dataBack);
      this.dataBack = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.silder-enter-active,
.silder-leave-active {
  transition: bottom 1.5s;
}
.silder-enter,
.silder-leave-to {
  bottom: -500px !important;
}
.silder-enter-to,
.silder-leave {
  bottom: 0px !important;
}
.v-pick-body-box {
  width: 100%;
  display: flex;
}
.v-picker-sign {
  width: 100%;
  height: 70px;
  background: #888;
  opacity: 0.7;
  position: absolute;
  top: 50%;
  left: 0%;
}
.v-picker-relative {
  position: relative;
  padding-top: 70px;
}
.v-picker-box {
  width: 100%;
  height: 500px;
  position: relative;
  bottom: 0;
  left: 0;
}
.v-picker-container {
  overflow: hidden;
  background: #fff;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.v-picker-title {
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #fff;
  border-top: 1px solid #999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #999;
}
</style>
