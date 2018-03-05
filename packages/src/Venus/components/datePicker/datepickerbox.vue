<template>
  <popup ref='popup'>
    <div class="v-date-picker-main">
        <div class="v-date-picker-relative">
            <div class="v-date-picker-title">
                <div class="v-cancel"  @click='cancel'>取消</div>
                <div class="v-submit"  @click='submit'>完成</div>
            </div>
            <div class="box">
              <!-- <div @getdate='getdate' v-for='item in data' :data='data[item]'>{{item}}</div> -->
               <pickerbody :def='def' :uid='_uid' v-model='data' :getdata='getdata' @getdate='getdate' :key='val' v-for='(item,val) in data' :data='item' type='asdfa'></pickerbody>       
            </div>
        </div>  
    </div>
  </popup>
</template>
<script>
import popup from "../popup/popup";
import pickerbody from "./datepickerbody";
export default {
  //拿到type之后 生成数据
  name: "VDate",
  methods: {
    cancel() {
      this.$refs.popup.close();
    },
    submit() {
      this.pushDataLock = true;
      this.callBackData = [];
      this.getdata = !this.getdata;
    },
    getdate(aaa, bbb) {
      if (aaa.type == "month" && !this.pushDataLock && this.type == "day") {
        this.setDay(aaa.text);
      } else if (this.pushDataLock) {
        this.callBackData.push(aaa);
        if (this.callBackData.length >= this.data.length) {
          this.pushDataLock = false;
          sessionStorage.setItem(
            "v_datepickerinfo" + this._uid,
            JSON.stringify(this.callBackData)
          );
          this.$emit("input", this.callBackData);
          this.$refs.popup.close();
        }
      }
    },
    setYear(start = new Date(0).getFullYear(), now = new Date().getFullYear()) {
      const year = [];
      for (let item = start; item <= now; item++) {
        year.push(item);
      }
      this.data.push({ year: year.reverse() });
    },
    setMonth() {
      this.setYear();
      const month = [];
      for (let item = 1; item <= 12; item++) {
        month.push(item);
      }
      this.data.push({ month: month });
    },
    setDay(month) {
      const Day = [];
      for (let item = 1; item <= this.checkMonth(month); item++) {
        Day.push(item);
      }
      for (let item in this.data) {
        if (this.data[item].day) {
          this.data.pop();
        }
      }
      this.data.push({ day: Day });
    },
    checkMonth(num = 1) {
      const first = [1, 3, 5, 7, 8, 10, 12];
      const second = [2];
      const three = [4, 6, 9, 11];
      if (first.indexOf(num) != "-1") {
        return 31;
      }
      if (second.indexOf(num) != "-1") {
        return 29;
      }
      if (three.indexOf(num) != "-1") {
        return 30;
      }
    }
  },
  data() {
    return {
      path: "",
      startPoint: { x: "", y: "" },
      endPoint: { x: "", y: "" },
      distance: 0,
      scrollLock: false,
      animateTime: 0.16,
      Client: "",
      Cheight: "",
      Iheight: "",
      data: [],
      callBackData: [],
      getdata: false,
      pushDataLock: false
    };
  },
  watch: {
    show(newVal) {
      this.$refs.popup.show();
    }
  },
  created() {
    switch (this.type) {
      case "year":
        this.setYear();
        break;
      case "month":
        this.setMonth();
        break;
      case "day":
        this.setMonth();
        this.setDay();
        break;
    }
    this.popup = !this.popup ? this.$refs.popup : this.popup;
  },
  props: {
    type: { type: String },
    show: { default: "" },
    part: {
      default: 5
    },
    def: {}
  },
  components: { popup, pickerbody }
};
</script>
<style lang="scss" scoped>
.v-date-picker-main {
  overflow: hidden;
  background: #fff;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  .v-date-picker-relative {
    position: relative;
    padding-top: 100px;
  }
  .v-date-picker-body-box {
    width: 100%;
    display: flex;
  }
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
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .v-date-picker-title {
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
    height: 100px;
    border-bottom: 1px solid #999;
    font-weight: 800;
    color: red;
  }
}
</style>