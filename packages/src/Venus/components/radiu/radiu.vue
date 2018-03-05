<template>
    <div class='v-radius-label'>
      <label for="v-rad"><slot></slot></label>
      <div :class='[cls_d]' @click='cliClick'>
        <span @click='cliClick' :class='[cls_s]'></span>
      </div>
    </div>
</template>
<script>
export default {
  name: "VRadiu",
  data() {
    return {
      enter_animation: false,
      value_copy: this.value
    };
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
    value: Boolean
  },
  watch: {
    value: function() {
      this.cliClick();
    }
  },
  methods: {
    cliClick: function(evt) {
      if (this.enter_animation) return;
      this.enter_animation = true;
      this.value_copy = !this.value_copy;
      this.$emit("input", this.value_copy);
      evt && evt.stopPropagation();
      setTimeout(() => {
        this.enter_animation = false;
      }, 500);
    }
  },
  computed: {
    cls_d: function() {
      let cls = ["v-rad"];
      if (this.value_copy) {
        cls.push(`v-rad-cli-bg`);
      }
      return cls;
    },
    cls_s: function() {
      let cls = ["v-rad-cli"];
      this.value_copy
        ? cls.push(`v-rad-cli-right`)
        : cls.push(`v-rad-cli-left`);
      return cls;
    }
  },
  mounted() {
    this.enter_animation = this.disabled;
  }
};
</script>
<style lang="scss" scoped>
.v-radius-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}
.v-rad-cli-bg {
  background: rgba(176, 224, 230, 1) !important;
}
.v-rad {
  height: 1.5rem;
  width: 3rem;
  border-radius: 1rem;
  position: relative;
  border: 4px solid #888;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  .v-rad-cli {
    display: inline-block;
    width: 50%;
    height: 100%;
    background: rgba(232, 122, 144, 1);
    border: 1px solid #fff;
    border-radius: 50%;
    transition: all 0.5s;
  }
  .v-rad-cli-right {
    position: absolute;
    left: 100%;
    top: 0;
    transform: translate(-100%, 0%);
  }
  .v-rad-cli-left {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

