import React, { useEffect, useState } from 'react'
import type { ModelNames, ReadResponse_Shallow, UserWrite } from '../utils/models'
import { ListRequest } from '../utils/apiRequests';
import { useNavigate } from "react-router";

type ListPageProps<M extends ModelNames> = {
    model_name: M;
};

function ListPage<M extends ModelNames>({model_name}:ListPageProps<M>) {
    const [objects, setObjects] = useState<ReadResponse_Shallow<M>[]>([])

    const navigate = useNavigate();


    useEffect(() => {
       console.log("[ListPage] Start")
       ListRequest(model_name).then((data)=>{
        setObjects(data)
    })
    }, [])
    
    
    return (
    <>
        <div>List {model_name}s Page</div>
        {objects.map((object: ReadResponse_Shallow<M>) => {
            let title = ""
            if("name" in object)
                title = object.name
            else if(("username" in object))
                title = object.username
            else
                throw new Error(`[ListPage.tsx] Object is of improper type! It should have a name or username variable but neither were found. type: ${typeof object} Object: ${object}`);
                
            
            return <button type="button" className="btn btn-primary" onClick={() => {
                navigate(`/read/${model_name}`);}}> {title} </button>
            })}
    </>
    )
}

export default ListPage