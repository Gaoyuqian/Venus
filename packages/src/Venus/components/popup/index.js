import Vpopup from './popup';

/* istanbul ignore next */
Vpopup.install = function(Vue) {
  Vue.component(Vpopup.name, Vpopup);
};

export default Vpopup;