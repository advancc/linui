import rules from '../behaviors/rules';

Component({
  behaviors: ['wx://form-field',rules],
  externalClasses: ['l-class'],
  relations: {
    '../checkbox/index': {
      type: 'child',
      linked() {
        this.onChangeHandle();
      },
      linkChanged() {
        this.onChangeHandle();
      },
      unlinked() {
        this.onChangeHandle();
      }
    }
  },
  properties: {
    current: {
      type: Array,
      value: [],
      observer: 'onChangeHandle'
    },
    placement: {
      type: String,
      value: 'column', //column row
    },
  },
  attached() {
    this.initRules();
  },

  methods: {
    // checkbox change
    onChangeHandle(val = this.data.current) {
      // console.log('checkbox change', val)
      console.log('onChangeHandle')
    },
    onEmitEventHandle(current) {
      const index = this.data.current.indexOf(current.value);
      index === -1 ? this.data.current.push(current.value) : this.data.current.splice(index, 1);
      this.setData({
        current: this.data.current,
        value: this.data.current
      },()=>{
        this.validatorData({value:this.data.value});
      });  
      console.log('onEmitEventHandle')
      this.triggerEvent('linchange', current);
    }
  }
});