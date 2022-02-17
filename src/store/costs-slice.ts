import { createSlice } from "@reduxjs/toolkit";
import Cost from "../models/Cost";
import CostsStateType from "../models/CostsStateType";

const sevenDaysBeforNowTimeStamp = new Date().getTime()-(86400000 * 7)

const DUMMY_COSTS = [
    {...new Cost("cost number 1", Math.round(Math.random()*1000), '2022-02-15')},
    {...new Cost("cost number 2", Math.round(Math.random()*1000), '2022-02-10')},
    {...new Cost("cost number 3", Math.round(Math.random()*1000), '2022-02-02')},
    {...new Cost("cost number 4", Math.round(Math.random()*1000), '2022-01-29')},
    {...new Cost("cost number 5", Math.round(Math.random()*1000), '2022-01-10')},
    {...new Cost("cost number 6", Math.round(Math.random()*1000), '2022-01-02')},
]

const initialState: CostsStateType = {
    costs:[],
    filteredCosts: [],
    startDate:new Date(sevenDaysBeforNowTimeStamp).toISOString().split('T')[0] ,
    endDate: new Date().toISOString().split('T')[0],
}

const CostsSlice = createSlice({
    name: 'costs',
    initialState,
    reducers: {
        add(state, action){
            state.costs.unshift(action.payload)
        },
        remove(state, action){
            const i = state.costs.findIndex(a => a.id === action.payload)
            state.costs.splice(i,1)
        },
        replaceAllCosts(state, action){
            state.costs = action.payload
        },
        syncFilter(state){
            const start = new Date(state.startDate).getTime()
            const end = new Date(state.endDate).getTime()
            state.filteredCosts = state.costs.filter(a => {
                const itemDate = new Date(a.date).getTime()
                return itemDate <= end && itemDate >= start
            })
            state.filteredCosts.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
        },
        changeStartDate(state, action){
            state.startDate = action.payload
            const start = new Date(action.payload).getTime()
            const end = new Date(state.endDate).getTime()
            state.filteredCosts = state.costs.filter(a => {
                const itemDate = new Date(a.date).getTime()
                return itemDate <= end && itemDate >= start
            })
            state.filteredCosts.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())

        },
        changeEndDate(state, action){
            state.endDate = action.payload
            const start = new Date(state.startDate).getTime()
            const end = new Date(action.payload).getTime()
            state.filteredCosts = state.costs.filter(a => {
                const itemDate = new Date(a.date).getTime()
                return itemDate <= end && itemDate >= start
            })
            state.filteredCosts.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())

        },

    }
})

export const costsActions = CostsSlice.actions

export default CostsSlice.reducer