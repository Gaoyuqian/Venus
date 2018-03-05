import Vdate from './datepickerbox';

/* istanbul ignore next */
Vdate.install = function(Vue) {
  Vue.component(Vdate.name, Vdate);
};

export default Vdate;