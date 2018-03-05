<!--button components-->

<template>
  <button :disabled='disabled' :class="[cls]" @click='clickHandle'><span class='v-btn-span'><slot></slot></span></button>
</template>

<script>
export default {
  name: "VButton",
  methods: {
    clickHandle: function(evt) {
      this.$emit("click", evt);
    }
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: { type: String, default: "full" },
    disabled: Boolean,
    radius: { type: String, default: "none" },
    inline: { type: Boolean, default: false }
  },
  computed: {
    cls() {
      var cls = ["v-btn"];
      cls.push(`v-btn-${this.size}`);
      if (this.disabled) {
        cls.push(`v-btn-disabled`);
      }
      if (this.inline) {
        cls.push(`v-btn-inline`);
      }
      !this.radius
        ? cls.push(`v-btn-border-none`)
        : cls.push(`v-btn-border-${this.radius}`);

      return cls;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  height: 2rem;
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  background: rgba(232, 122, 144, 1);
  color: #fff;
  box-sizing: border-box;
  position: relative;
  text-align: center;
}
.v-btn[disabled] {
  background: #888;
}
.v-btn-inline {
  display: inline;
}
.v-btn-full {
  width: 100%;
}
.v-btn-mini {
  width: 20%;
}
.v-btn-half {
  width: 50%;
}
.v-btn-border-small {
  border-radius: 0.25rem;
}
.v-btn-border-full {
  border-radius: 50%;
}
</style>