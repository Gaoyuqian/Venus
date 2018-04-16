<template>
    <div class="v-slide">
        <div class="slide-box"  ref='box'>
            <div class="slide-pannel" ref='item'>
              <img class="slide" :src='item' v-for='item in data' :alt='item' title='item' :key='item'>
            </div>
        </div>
        <div class="selectBox" @click='selectSlide' ref='select'>
          <div class="num" v-for='i in data.length-2' :key='i' :data='i'></div>
        </div>
    </div>
</template>
<script>
export default {
  name: "VSlide",
  data() {
    return {
      windowWidth: 0,
      length: 0,
      start: { startX: "", startY: "" },
      end: { endX: "", endY: "" },
      distance: 0,
      distanceCopy: 0,
      index: 1,
      timeout: ""
    };
  },
  methods: {
    init() {
      this.setWidth(this.$refs.item, this.windowWidth * this.length);
      this.setWidth(this.$refs.item.children, this.windowWidth);
      this.distance = this.distanceCopy = -this.windowWidth;
      this.animation(-this.windowWidth);
      this.$refs.item.addEventListener("touchstart", this.touchstart);
      this.$refs.item.addEventListener("click", this.click);
      this.$refs.item.addEventListener("transitionend", this.transitionend);
      this.$refs.box.addEventListener("touchstart", function(ev) {
        event.preventDefault();
      });
      this.$refs.box.addEventListener("touchmove", function(ev) {
        event.preventDefault();
      });
    },

    setWidth(dom, width) {
      if (Object.prototype.toString.call(dom) === "[object HTMLDivElement]") {
        dom.style.width = `${width}px`;
      } else {
        for (let i of dom) {
          i.style.width = `${width}px`;
        }
      }
    },
    getWidth(dom) {
      return dom.clientWidth;
    },
    changeSelect(e) {
      if (this.$refs.select) {
        for (let j of this.$refs.select.childNodes) {
          j.classList.remove("selected");
        }
        if (e) {
          e.path[0].classList.add("selected");
        } else {
          if (
            Math.round(this.distance / -this.windowWidth) - 1 >=
            this.$refs.select.childNodes.length
          ) {
            this.$refs.select.childNodes[0].classList.add("selected");
          } else if (Math.round(this.distance / -this.windowWidth) - 1 < 0) {
            this.$refs.select.childNodes[
              this.$refs.select.childNodes.length - 1
            ].classList.add("selected");
          } else {
            console.logLock(
              this.distance,
              Math.round(this.distance / -this.windowWidth) - 1
            );
            this.$refs.select.childNodes[
              Math.round(this.distance / -this.windowWidth) - 1
            ].classList.add("selected");
          }
        }
      }
    },
    selectSlide(e) {
      clearTimeout(this.timeout);
      this.removeEvent();
      for (let i of e.path[0].attributes) {
        if (i.name === "data") {
          this.changeSelect(e);
          this.animation(i.value * -this.windowWidth, 0.3);
        }
      }
      this.createTimeout(this.checktime < 3000 ? 3000 : this.checktime);
    },
    removeEvent() {
      this.$refs.item &&
        this.$refs.item.removeEventListener("touchmove", this.touchmove);
      this.$refs.item &&
        this.$refs.item.removeEventListener("touchend", this.touchend);
    },
    transitionend(evt) {
      if (this.index <= 0 || this.index >= this.length - 1) {
        console.logLock("animationend");
        this.looping();
      }
      this.index = -parseInt(this.distance / this.windowWidth);
      //回传给父组件 当前index值 用于父组件获取事件
      console.logLock(`第${this.index}个`, new Date());
    },

    click(evt) {
      clearTimeout(this.timeout);
      this.$emit("click", this.index);
      evt && evt.preventDefault() && evt.stopPropagation();
      this.createTimeout(this.checktime < 3000 ? 3000 : this.checktime);
    },
    touchstart(evt) {
      this.end.endX = evt.changedTouches[0].clientX;
      clearTimeout(this.timeout);
      this.timeout = "";
      this.$refs.item.addEventListener("touchmove", this.touchmove);
      evt && evt.stopPropagation();
    },
    touchend(evt) {
      //负责校对位置
      clearTimeout(this.timeout);
      console.logLock("end", this.timeout);
      this.removeEvent();
      if (!this.timeout) {
        this.hack(this.distance);
        this.createTimeout(this.checktime < 3000 ? 3000 : this.checktime);
      } else {
        this.distanceCopy = this.distance;
      }
      this.index = -parseInt(this.distance / this.windowWidth);
      evt && evt.preventDefault() && evt.stopPropagation();
    },
    touchmove(evt) {
      console.logLock("move");
      evt && evt.preventDefault() && evt.stopPropagation();
      this.$refs.item.addEventListener("touchend", this.touchend);
      // 老规矩  负责移动动画
      this.start.startX = this.end.endX;
      this.end.endX = evt.changedTouches[0].clientX;
      this.distance += this.end.endX - this.start.startX;
      if (this.over(evt.changedTouches[0].clientX, this.$refs.box)) {
        this.$refs.item.removeEventListener("touchend", this.touchend);
        this.touchend();
      } else {
        this.animation(this.distance, 0.3);
      }
    },
    animation(distance, time) {
      console.logLock("animation");
      const $item = this.$refs.item;
      this.distance = distance;
      this.changeSelect();
      if ($item) {
        $item.style.transform = `translateX(${distance}px)`;
        $item.style.transitionProperty = `transform`;
        $item.style.transitionTimingFunction = `cubic-bezier(0.165, 0.84, 0.44, 1)`;
        if (time === undefined || time === null) {
          $item.style.transitionDuration = ``;
        } else {
          $item.style.transitionDuration = `${time}s`;
        }
      }
    },
    over(x, dom) {
      //判断是否出界
      console.logLock("over");
      const width = dom.offsetWidth;
      const leftBorder = dom.offsetLeft;
      const rightBorder = width + leftBorder;
      return x < leftBorder || x > rightBorder;
    },
    looping(offset = 0) {
      // 负责将出界的滑动 重新定位到对应的index上
      if (this.index <= 0) {
        console.logLock("左划出界,即将开始修正");
        this.animation(
          (-this.windowWidth + offset) * (this.data.length - 2),
          0
        );
        this.distanceCopy = this.distance;
      }
      if (this.index >= this.length - 1) {
        this.animation((-this.windowWidth + offset) * 1, 0);
        this.distanceCopy = this.distance;
        console.logLock("右划出界,即将开始修正");
      }
    },
    //修改左右滑的判断逻辑   根据distance的增长值判断
    hack(distance) {
      console.logLock("hack");
      if (distance > this.distanceCopy) {
        this.matchDistance(0.3, "left");
        console.logLock("左滑");
      } else {
        this.matchDistance(0.3, "right");
        console.logLock("右滑");
      }
      this.distanceCopy = this.distance;
    },
    matchDistance(basic, fangxiang) {
      console.logLock("match");
      const P = fangxiang === "right" ? -1 : 1;
      if (
        this.distance - this.distanceCopy >
        this.windowWidth * (basic + this.index - 1)
      ) {
        this.distance = this.distanceCopy + P * this.windowWidth;
        console.logLock("正常右滑");
      } else if (
        (this.distanceCopy - this.distance) * P <
        -(this.windowWidth * basic)
      ) {
        this.distance = this.distanceCopy + P * this.windowWidth;
        console.logLock("正常左滑");
      } else {
        this.distance = this.distanceCopy;
      }
      this.animation(this.distance, 0.2);
    },
    pageIsOnLooking() {
      var hiddenProperty =
        "hidden" in document
          ? "hidden"
          : "webkitHidden" in document
            ? "webkitHidden"
            : "mozHidden" in document ? "mozHidden" : null;
      var visibilityChangeEvent = hiddenProperty.replace(
        /hidden/i,
        "visibilitychange"
      );
      var onVisibilityChange = () => {
        if (!document[hiddenProperty]) {
          //页面切换回来了
          this.createTimeout(this.checktime < 3000 ? 3000 : this.checktime);
        } else {
          clearTimeout(this.timeout);
          //页面切走了
        }
      };
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },
    createTimeout(time) {
      if ((this.autoloop && this.autoloop != "false") || this.autoloop === "") {
        console.logLock("create");
        const animaTime = 1;
        this.removeEvent();
        if (!this._isBeingDestroyed) {
          this.timeout = setTimeout(() => {
            this.animation(this.distance - this.windowWidth, animaTime);
            this.touchend();
            this.createTimeout(time);
          }, time);
        }
      }
    }
  },
  //开发日志
  /*
   @@@@@@@@ 功能列表 @@@@@@@@

  ------------------

   参数  data 图片地址
   组件捕获点击事件后向上传递  父组件判断事件并执行
   图片绑定的方法
   图片大小根据叶面宽度保持100%页面宽度
   autoplay 是否支持自动播放
   是否有选择器
   一定循环播放
  ------------------

   ((((((Venus))))))

  ------------------
    2.11 beta3 解决循环出界问题  准备添加autoloop功能

    2.22 beta4 准备添加autoloop功能
    2.27 beta5 动态控制轮播元素
    2.27 beta6 解决item事件在父组件中的监听问题
    *********额外的函数 新建一个单例定时器  remove掉所有的触发事件  固定移动到相应的distance 
    （使用animation）  touchstart中移除定时器  touchend后自动触发
    定时器
    *********监听data数据 
    *********

    2.28 beta7 添加选择功能 
  ------------------
  */
  props: {
    data: { default: [] },
    autoloop: { default: true },
    checktime: { default: 3000 }
  },
  created() {
    this.data.push(this.data[0]);
    this.data.unshift(this.data[this.data.length - 2]);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
    this.timeout = "";
  },

  mounted() {
    console.logLock("mounted", this.timeout, 1);
    this.windowWidth = this.$refs.box.clientWidth;
    this.length = this.$refs.item.children.length; //改成 props中data的长度
    this.init();
    this.$nextTick(() => {
      clearTimeout(this.timeout);
      this.createTimeout(this.checktime < 3000 ? 3000 : this.checktime);
    });
    this.pageIsOnLooking();
    console.logLock(this.autoloop, this.checktime);
  }
};
</script>
·
<style lang="scss" scoped>
.v-slide,
.slide-box {
  width: 100%;
  height: 200px;
  position: relative;
  overflow-x: hidden;
}
.v-slide {
  padding: 0 40px;
}
.selectBox {
  position: absolute;
  left: 50%;
  display: flex;
  top: 85%;
  transform: translate(-50%, 0);
  div {
    background: red;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-left: 10px;
    transition: all 0.3s;
  }
  .num:first-child {
    margin-left: 0;
  }

  .selected {
    background: green;
  }
}
.slide-pannel {
  height: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .slide {
    // height: 100%;
    font-size: 40px;
    font-weight: 800;
    float: left;
    object-fit: cover;
  }
}
</style>
