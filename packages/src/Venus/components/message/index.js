import Vmessage from './message';

/* istanbul ignore next */
Vmessage.install = function(Vue) {
  Vue.component(Vmessage.name, Vmessage);
};

export default Vmessage;