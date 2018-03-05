<template>
<transition name="fade">
<div :class='[cls]' v-if='msgShow'>
 {{text}}
</div>
</transition>
</template>
<script>
/*
  @method this.$message({'text':String,'type':String})
 */
export default {
  name: "VMEssage",
  data() {
    return {
      // time: "",
      msgShow: false,
      text: "",
      type: ""
    };
  },
  props: {},
  methods: {
    closed() {
      if (time) clearTimeout(time);
      if (this.msgShow) {
        var time = setTimeout(() => {
          this.msgShow = false;
        }, 3000);
      }
    }
  },
  computed: {
    cls: function() {
      var cls = [];
      cls.push("v-msg");
      ["warn", "error", "info", "default"].forEach(i => {
        if (i === this.type) cls.push(`v-msg-${this.type}`);
      });
      return cls;
    }
  },
  mounted() {
    this.msgShow = true;
    this.closed();
  }
};
</script>
<style lang="scss" scoped>
.v-msg-error {
  background: #fee !important;
  color: #fa5555 !important;
}
.v-msg-warn {
  background: oldlace !important;
  color: #eb9e05 !important;
}
.v-msg-info {
  background: #edf2fc !important;
  color: #878d99 !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: top 0.5s;
}
.fade-enter,
.fade-leave-to {
  top: -130px !important;
}
.fade-enter-to,
.fade-leave {
  top: 30px !important;
}
.v-msg {
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 0px 3px skyblue inset;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(255, 255, 255, 0.9);
}
</style>
