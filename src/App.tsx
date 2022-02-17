
import Header from './components/Header';
import Container from './components/Container';
import Banner from './components/Banner';

import {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import AddCostModal from './modals/AddCostModal';
import { useSelector, useDispatch } from 'react-redux'
import Cost from './models/Cost';
import {costsActions} from './store/costs-slice';
import CostsStateType from './models/CostsStateType';

let isFirst = true

function App() {
  const costs = useSelector<{costs:CostsStateType}, Cost[]>(state => state.costs.costs)
  const filteredCosts = useSelector<{costs:CostsStateType}, Cost[]>(state => state.costs.filteredCosts)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if(!isFirst){
      fetch('https://money-manager-e3253-default-rtdb.firebaseio.com/costs.json',
      {method:'PUT', body: JSON.stringify(costs)}).catch(e=>{console.log(e)})
    }
    isFirst = false
  },[costs])

  useEffect(()=>{

      fetch('https://money-manager-e3253-default-rtdb.firebaseio.com/costs.json')
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        dispatch(costsActions.replaceAllCosts(data))
        setIsLoading(false)
      })
      .catch(e=>{console.log(e); setIsLoading(false)})
   

  },[])

  const toggleModal = ()=>{
    setIsModalOpen(prev => !prev)
  }

  const removeCost = (id:string)=>{
    dispatch(costsActions.remove(id))
  }
  return (
    <div className="w-screen h-screen bg-tertiary top-0 left-0 absolute overflow-y-auto">

      {
      isModalOpen 
      && 
      // <AddCostModal toggleModal={toggleModal}/>
      ReactDOM.createPortal(<AddCostModal toggleModal={toggleModal}/>, document.getElementById('modal') as HTMLElement)
      
      }
      


      <Header toggleModal={toggleModal}/>

      <Container>
        <Banner/>
        {isLoading && <div className='p-2 bg-orange-500/50 rounded-xl my-4 flex justify-center'> Loading ...</div>}
        {!isLoading &&(!filteredCosts || filteredCosts.length < 1) && <div className='p-2 bg-orange-500/50 rounded-xl my-4 flex justify-center'> No Costs Found</div>}
        {filteredCosts.length > 0 &&
          filteredCosts.map((cost:Cost) => (
            <div onClick={()=>{removeCost(cost.id)}}className='cursor-pointer w-full bg-black/10 my-3 rounded-xl p-3 flex flex-wrap items-center content-center gap-5 hover:bg-red-300' key={cost.id}>
              <h1 className='p-4 bg-primary text-light font-bold text-xl rounded-xl'>${new Intl.NumberFormat().format(cost.costAmount) }</h1>
              <h1 className=' text-primary capitalize grow font-bold text-xl rounded-xl'>{cost.title}</h1>
              <h1>{new Date(cost.date).toLocaleDateString()}</h1>
            </div>
          ))
        }

      </Container>
    </div>
  );
}

export default App;
