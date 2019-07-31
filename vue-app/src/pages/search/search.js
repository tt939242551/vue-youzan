import '../../modules/css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false ;
Vue.prototype.$http = axios
let param = qs.parse(location.search.substr(1))

new Vue({
  el: '.container',
  data:{
    goTop: false,
    lists: null,
    keyword: param.keyword,
  },
  components: {

  },
  methods: { 
    getLists(){
      this.$http.get('http://rap2api.taobao.org/app/mock/7058/search/list',{keyword:this.keyword,id:param.id})
        .then(rep =>{    
          this.lists = rep.data.lists
        })
        .catch(err=>{
          console.log(err)
        })    
    },
    move(){
      if(document.body.scrollTop > 100){
        this.goTop = true
      } else {
        this.goTop = false
      }
    },
    gotoTop(){
      document.body.scrollTop = 0 
    }
  },
  created() {
    this.getLists()
  },
  filters:{
    Price(a){
      a = a + ''
      var arr = a.split(".")
      if (!arr[1]) {
        return a.concat(".00")
      } else if (arr[1].length===1) {
        return a.concat("0")
      } else  {
        return a
      }  
    }
  }
})
