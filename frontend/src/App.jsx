import { useState } from 'react'
import { Inputfields } from '../components/Inputfield'
import { RenderCompanyList } from '../components/Rendercompanylist'
// contex is imported
import { Rendercontex } from '../contexapi/renderContex'

// This is the root of the application, all of the components are here
function App() {
  const [render, setrender] = useState(false)
  return (
    <>
    <div className=' min-h-screen flex bg-slate-800 justify-center'>
      <div className='flex flex-col text-white px-2 pt-5 pb-2 w-104 '>
        {/* The render state is passed through the components via provider */}
        <Rendercontex.Provider value={{render, setrender}}>
          <Inputfields/>
          <RenderCompanyList/>
        </Rendercontex.Provider>

      </div>
    </div>

    </>
  )
}

export default App
