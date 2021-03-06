import Vue from 'vue'

const ImitateModal = Vue.extend({
  props: {
    id: {},
    shown: {},
    open: {},
    close: {}
  },
  data: function() {
    return {
      transition: false,
      outer: null,
    }
  },
  mounted() {
    Vue.set(this, 'outer', document.querySelector(`#${this.id}`));
  },
  template: `<div style="line-height: 2;">
              <div v-bind:id="id" class="fade" @transitionend="onTransitionEnd">
                <button v-on:click="open">open</button>
                <button v-on:click="close">close</button>
              </div>
            </div>`,
  methods: {
    addIn() {
      this.outer.className = "fade in";
    },
    removeIn() {
      this.outer.className = "fade";
    },
    onTransitionEnd() {
      console.log('transitionEnd', this.id);
      Vue.set(this, 'transition', false);
    },
    initializeModalDialog: function() {
      this.removeIn();
      Vue.set(this, 'transition', false);
    },
  },

  watch: {
    transition: function (newValue, oldValue) {
      if (newValue === oldValue) return
      const self = this;

      console.log('transition', this.id, this.shown, newValue);

      if (newValue) {
          if (this.shown) {
              setTimeout(function() {
                console.log('setTimeout', self.id, self.shown);
                  self.addIn();
              }, 0)
          } else {
              self.removeIn();
          }
      }
      else {
      //     if (!this.shown) {
      //         // el.style.display = 'none'
          // }
      }
    },
    shown(newValue, oldValue) {
      console.log('shown', this.id, newValue);
      if(newValue) {
        this.initializeModalDialog()
      }
      if (oldValue === null ? newValue === true : true) {
          Vue.set(this, 'transition', true)
      }
    }
  }
});

export default ImitateModal;