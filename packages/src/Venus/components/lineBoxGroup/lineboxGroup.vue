<template>
  <div class="line-box-group">
      <div class="text-box">
        <div class="text-left text">{{textArray[0]}}</div>
        <div class="text-right text">{{textArray[1]}}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "VLineboxGroup",
  data() {
    return {
      textArray: []
    };
  },
  beforeUpdate() {
    this.init();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const text = this.$slots.default[0].text;
      if (!this.compareArray(this.textArray, text.split("|"))) {
        this.textArray = text.split("|");
      }
    },
    heightMax() {},
    compareArray(source, root) {
      for (let i in root) {
        if (source[i] === root[i]) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.line-box-group {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-weight: 500;
  .text-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid black;
    margin-top: 4px;
    &:after {
      content: "";
      height: 100%;
      width: 1px;
      transform: scaleX(0.5);
      background: green;
    }
  }
  .text {
    width: 50%;
  }
}
</style>

