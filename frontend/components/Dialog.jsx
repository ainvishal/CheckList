import { useContext, useState, useEffect } from "react"
import axios from 'axios'
import { Rendercontex } from "../contexapi/renderContex"

export default function Dialog({id, name, location}) {
    const { setrender} = useContext(Rendercontex)
    const [open, setopen] = useState()
    const [newName, setname] = useState(name)
    const [newLocation, setlocation] = useState(location)

    useEffect(() => { 
        setopen(document.getElementById(JSON.stringify(id)))
    }, [id])

    // with this function the dialog is closed and the updated value is sent to sever
    async function handleDialogClose() {
        const response = await axios.put(`https://assignment-backend-4q0q.onrender.com/company/?id=${id}&name=${newName}&location=${newLocation}`)
        console.log(response.data)
        setrender(true)
        open.close()
    }

    return(
        <>
            <dialog id={JSON.stringify(id)}  className="absolute bottom-400 left-0flex flex-col border rounded-md border-slate-800 bg-slate-500 h-32 w-72 p-1">
                <div className="pt-1 pb-2">
                   <input type="text" placeholder="name" value={newName} onChange={(e) => setname(e.target.value)} className="w-full bg-slate-300 border rounded-md "/>
                </div>
                <div className="pt-1 pb-2">
                    <input type="text" placeholder="location" value={newLocation} onChange={(e) => setlocation(e.target.value)} className="w-full bg-slate-300 border rounded-md "/>
               </div>
                 <button className="bg-green-500 w-24 border rounded-md border-green-500" onClick={handleDialogClose}>Save</button>
            </dialog>
        </>
    );
}