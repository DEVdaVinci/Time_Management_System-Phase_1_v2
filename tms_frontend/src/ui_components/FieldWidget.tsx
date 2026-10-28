import React from 'react'

import type { ModelNames, FormField, ReadResponse_Shallow } from "../utils/models";

type FieldWidgetProps<M extends ModelNames> = {
    field: FormField,
    connection_model_name?: M,
    connectionObjects?: ReadResponse_Shallow<M>[],
}

function FieldWidget<M extends ModelNames>({field, connection_model_name, connectionObjects}: FieldWidgetProps<M>) {

    const fieldID = field.name
    if("connection" in field && "multiple" in field)
    {
        return (
            <>
                <select className="custom-select" multiple={field.multiple}>
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
                <textarea className="form-control" id={fieldID} rows={field.rows}></textarea>
            </>
        )
    }
    else if(field.fieldType == "checkbox")
    {
        return (
            <>
                <input className="form-check-input" type="checkbox" id={fieldID}/>
                <label className="form-check-label" htmlFor={fieldID}>{field.name}</label>
            </>
        )
                
    }
    else
    {
        return (
            <>
                <label htmlFor={fieldID}>{field.name}</label>
                <input type={field.fieldType} className="form-control" id={fieldID}/>
            </>
        )
    }
}

export default FieldWidget