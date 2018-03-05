import Vloading from './loading';

/* istanbul ignore next */
Vloading.install = function(Vue) {
  Vue.component(Vloading.name, Vloading);
};

export default Vloading;