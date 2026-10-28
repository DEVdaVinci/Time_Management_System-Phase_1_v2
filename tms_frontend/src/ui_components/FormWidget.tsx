import React from 'react'

import type { FormConfig, ModelNames, WriteRequest } from "../utils/models";
import FieldWidget from "./FieldWidget";

type FormWidgetProps<M extends ModelNames> = {
    model_name: M,
    form: FormConfig,
    object?: WriteRequest<M>,
}

function FormWidget<M extends ModelNames>({model_name, form, object}: FormWidgetProps<M>) {
  return (
    <>
      <form>
        {form.fields.map((field) => {
            return (
            <div>
              <FieldWidget field={field}/>
            </div>
            )
        })}
        <button type="submit" className="btn btn-primary mb-2">Submit</button>
      </form>
    </>
  )
}

export default FormWidget