import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";




type Record = {
    id?:string
    type: string
    output: number
    selectTag: string
    notes: string
    date: string
}



type State ={
    record:Record
    recordList:Record[]
}
const today=moment(new Date()).format('yyyy-MM-DD')
const resetRecord={
    type: '-',
    output: 0,
    selectTag: '',
    notes: '',
    date: today
}
Vue.use(Vuex)
//id new Date().getTime().toString(16)
export default new Vuex.Store({
    state: {
        record: resetRecord,
        recordList:[]
    }as State,
    getters:{
        getType(state){
            return state.record.type
        },
        getSelect(state){
            return state.record.selectTag
        },
        getOutput(state){
            return state.record.output
        },
        getNotes(state){
            return state.record.notes
        },
        getDate(state){
            return state.record.date
        },
        getRecord(state){
            return state.record
        }
    },
    mutations: {
        updateRecord(state,newRecord){
            state.record={...state.record,...newRecord}
        },
        saveRecord(state, count: string) {
            state.record = {...state.record, output: parseFloat(count)}
            const { recordList = [] }= state
            state.recordList = (recordList.push({...state.record,id:new Date().getTime().toString(16)}), recordList)
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
            window.alert('保存成功')
            state.record=resetRecord
        }
    },
    actions: {},
    modules: {}
})
