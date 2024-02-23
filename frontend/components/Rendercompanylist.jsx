import { useEffect, useState, useContext } from "react"
import axios from 'axios'
import { Rendercontex } from "../contexapi/renderContex"
import  RenderList  from './Renderlist'

// This component renders the List stored in the db by accessing the server
export  function RenderCompanyList() {
    // both render and setrender are accessed via context
    const {render, setrender} = useContext(Rendercontex)
    const [companyLists, setcompany] = useState([])
    // here the get request is sent to the server
    useEffect(() => {
        async function getResponce() {
            const response = await axios.get('https://assignment-backend-4q0q.onrender.com/company')
            console.log(response.data)
            setcompany(response.data)
        }
        getResponce()
        //This render state is used for updating the list by Triggering the useEffect if the list changes(initially it is set to true)
        //next whenever the list is updated the render state will change triggering the useEffect
        setrender(false)
    }, [render, setrender])
    return(
        <>
            <div className="flex flex-col static">
                <p className="text-3xl pt-2 pb-7">Company List:</p>
                {/* The companyLists state gets an array of objects, the are accessed and mapped to RenderList component */}
                {companyLists.map(list => <RenderList list={list} key={list.id}/>)}
            </div>
        </>
    )
}

