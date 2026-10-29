import React, { useEffect, useState } from 'react'
import { ModelInfo, models, type ModelNames, type WriteRequest } from '../utils/models'
import FormWidget from '../ui_components/FormWidget'

type CreatePageProps<M extends ModelNames> = {
    model_name: M,
}

function CreatePage<M extends ModelNames>({model_name}: CreatePageProps<M>) {
    const modelInfo:ModelInfo = models[model_name]
    const [object, setObject] = useState<WriteRequest<M>>({} as WriteRequest<M>);

    function printObject()
    {
        console.log(`Printing the current value of the ${model_name} object ...`)
        Object.entries(object).forEach((key, value) => {
            
            console.log(`${key}:\t\t${value}`)
            
        })
        console.log("=========================================================")
    }
    function handleChange(key:string, value: any)
    {
        setObject({
            ...object,
            [key]: value
        })
    }

    useEffect(() => {
        console.log("[CreatePage.tsx -> useEffect()] Start")
        try 
        {
            setObject({
                ...object,
                name: "react create test#6 IF YOU ARE READING THIS THE TEST FAILED!!!!!!",    description: `IF YOU ARE READING THIS THE TEST FAILED!!!!!! This ${model_name} was created from the frontend. Made with test create page. Payload/data was suposed to be user created using the form. I developed and implimented the model registry (i.e. ModelInfo and ModelTypes) IF YOU ARE READING THIS THE TEST FAILED!!!!!!`,
                version_number_major: 10,
                version_number_minor: 5, 
            });

            printObject();
        }
        catch (error) {
            console.log("Error!! Object missing name, version_number_major, and/or version_number_minor");
        }
      
    }, [])
    

    return (
        <>
            <div>Create {model_name} Page</div>
            <FormWidget form={modelInfo.form} model_name={model_name} changeObject={handleChange} object={object}/>
            <button onClick={printObject}>Check Object</button>
        </>
    )
}

export default CreatePage