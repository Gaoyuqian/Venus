<template>
<transition name="fade">
  <div :class='[cls]' v-show='value' @click.stop='close' >
      <div :class='[cls_body]' >
          <div class="v-model-title" v-if='title'>{{title}}</div>        
          <slot></slot>
          <div class="v-model-footer">
              <slot name='footer'></slot>            
          </div>
      </div>
  </div>
  </transition>
</template>
<script>
/*
  建议所有子节点的width为100%;或使用组件【
*/
export default {
  name: "VModel",
  computed: {
    cls() {
      var cls = [];
      cls.push("v-model-panel");
      return cls;
    },
    cls_body() {
      var cls_body = [];
      cls_body.push("v-model-body");
      return cls_body;
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
    }
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {
    for (let i of document.querySelectorAll(".v-model-body")[0].children) {
      i.style.marginTop = `${this.marginTop}px`;
      i.style.marginBottom = `${this.marginBottom}px`;
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    marginTop: {
      default: "10",
      type: String
    },
    marginBottom: {
      default: "10",
      type: String
    },
    title: {
      default: "默认标题",
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.v-alert-box {
  .v-alert-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.v-model-title {
  text-align: left;
}
.v-model-footer {
  width: 100%;
  text-align: right;
  // display: flex;
  // justify-content: flex-end;
}
.v-model-footer div {
  background-color: red;
}
.v-model-panel {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999999;
}
.v-model-body {
  background: #fff;
  color: #000;
  padding: 40px;
  width: 80%;
  box-sizing: border-box;
  // border: 1px solid #000;
}
</style>

