import React, { useEffect, useState } from 'react'
import { ModelInfo, models, type ModelNames, type WriteRequest } from '../utils/models'
import FormWidget from '../ui_components/FormWidget'
import { ReadRequest, UpdateRequest } from '../utils/apiRequests'
import { useNavigate } from "react-router";

type UpdatePageProps<M extends ModelNames> = {
    model_name: M,
    id:string,
}

function UpdatePage<M extends ModelNames>({model_name, id}: UpdatePageProps<M>) {
    const modelInfo:ModelInfo = models[model_name]
    const [object, setObject] = useState<WriteRequest<M>>({} as WriteRequest<M>);
    const navigate = useNavigate();

    function printObject()
    {
        console.log(`Printing the current value of the ${model_name} object ...`)
        Object.entries(object).forEach((key, value) => {
            
            console.log(`${key}:\t\t${value}`)
            
        })
        console.log("=========================================================")
        navigate(`/list/${model_name}`);
    }
    function handleChange(key:string, value: any)
    {
        setObject({
            ...object,
            [key]: value
        })
    }
    async function updateObject()
    {
        const response = await UpdateRequest(model_name, object, id)
        console.log(`response: ${response}`)
        navigate(`/list/${model_name}`);
    }

    useEffect(() => {
        console.log("[UpdatePage.tsx -> useEffect()] Start")
        ReadRequest(model_name, id).then((data) => {setObject(data)})
        
      
    }, [])
    

    return (
        <>
            <div>Update {model_name} Page</div>
            <FormWidget form={modelInfo.form} model_name={model_name} changeObject={handleChange} handleSubmit={updateObject} object={object}/>
            <button onClick={printObject}>Check Object</button>
        </>
    )
}

export default UpdatePage