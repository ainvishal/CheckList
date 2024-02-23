import { useContext, useState } from "react"
import axios from 'axios'
import { Rendercontex } from "../contexapi/renderContex"

export  function Inputfields() {
    // The setrender is accessed via context
    const { setrender} = useContext(Rendercontex)
    const [name, setname] = useState('')
    const [location, setlocation] = useState('')

    return(
        <>
            <div className='py-5 h-56   '>
                <div className=" pb-3">
                    {"Company's Name:"}
                    <input type="text" placeholder="name" value={name} onChange={(e) => setname(e.target.value)} className="w-full bg-slate-300 border rounded-md text-black" />
                </div>
                <div className="pt-3 pb-3">
                    {"Company's Location:"}
                    <input type="text" placeholder="location" value={location} onChange={(e) => setlocation(e.target.value)} className="w-full bg-slate-300 border rounded-md text-black" />
                </div>
                <div className="pt-3">
                    <button className="w-full bg-indigo-500 border rounded-md" onClick={async() => {
                        const response = await axios.post('http://localhost:3000/company', {
                            name:name,
                            location:location
                        })
                        console.log(response.data)
                        setname('')
                        setlocation('')
                        setrender(true)
                    }} >Send</button>
                </div>
            </div>

        </>
    )
}

