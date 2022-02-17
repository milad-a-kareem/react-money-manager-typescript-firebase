import { PropsWithChildren } from "react"
import ToggleType from "../models/ToggleType"

function Backdrop({toggleModal}:PropsWithChildren<ToggleType>) {
    return (
      <div onClick={toggleModal} className='fixed bg-black/40 top-0 left-0 w-screen h-screen'></div>
    )
  }
  
  export default Backdrop