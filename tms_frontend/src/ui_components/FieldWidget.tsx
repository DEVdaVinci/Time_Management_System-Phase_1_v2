import React from 'react'

import type { ModelNames, FormField, ReadResponse_Shallow } from "../utils/models";

type FieldWidgetProps<M extends ModelNames> = {
    field: FormField,
    connection_model_name?: M,
    connectionObjects?: ReadResponse_Shallow<M>[],
    changeObject: Function,
    variable: any,
}

function FieldWidget<M extends ModelNames>({field, connection_model_name, connectionObjects, changeObject, variable}: FieldWidgetProps<M>) {

    const fieldID = field.name
    if("connection" in field && "multiple" in field)
    {
        return (
            <>
                <select className="custom-select" value={field.multiple ? (variable ?? []) : (variable ?? "")} onChange={(e) => {
                    let newVal = field.multiple ? (Array.from(e.target.selectedOptions, option=>option.value)) : (e.target.value)
                    changeObject(field.name, newVal)
                    }} multiple={field.multiple}>
                    <option selected>Select {field.name}</option>
                    {
                        connectionObjects?.map((object) => {
                            let objectName = ""
                            if("name" in object)
                            {
                                objectName = object.name
                            }
                            else if(("username" in object))
                            {
                                objectName = object.username
                            }
                            else
                            {
                                throw new Error(`[FieldWidget.tsx -> Connection Field] Object is of improper type! It should have a name or username variable but neither were found. type: ${typeof object} Object: ${object}`);
                            }

                            return <option value={object.id}> {objectName} </option>
                        })
                    }
                    
                </select>
            </>
        )
    }
    else if("rows" in field)
    {
        return (
            <>
                <label htmlFor={fieldID}>{field.name}</label>
                <textarea className="form-control" id={fieldID} rows={field.rows} onChange={(e) => {changeObject(field.name, e.target.value)}} value={variable}></textarea>
            </>
        )
    }
    else if(field.fieldType == "checkbox")
    {
        return (
            <>
                <input className="form-check-input" type="checkbox" id={fieldID} onChange={(e) => {changeObject(field.name, e.target.checked)}} value={variable}/>
                <label className="form-check-label" htmlFor={fieldID}>{field.name}</label>
            </>
        )
    }
    else
    {
        return (
            <>
                <label htmlFor={fieldID}>{field.name}</label>
                <input type={field.fieldType} className="form-control" id={fieldID} onChange={(e) => {changeObject(field.name, e.target.value)}} value={variable}/>
            </>
        )
    }
}

export default FieldWidget