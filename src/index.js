import Vue from 'vue'
import * as SocketIO from "socket.io-client"

import ImitateModal from './imitateModal';

const socket = SocketIO('http://localhost:3000');

const vue = new Vue({
  el: '#app',
  data: function() {
    return {
      modalA: {
        shown: false
      },
      modalB: {
        shown: false
      }
    }
  },
  components: {
    "modal-a": ImitateModal,
    "modal-b": ImitateModal
  },
  template: `<div>
              <modal-a id="modalA" v-bind:shown="modalA.shown"
                      v-bind:open="openDialogA" v-bind:close="closeDialogA" />
              <modal-b id="modalB" v-bind:shown="modalB.shown"
                      v-bind:open="openDialogB" v-bind:close="closeDialogB" />
            </div>`,
  methods: {
    openDialogA() {
      Vue.set(this.modalA, 'shown', true);
    },
    closeDialogA() {
      Vue.set(this.modalA, 'shown', false);
    },
    openDialogB() {
      Vue.set(this.modalB, 'shown', true);
    },
    closeDialogB() {
      Vue.set(this.modalB, 'shown', false);
    }
  },
})

socket.on('toClient', (data) => {
  Vue.set(vue.modalA, 'shown', true);
  Vue.set(vue.modalA, 'shown', true);
})


  // watch: {
    // flag(newValue) {
    //   const startTime = Date.now();
    //   // while (Date.now() < (startTime + 5000)) {}
    //   setTimeout(this.showBlock, 0)
    //   // Vue.set(this, 'count', ++this.count)
    //   this.hideBlock();
    // },
  // }

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