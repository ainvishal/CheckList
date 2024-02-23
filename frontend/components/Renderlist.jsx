import { useEffect, useState, useContext } from "react"
import axios from 'axios'
import { Rendercontex } from "../contexapi/renderContex"
import Dialog from "./Dialog"

// This component creates a card and puts data init
export default function RenderList({list}) {
    const { setrender} = useContext(Rendercontex)
    // This open state is used to store the id of dialog tag of html to perform popup operation
    const [open, setopen] = useState()
    // useEffect is called to set the state to id
    useEffect(() => {
        // here the id from the database record is set as id for each dialog tag 
        setopen(document.getElementById(JSON.stringify(list.id)))
    }, [list.id])
    // This function handles the opening of dialog
    function handleDialog() {
        open.showModal()
    }

    return(
        <>
            <div className="border rounded-md border-slate-800 bg-slate-500 h-32 my-4">
                <p className="px-3 py-2">Company Name: {list.name}</p>
                <p className="px-3 py-2">Location: {list.location}</p>
                <div className="flex px-3 justify-around">
                    <button className="bg-green-500 w-24 border rounded-md border-green-500" onClick={handleDialog}>Update</button>
                    <Dialog id={list.id} name={list.name} location={list.location}/>
                    <button className="bg-rose-500 w-24 border rounded-md border-rose-500" onClick={async() => {
                        const response = await axios.delete(`https://assignment-backend-4q0q.onrender.com/company/?id=${list.id}`)
                        console.log(response.data)
                        setrender(true)
                    }}>Delete</button>
                </div>
            </div>
        </>
    );
}