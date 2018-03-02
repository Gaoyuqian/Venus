<template>
  <div :class="[cls]">
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>
      <i class='loading-body'></i>                                           
  </div>
</template>
<script>
export default {
  props: { size: { default: "large", type: String } },
  computed: {
    cls() {
      var cls = [];
      cls.push(`loading-${this.size}`);
      return cls;
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-large {
  width: 80px;
  height: 80px;
  position: relative;
}
.loading-middle {
  width: 56px;
  height: 56px;
  position: relative;
}
.loading-small {
  width: 48px;
  height: 48px;
  position: relative;
}
.loading-body {
  width: 4px;
  height: 25%;
  background: black;
  position: absolute;
  top: 37%;
  left: 46%;
  opacity: 0.25;
  animation: change 1s linear infinite;
}
@keyframes change {
  0% {
    opacity: 0.85;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 0.25;
  }
}
.loading-body:first-child {
  animation-delay: 0s;
  transform: rotate(0deg) translateY(-150%);
}
.loading-body:nth-child(2) {
  animation-delay: 0.083s;
  transform: rotate(30deg) translateY(-150%);
}
.loading-body:nth-child(3) {
  animation-delay: 0.083*2s;

  transform: rotate(60deg) translateY(-150%);
}
.loading-body:nth-child(4) {
  animation-delay: 0.083*3s;

  transform: rotate(90deg) translateY(-150%);
}
.loading-body:nth-child(5) {
  animation-delay: 0.083*4s;

  transform: rotate(120deg) translateY(-150%);
}
.loading-body:nth-child(6) {
  animation-delay: 0.083*5s;

  transform: rotate(150deg) translateY(-150%);
}
.loading-body:nth-child(7) {
  animation-delay: 0.083*6s;

  transform: rotate(180deg) translateY(-150%);
}
.loading-body:nth-child(8) {
  animation-delay: 0.083*7s;

  transform: rotate(210deg) translateY(-150%);
}
.loading-body:nth-child(9) {
  animation-delay: 0.083*8s;

  transform: rotate(240deg) translateY(-150%);
}
.loading-body:nth-child(10) {
  animation-delay: 0.083*9s;

  transform: rotate(270deg) translateY(-150%);
}
.loading-body:nth-child(11) {
  animation-delay: 0.083*10s;

  transform: rotate(300deg) translateY(-150%);
}
.loading-body:nth-child(12) {
  animation-delay: 0.083*11s;

  transform: rotate(330deg) translateY(-150%);
}
</style>
