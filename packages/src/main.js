
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/assets/sass/app.scss'
import alertInfo from './Venus/components/alertInfo'
import msg from './Venus/components/message'
import picker from './Venus/components/picker/picker'
import model from './Venus/components/model'
import btna from './Venus/components/btna'
import radiu from './Venus/components/radiu'
import inputInfo from './Venus/components/inputInfo'
import lineBox from './Venus/components/lineBox'
import lineBoxGroup from './Venus/components/lineBoxGroup'
import loading from './Venus/components/loading'
import slide from './Venus/components/slide'
const components= {
  model,
  btna,
  radiu,
  alertInfo,
  inputInfo,
  msg,
  picker,
  datepicker,
  lineBox,
  lineBoxGroup,
  loading,
  slide
}

Vue.config.productionTip = false;
const install = function(Vue){
  components.map(component=>{
      Vue.component(component.name,component)
  })

  Vue.prototype.$myMounted=function(name,obj){
    let message = new name({data:obj});
    message.$mount(document.createElement('div'))  
    message.$parent = this
    this.$el.appendChild(message.$el)
  }

  Vue.prototype.$message = function(obj){
    this.$myMounted(Vue.extend(msg),obj)
  }
  Vue.prototype.$alert = function(obj){
    this.$myMounted(Vue.extend(alert),obj)
  }
  Vue.prototype.$picker = function(obj){
    this.$myMounted(Vue.extend(picker),obj)  
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
module.exports = {
  version:'0.0.9',
  model,
  btna,
  radiu,
  alertInfo,
  inputInfo,
  msg,
  picker,
  datepicker,
  lineBox,
  lineBoxGroup,
  loading,
  slide
}

module.exports.default = module.exports;