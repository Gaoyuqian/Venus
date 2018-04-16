import '@/assets/sass/app.scss'
import VAlert from './Venus/components/alert/index.js'
import VMessage from './Venus/components/message/index.js'
import VPicker from './Venus/components/picker/index.js'
import VDate from './Venus/components/datepicker/index.js'
import VModel from './Venus/components/modelPanel/index.js'
import VButton from './Venus/components/button/index.js'
import VRadiu from './Venus/components/radiu/index.js'
import VInput from './Venus/components/input/index.js'
import VLinebox from './Venus/components/lineBox/index.js'
import VLineboxGroup from './Venus/components/lineBoxGroup/index.js'
import VLoading from './Venus/components/loading/index.js'
import VSlide from './Venus/components/slide/index.js'

const install = function(Vue, opts = {}) {
  const components= [
    VButton,
    VRadiu,
    VInput,
    VAlert,
    VSlide,
    VMessage,
    VPicker,
    VDate,
    VModel,
    VLinebox,
    VLineboxGroup,
    VLoading,
  ]
  components.forEach((Component) => {
    Component.install(Vue)
  })

  Vue.prototype.$myMounted=function(name,obj){
    let message = new name({data:obj});
    message.$mount(document.createElement('div'))  
    message.$parent = this
    this.$el.appendChild(message.$el)
  }

  Vue.prototype.$message = function(obj){
    this.$myMounted(Vue.extend(VMessage),obj)
  }
  Vue.prototype.$alert = function(obj){
    this.$myMounted(Vue.extend(VAlert),obj)
  }
  Vue.prototype.$picker = function(obj){
    this.$myMounted(Vue.extend(VPicker),obj)  
  }
}

var consoleLock = false;
window.console.logLock = function(context){
  if(consoleLock){
    console.log(context);    
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default  {
  version:'0.0.9',
  install,
  VButton,
  VRadiu,
  VInput,
  VAlert,
  VSlide,
  VMessage,
  VPicker,
  VDate,
  VModel,
  VLinebox,
  VLineboxGroup,
  VLoading,
}