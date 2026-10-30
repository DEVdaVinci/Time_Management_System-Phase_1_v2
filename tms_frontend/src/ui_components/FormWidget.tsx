import React, { useEffect, useState } from 'react'

import type { FormConfig, ModelNames, WriteRequest, ReadResponse_Shallow } from "../utils/models";
import FieldWidget from "./FieldWidget";
import { ListRequest } from '../utils/apiRequests';

type FormWidgetProps<M extends ModelNames> = {
    model_name: M,
    form: FormConfig,
    changeObject: Function,
    handleSubmit: () => void,
    object: WriteRequest<M>,
}

function FormWidget<M extends ModelNames>({model_name, form, changeObject, handleSubmit, object}: FormWidgetProps<M>) {

  type ObjectsMap = 
  {
    [C in ModelNames]?: ReadResponse_Shallow<C>[]
  };
  const [connectionMap, setConnectionMap] = useState<ObjectsMap>({})

  useEffect(() => {
    let connections_model_names = new Set<ModelNames>()
    //get all connection objects
    form.fields.forEach((field) => {
      if("connection" in field)
      {
        connections_model_names.add(field.connection)
      }
    })
    
    let connectionObjectsMap: ObjectsMap = {};

    
    //store connection models in set
    connections_model_names.forEach((connection) => {
      let testMap = connectionObjectsMap[connection]
      console.log(testMap)

      ListRequest(connection).then((data)=>{
        setConnectionMap({
          ...connectionMap,
          [connection]: data,
        })
      })
        
    })
  
    
  }, [])
  
  return (
    <>
      <form>
        {form.fields.map((field) => {
            return (
            <div className='m-5'>
             <FieldWidget 
              field={field} changeObject={changeObject} 
              variable={(object as Record<string, any>)[field.name]} 
              {...(field.fieldType == "connection" ? {connection_model_name: field.connection, connectionObjects: connectionMap[field.connection],} : {})}
             />
            </div>
            )
        })}
        <button type="submit" className="btn btn-primary mb-2" onClick={(event) => {event.preventDefault(); handleSubmit();}}>Submit</button>
      </form>
    </>
  )
}

export default FormWidget