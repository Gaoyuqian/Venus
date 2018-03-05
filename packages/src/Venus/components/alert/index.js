import Valert from './alert';

/* istanbul ignore next */
Valert.install = function(Vue) {
  Vue.component(Valert.name, Valert);
};

export default Valert;