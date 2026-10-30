import React, { useEffect, useState } from 'react'
import { ModelInfo, models, type ModelNames, type WriteRequest } from '../utils/models'
import FormWidget from '../ui_components/FormWidget'
import { CreateRequest } from '../utils/apiRequests'
import { useNavigate } from "react-router";

type CreatePageProps<M extends ModelNames> = {
    model_name: M,
}

function CreatePage<M extends ModelNames>({model_name}: CreatePageProps<M>) {
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
    async function createObject()
    {
        const response = await CreateRequest(model_name, object)
        console.log(`response: ${response}`)
        navigate(`/list/${model_name}`);
    }

    useEffect(() => {
        console.log("[CreatePage.tsx -> useEffect()] Start")
        
      
    }, [])
    

    return (
        <>
            <div>Create {model_name} Page</div>
            <FormWidget form={modelInfo.form} model_name={model_name} changeObject={handleChange} handleSubmit={createObject} object={object}/>
            <button onClick={printObject}>Check Object</button>
        </>
    )
}

export default CreatePage