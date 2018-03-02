<template>
      <transition name='silder'>
        <div class="v-popup"  v-if='showTest'><slot></slot></div>
    </transition>    
</template>
<style lang="scss" scoped>
.v-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.silder-enter-active,
.silder-leave-active {
  transition: bottom 1.5s;
}
.silder-enter,
.silder-leave-to {
  bottom: -700px !important;
}
.silder-enter-to,
.silder-leave {
  bottom: 0px !important;
}
</style>
<script>
/*
    主要负责控制【被定位的】组件【显／隐性】或传递组件值;
    子组件可通过事件改变显隐性
    popup是子组件！！！  传到root上至少得两个事件！！

    picker给一个props和一个event 传递显隐性值

*/
export default {
  data() {
    return {
      showTest: false,
      data: ""
    };
  },
  props: { value: { type: Boolean } },
  watched: {},
  methods: {
    show() {
      this.showTest = true;
    },
    close() {
      this.showTest = false;
    },
    getdata() {}
  }
};
</script>


