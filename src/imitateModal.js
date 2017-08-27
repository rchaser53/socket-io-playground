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
  template: `<div>
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
      console.log(123)
      Vue.set(this, 'transition', false);
    },
    initializeModalDialog: function() {
      Vue.set(this, 'transition', false);
    },
  },

  watch: {
    transition: function (newValue, oldValue) {
      if (newValue === oldValue) return
      const self = this;

      if (newValue) {
          if (this.shown) {
              setTimeout(function() {
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
      console.log(newValue, oldValue, 111)
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