import Vue from 'vue'


// 添加Fastclick移除移动端点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

// 添加手势触摸事件，使用方法如 v-touch:swipeleft
import VueTouch from './plugins/touchEvent'
Vue.use(VueTouch)

import md5 from './utils/md5'
import cookie from './utils/cookie'

import config from './configs'
import util from './utils'
import axios from "axios";

var formData = new Vue({
  el: '#form-data',
  data: {
    logo: config.logo,
    phone: '',
    code: '',
    errorMsg: ''
  },
  mounted () {
    this.$el.style.display = ""
  },
  methods: {
    regist () {
      if (this.phone === '') {
        this.errorMsg = '手机号不能为空'
        return
      } else if (this.code === '') {
        this.errorMsg = '手机验证码不能为空'
        return
      } else if (this.code.length < 4) {
        this.errorMsg = '手机验证码至少需要4位'
        return
      }
      this.errorMsg = ''
      // 本demo做一次假登录
      // 真实场景应在此向服务器发起ajax请求

      axios.post(config.registerApi, {phone:this.account,code:this.code},
          { headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log("resp",response)
            location.href = config.homeUrl
          })
          .catch(e => {
            this.errors.push(e)
            console.log("resp",response)
          })
    },
    login () {
      location.href = config.loginUrl
    }
  },
})
