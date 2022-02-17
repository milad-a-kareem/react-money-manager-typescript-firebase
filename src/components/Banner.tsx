import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cost from "../models/Cost"
import CostsStateType from "../models/CostsStateType"
import { costsActions } from "../store/costs-slice"

const Banner: React.FC = () => {
  const costs = useSelector<{costs:CostsStateType}, Cost[]>(state => state.costs.costs)
  const filteredCosts = useSelector<{costs:CostsStateType}, Cost[]>(state => state.costs.filteredCosts).map(a=>a.costAmount)
  const startDate = useSelector<{costs:CostsStateType}, string>(state => state.costs.startDate)
  const endDate = useSelector<{costs:CostsStateType}, string>(state => state.costs.endDate)
  const [total,setTotal] = useState(0)
  const dispatch = useDispatch()

  const containerClasses = `
  w-full  
  bg-secondary 
  rounded-2xl 
  mt-24 
  p-4 
  flex 
  flex-wrap
  gap-2
  `

  const inputClasses = `
  p-2 rounded-xl bg-white/80
  `
  const inputWrapper = `
  flex flex-col grow items-center
  `

  const startChange = (e:React.FormEvent<HTMLInputElement>)=>{
    console.log(e.currentTarget.value)
    dispatch(costsActions.changeStartDate(e.currentTarget.value))
    
  }
  const endChange = (e:React.FormEvent<HTMLInputElement>)=>{
    dispatch(costsActions.changeEndDate(e.currentTarget.value))

  }

  useEffect(()=>{
    if(filteredCosts && filteredCosts.length>0){
      setTotal(filteredCosts.reduce((a,b)=> a + b))
    }
    else{setTotal(0)}
  },[filteredCosts])

  useEffect(()=>{
    dispatch(costsActions.syncFilter())
  },[dispatch,costs])

    return (
      <div className={containerClasses}>
        <div className={inputWrapper}>
          <label htmlFor="start-date">Start Date</label>
          <input type="date" id="start-date"  className={inputClasses} value={startDate} onChange={startChange}/>
        </div>
        <div className={inputWrapper}>
          <label htmlFor="end-date">End Date</label>
          <input type="date" id="end-date"  className={inputClasses} value={endDate} onChange={endChange}/>
        </div>
        <div className={inputWrapper}>
          <label htmlFor="end-date">Total</label>
          <div   className={inputClasses}>${new Intl.NumberFormat().format(total)}</div>
        </div>

      </div>
    )
  }
  
  export default Banner