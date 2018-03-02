<template>
   <div class="v-picker-body" @touchend.stop='touchend' @touchstart.stop='touchstart' @touchmove.stop='touchmove'>
      <div :class="[cls]" v-for='key in data.data'>{{key}}</div>
    </div>
</template>
<style lang="scss" scoped>
.v-picker-body {
  width: 100%;
  height: 420px;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: #555;
}
.prev-1 {
  color: #888;
  transform: rotateX(-25deg);
}
.prev-2 {
  color: #777;
  transform: rotateX(-50deg);
  
}
.prev-3 {
  color: #666;
  transform: rotateX(-75deg);
  
}
.prev-4 {
  font-size: 35px;
  color: #555;
  transform: rotateX(-100deg);
  
}
.prev-0 {
  font-size: 38px;
  color: #000;
}
</style>
<script>
export default {
  data() {
    return {
      startPoint: { x: "", y: "" },
      endPoint: { x: "", y: "" },
      bodyEle: "",
      distance: 0,
      lastDistance: 0,
      totalDistance: 0,
      selectIndex: 0,
      partHeight: 0
    };
  },
  props: {
    part: {
      default: 6
    },
    default: {},
    data: {}
  },
  computed: {
    cls() {
      var cls = [];
      cls.push("content");
      return cls;
    }
  },
  mounted() {
    setTimeout(() => {
      if (!this.parentsEle) {
        this.parentsEle = document.querySelectorAll(".v-picker-body");
      }
      if (!this.bodyEle) {
        this.bodyEle = document.querySelectorAll(".content");
      }
      if (!this.partHeight) {
        this.partHeight = this.$el.clientHeight / parseInt(this.part);
      }
      for (var i of this.bodyEle) {
        i.style.height = `${this.partHeight}px`;
      }
      this.lastDistance =
        this.$el.clientHeight / 2 -
        this.partHeight * (this.data.default || 0) -
        this.partHeight / 2;
      const lock = async () => {
        await this.animated();
      };
      lock();
    }, 0);
  },
  watch: {},
  methods: {
    touchstart(evt) {
      this.startPoint.x = evt.changedTouches[0].clientX;
      this.startPoint.y = evt.changedTouches[0].clientY;
      evt.preventDefault();
    },
    touchmove(evt) {
      this.endPoint.x = evt.changedTouches[0].clientX;
      this.endPoint.y = evt.changedTouches[0].clientY;
      this.distance = parseInt(this.endPoint.y - this.startPoint.y);
      this.animated(this.distance > 0);
      evt.preventDefault();
    },
    touchend(evt) {
      if (this.isOverFlow() === "up" || this.isOverFlow() === "down") {
        if (this.isOverFlow() === "up") {
          this.totalDistance = this.lastDistance = this.$el.clientHeight / 2;
        } else {
          this.totalDistance = this.lastDistance =
            this.$el.clientHeight / 2 - this.$el.scrollHeight + this.partHeight;
        }
      } else if (this.isOverFlow() === "notOverFlow") {
        this.lastDistance += this.distance;
      }
      //最后校准
      this.selectIndex = Math.abs(
        Math.round(
          (this.totalDistance - this.$el.clientHeight / 2) / this.partHeight
        )
      );
      this.totalDistance =
        -this.selectIndex * this.partHeight +
        this.$el.clientHeight / 2 -
        this.partHeight / 2;
      this.$el.style.transform = `translateY(${this.totalDistance}px)`;
      this.$el.style.transition = "all .5s";
      this.distance = 0;
      this.getData();
      evt.preventDefault();
    },
    getData() {
      this.$emit("input", this.selectIndex);
    },
    isOverFlow() {
      if (this.totalDistance >= this.$el.clientHeight / 2) {
        return "up";
      } else if (
        this.totalDistance <=
        this.$el.clientHeight / 2 - this.$el.scrollHeight + this.partHeight
      ) {
        return "down";
      }
      return "notOverFlow";
    },
    round(num) {
      num = Math.abs(num);
      return num > 1.7777 ? parseInt(num) : parseInt(num) + 1;
    },
    animated(type) {
      this.$el.style.transition = "";
      this.totalDistance = this.distance + this.lastDistance;
      this.$el.style.transform = `translateY(${this.totalDistance}px)`;
      if (this.isOverFlow() === "up" || this.isOverFlow() === "down") {
        if (this.isOverFlow() === "up") {
          this.selectIndex = 0;
        } else {
          this.selectIndex = this.$el.children.length - 1;
        }
      } else if (this.isOverFlow() === "notOverFlow") {
        this.selectIndex = Math.abs(
          Math.round(
            (this.totalDistance - this.$el.clientHeight / 2) / this.partHeight
          )
        );
      }
      for (let i of this.$el.children) {
        i.classList.remove(`prev-1`, `prev-2`, `prev-3`, `prev-4`, `prev-0`);
      }
      this.$el.children[this.selectIndex].classList.add(`prev-0`);
      [1, 2, 3, 4].forEach(i => {
        if (this.$el.children[this.selectIndex + i]) {
          this.$el.children[this.selectIndex + i].classList.add(`prev-${i}`);
        }
        if (this.$el.children[this.selectIndex - i]) {
          this.$el.children[this.selectIndex - i].classList.add(`prev-${i}`);
        }
      });
      /*
        0.将接收一个数组，作为滑动的数据源。
        1.初始化状态时，第一个元素应该位于整个body的中间部分，也就是会有一个默认的translateY,ok
        2.滑动的时候，会有一个滑动界限，也就是如果超出这个界限，将停止滑动,ok
        3.滑动时以块为单位,ok  其中6暂时可以不改，应改为 可控的数量
        4.惯性滑动 浏览器会自己解决 通过触发多次touch事件解决
        5.选择后记录当前位置？方便下次初始化时，定位到上次滑动的位置。在touchend时计算当前选中目标
        6.类圆筒型
        7,亟待解决   滑动到超过上限或者下限时  当前prev-0位置错误！！！ 已改
        8.取范围的时候，有点不太准确 目前已解决
      */
    }
  }
};
</script>
