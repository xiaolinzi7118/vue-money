import Vue from 'vue'
import Vuex from 'vuex'


type Record={
  type:string
  output:number
  selectTag:string
  notes:string
  date:string
}
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordLis:{
      type : '-',
      output : 0,
      selectTag :'',
      notes : '',
      date:''
    }as Record
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
