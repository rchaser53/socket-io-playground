import Vue from 'vue'
import * as SocketIO from "socket.io-client"
const socket = SocketIO('http://localhost:3000');

const vue = new Vue({
  el: '#app',
  template: `<div>
              <div style="line-height: 2;">
                <button v-on:click="sendMessageA">send openA</button>
                <button v-on:click="sendMessageB">send openB</button>
              </div>
            </div>`,
  methods: {
    sendMessageA() {
        socket.emit('openA', 'a')
        setTimeout(() => {
          // try to imitate sending requeset from ws server almost at the same time
          socket.emit('openB', 'b')
        }, 0)
    },
    sendMessageB() {
      socket.emit('openB')
    }
  },
})