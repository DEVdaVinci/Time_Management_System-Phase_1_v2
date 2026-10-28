import React from 'react'
import { ModelInfo, models, type ModelNames } from '../utils/models'
import FormWidget from '../ui_components/FormWidget'

type CreatePageProps<M extends ModelNames> = {
    model_name: M,
}

function CreatePage<M extends ModelNames>({model_name, id}: CreatePageProps<M>) {
    const modelInfo:ModelInfo = models[model_name]

    return (
        <>
            <div>Create {model_name} Page (ID: {id})</div>
            <FormWidget form={modelInfo.form} model_name={model_name}/>
        </>
    )
}

export default CreatePage