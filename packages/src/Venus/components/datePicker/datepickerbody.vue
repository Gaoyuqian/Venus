<template>
      <div class="v-date-picker-body">
            <div class="v-date-picker-box"  @touchstart.stop='touchstart' @touchmove.stop='touchmove' @touchend.stop='touchend'>
              <div class="v-date-picker-scroll" ref='scroll'>
                    <div class="content" v-for='item in Mdata' :key='item'>{{item}}</div>      
              </div>     
               <div class="v-date-picker-line"></div>    
              <div class="v-date-picker-mask"></div>           
            </div> 
      </div>
</template>
<script>
export default {
  data() {
    return {
      startPoint: { x: "", y: "" },
      endPoint: { x: "", y: "" },
      distance: 0,
      scrollLock: true,
      animateTime: 0.16,
      Client: "",
      Cheight: "",
      Iheight: "",
      Mdata: "",
      Mkey: "",
      reData: ""
    };
  },
  watch: {
    getdata() {
      this.submit();
    },
    distance(newVal) {
      // console.log(newVal);
    },
    data() {
      this.Mkey = Object.keys(this.data);
      this.Mdata = this.data[this.Mkey[0]];
      this.$nextTick().then(() => {
        this.Client = this.$refs.scroll;
        this.Cheight = this.Client.clientHeight; // clientheight = 300
        this.Iheight = //itemheight
          this.Cheight / this.$refs.scroll.children.length;
        if (this.overBorder(this.distance).position != "none") {
          this.distance = this.overBorder(this.distance).val;
          this.moveTrim();
          this.animation(this.animateTime);
        }
      });
    }
  },
  created() {},
  mounted() {
    // 挂载后执行一次submit 才能拿到日期
    /*
            获取日期  日期动态变化   bingo!!!
            初始化默认值为今天／月／年  bingo!!!
            box点完成返回一个对象       bingo!!!

            QQQ: 会一直跳到当前日期
            解决方案  一个是v-show   需要解决Cheight 的问题  
             一个是sessionStronge  拓展问题，
    */
    if (sessionStorage.getItem("v_datepickerinfo") != "undefined") {
      this.reData = JSON.parse(sessionStorage.getItem("v_datepickerinfo"));
    }
    this.init();
  },
  props: { data: { type: Object }, getdata: { type: Boolean } },
  methods: {
    setDate(time) {
      let toYear, toMouth, toDay, disValue;
      if (time) {
        for (let item of time) {
          if (item.type == this.Mkey[0]) {
            disValue = parseInt(item.text);
          }
        }
      } else {
        toYear = time || new Date().getFullYear();
        toMouth = time || new Date().getMonth() + 1;
        toDay = time || new Date().getDate();
      }
      switch (this.Mkey[0]) {
        case "year":
          this.distance =
            parseInt(-this.Mdata.indexOf(toYear || disValue)) * this.Iheight;
          break;
        case "month":
          this.distance =
            parseInt(-this.Mdata.indexOf(toMouth || disValue)) * this.Iheight;
          break;
        case "day":
          this.distance =
            parseInt(-this.Mdata.indexOf(toDay || disValue)) * this.Iheight;
          break;
      }
      this.animation(0.16);
    },
    init() {
      this.Mkey = Object.keys(this.data);
      this.Mdata = this.data[this.Mkey[0]];
      this.$nextTick().then(() => {
        this.Client = this.$refs.scroll;
        this.Cheight = this.Client.clientHeight; // clientheight = 300
        this.Iheight = //itemheight
          this.Cheight / this.$refs.scroll.children.length;
        // !this.reData && this.setDate();
        this.setDate(this.reData);
      });
    },
    touchstart(evt) {
      /* 获取事件起点 */
      this.endPoint.x = evt.changedTouches[0].clientX;
      this.endPoint.y = evt.changedTouches[0].clientY;
      if (!this.Client) {
        this.scrollLock = false;
      }
      evt.preventDefault();
    },
    touchmove(evt) {
      /* 获取事件终点 */
      this.startPoint.x = this.endPoint.x;
      this.startPoint.y = this.endPoint.y;
      this.endPoint.x = evt.changedTouches[0].clientX;
      this.endPoint.y = evt.changedTouches[0].clientY;
      /* 获取事件距离 */
      if (this.overBorder(this.distance).position == "none") {
        this.distance += this.endPoint.y - this.startPoint.y;
      }
      /* 根据距离计算相对垂直位移 */
      this.animation(this.animateTime);
    },
    touchend(evt) {
      //end事件触发时自动提交一个submit
      /* 主要用来校对 */
      if (this.overBorder(this.distance).position != "none") {
        this.distance = this.overBorder(this.distance).val;
      }
      this.moveTrim();
      this.animation(this.animateTime);
      this.scrollLock = true;
      this.submit();
    },

    submit() {
      //通过事件向上传递
      this.reData = {
        index: Math.abs(this.distance) / this.Iheight,
        num: Math.abs(this.distance) / this.Iheight + 1,
        text: this.Mdata[
          Math.abs(this.distance) / this.Iheight
        ] /* arr[index] */,
        type: this.Mkey[0]
      };
      this.$emit("getdate", this.reData, this);
    },
    overBorder(distance) {
      if (distance >= this.Iheight) {
        return { val: 0, position: "up" };
      } else if (distance <= -this.Cheight) {
        return { val: -this.Cheight + this.Iheight, position: "down" };
      }
      return { val: distance, position: "none" };
    },
    // end微调函数
    animation(time) {
      this.Client.style.transform = `translateY(${this.distance}px)`;
      this.Client.style.transition = `all ${time}s`;
    },
    moveTrim() {
      // 没停留在点上要移动到附近的点上
      const dis = Math.abs(this.distance);
      if (dis % this.Iheight != 0) {
        //没在点上
        if (this.distance < -(this.Cheight - this.Iheight)) {
          this.distance = -(this.Cheight - this.Iheight);
        } else if (this.distance < 0) {
          const YS = dis % this.Iheight;
          this.distance =
            YS < this.Iheight / 2
              ? -(dis - dis % this.Iheight)
              : -(dis + (this.Iheight - dis % this.Iheight));
        } else {
          this.distance = 0;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-date-picker-line {
  width: 100%;
  height: 80px;
  background: rgba(2, 2, 2, 0.2);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0%, -50%);
  z-index: 100;
}
.v-date-picker-body {
  width: 100%;
  padding: 60px 0;
  box-sizing: border-box;
  .v-date-picker-box {
    position: relative;
    height: 360px;
    overflow: hidden;
    .v-date-picker-scroll {
      width: 100%;
      margin-top: 140px;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: #000;
        font-weight: 800;
        padding: 10px 0;
        height: 80px;
      }
    }
    .v-date-picker-mask {
      z-index: 100;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      );
      width: 100%;
      height: inherit;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>

