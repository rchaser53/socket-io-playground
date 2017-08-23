import Vue from 'vue'
import * as SocketIO from "socket.io-client"

const socket = SocketIO('http://localhost:3000');

const vue = new Vue({
  el: '#app',
  data: function() {
    return {
      count: 0,
      flag: false
    }
  },
  template: `<div>
    <button v-on:click="sendMessage">fire</button>
    <button v-on:click="toggleFlag">toggle</button>
    <div>{{count}}</div>
    <div style="display:block; width: 100px; height: 100px; background-color: black;" v-if="flag"></div>
  </div>`,
  methods: {
    sendMessage() {
      socket.emit('fireAll', this.count)
    },
    toggleFlag() {
      Vue.set(this, 'flag', !this.flag)
    }
  },
  watch: {
    flag(newValue) {
      const startTime = Date.now();
      while (Date.now() < (startTime + 5000)) {}
      setTimeout(() => {
        console.log('setTimeout')
      }, 0)
      Vue.set(this, 'count', ++this.count)
      console.log('flag')
    },
    count(newValue) {
      console.log('count')
    }
  }
})

socket.on('toClient', (data) => {
  console.log('toClient');
  Vue.set(vue, 'count', Math.random() * 1000);
})