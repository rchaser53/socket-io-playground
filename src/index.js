import Vue from 'vue'
import * as SocketIO from "socket.io-client"

const socket = SocketIO('http://localhost:3000');

const vue = new Vue({
  el: '#app',
  data: function() {
    return {
      count: 0
    }
  },
  template: `<div>
    <button v-on:click="sendMessage">fire</button>
    <div>{{count}}</div>
  </div>`,
  methods: {
    sendMessage() {
      socket.emit('fireAll', this.count)
    }
  }
})

socket.on('toClient', (data) => {
  Vue.set(vue, 'count', data);
})