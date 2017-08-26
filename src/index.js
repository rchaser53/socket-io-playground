import Vue from 'vue'
import * as SocketIO from "socket.io-client"

const socket = SocketIO('http://localhost:3000');

const vue = new Vue({
  el: '#app',
  data: function() {
    return {
      count: 0,
      transition: false,
      shown: false
    }
  },
  template: `<div id="outer" class="fade" @transitionend="onTransitionEnd">
              <div>
                <button v-on:click="sendMessage">fire</button>
                <button v-on:click="openDialog">open</button>
                <button v-on:click="closeDialog">close</button>
                <div id="block" style="display:none; width: 100px; height: 100px; background-color: black;"></div>
              </div>
            </div>`,
  methods: {
    sendMessage() {
      socket.emit('fireAll', this.count)
    },
    showBlock() {
      document.querySelector('#block').style.display = "block";
    },
    hideBlock() {
      document.querySelector('#block').style.display = "none";
    },
    addIn(el) {
      el.className = "fade in";
    },
    removeIn(el) {
      el.className = "fade";
    },
    openDialog() {
      Vue.set(this, 'shown', true);
    },
    closeDialog() {
      Vue.set(this, 'shown', false);
    },
    onTransitionEnd() {
      console.log(123)
      Vue.set(this, 'transition', false);
    },
    initializeModalDialog: function() {
      // const el = this.$el
      // el.classList.remove('in')
      // el.style.display = 'none'
      // this.hideBlock();
      Vue.set(this, 'transition', false);
    },
  },
  watch: {
    flag(newValue) {
      const startTime = Date.now();
      // while (Date.now() < (startTime + 5000)) {}
      setTimeout(this.showBlock, 0)
      // Vue.set(this, 'count', ++this.count)
      this.hideBlock();
      // console.log('flag')
    },
    // count(newValue) {
    //   this.hideBlock();
    //   console.log('count')
    // },

    transition: function (newValue, oldValue) {
      if (newValue === oldValue) return
      // // const el = this.$el
      const self = this;
      const el = document.querySelector('#outer');

      if (newValue) {
          if (this.shown) {
      //         // el.querySelector('.modal-content').focus()
      //         // el.style.display = 'block'
              setTimeout(function() {
      //             // el.classList.add('in')
                  self.addIn(el);
              }, 0)
          } else {
      //         // el.classList.remove('in')
              self.removeIn(el);
          }
      }

      else {
      //     if (!this.shown) {
      //         // el.style.display = 'none'
          // }
      }
    },
    shown(newValue, oldValue) {
      if(newValue) {
        this.initializeModalDialog()
      }
      if (oldValue === null ? newValue === true : newValue !== oldValue) {
          Vue.set(this, 'transition', true)
      }
    }
  }
})

socket.on('toClient', (data) => {
  console.log('toClient');
  Vue.set(vue, 'shown', false);
  Vue.set(vue, 'shown', true);
})


// var bidCallback = function (error, data) {
//   vue.closeAllDialogs();
//   if (error) { ASAuctionItemSetup.handleError(error, 'api-post'); return; }

//   vue.updateDataOnBid(data);
//   vue.openBidResultWinning(data);
//   ASMixpanel.track('gotBidFeedback', {'Result': 'Success'});
// };

// var updateAutoBiddingCallback = function (error, data) {
//   vue.closeAllDialogs();
//   if (error) { ASAuctionItemSetup.handleError(error, 'api-post'); return; }

//   vue.updateDataOnAutoBid(data);
//   vue.openAutoBidResultWinning(data);
//   ASMixpanel.track('gotBidFeedback', {'Result': 'Success'});
// }