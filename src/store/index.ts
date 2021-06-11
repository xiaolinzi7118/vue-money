import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";
import { Toast } from "vant";




export type IRecord = {
    id?: string
    type: string
    output: number
    selectTag: string
    notes: string
    date: string
}



type State = {
    record: IRecord
    recordList: IRecord[]
    tagList1: {
        name: string;
        value: string;
    }[]
    tagList2: {
        name: string;
        value: string;
    }[]
}
const today = moment(new Date()).format('yyyy-MM-DD')
const resetRecord = {
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
        recordList: [],
        tagList1: [
            { name: '4', value: '餐费' },
            { name: '5', value: '早餐' },
            { name: '6', value: '午餐' },
            { name: '7', value: '晚餐' },
            { name: '8', value: '零食' },
            { name: '9', value: '水果' },
            { name: '10', value: '买菜' },
            { name: '11', value: '烟酒' },
            { name: '12', value: '购物' },
            { name: '13', value: '其他' }
        ],
        tagList2: [
            { name: '14', value: '工资' },
            { name: '15', value: '收租' },
            { name: '16', value: '兼职' },
            { name: '17', value: '报销' },
            { name: '18', value: '奖金' },
            { name: '19', value: '红包' },
            { name: '20', value: '理财' },
            { name: '21', value: '投资' },
            { name: '22', value: '礼金' },
            { name: '13', value: '其他' }
        ]
    } as State,
    getters: {
        getType(state) {
            return state.record.type
        },
        getSelect(state) {
            return state.record.selectTag
        },
        getOutput(state) {
            return state.record.output
        },
        getNotes(state) {
            return state.record.notes
        },
        getDate(state) {
            return state.record.date
        },
        getRecord(state) {
            return state.record
        },
        getRecordList(state) {
            return state.recordList.length > 0 ?
                state.recordList : JSON.parse(window.localStorage.getItem('recordList') || '[]')
        }
    },
    mutations: {
        updateRecord(state, newRecord) {
            state.record = { ...state.record, ...newRecord }
        },
        saveRecord(state, count: string) {
            state.record = { ...state.record, output: parseFloat(count) }
            if (state.record.selectTag !== '') {
                const list = JSON.parse(window.localStorage.getItem('recordList') || '[]');
                state.recordList = (list.push({ ...state.record, id: new Date().getTime().toString(16) }), list)
                window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
                // window.alert('保存成功')
                Toast.success('已保存')
            } else {
                // window.alert('标签不能为空哦~')
                Toast.fail('请选择标签 ~')
            }
            state.record = resetRecord
        }
    },
    actions: {},
    modules: {}
})
