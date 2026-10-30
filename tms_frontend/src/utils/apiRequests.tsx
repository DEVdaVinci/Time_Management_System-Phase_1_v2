import axios from "axios"; //import axios from "./axiosConfig";
import { models, type ModelNames, type ReadResponse_Shallow, type WriteRequest } from './models';

export async function ListRequest<M extends ModelNames>(model_name: M): Promise<ReadResponse_Shallow<M>[]> {
    console.log("[apiRequests.tsx -> ListRequest()] Start")
    const host: string = import.meta.env.VITE_BACKEND_HOST
    const port: string = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url: string = `http://${host}:${port}/api/${models[model_name].name_plural}/`

    console.log("[apiRequests.tsx -> ListRequest()] url: ", url)
    console.log("[apiRequests.tsx -> ListRequest()] making request ...")
    const response = await axios.get(url)
    const data:ReadResponse_Shallow<M>[] = response.data
    return data;
}

export async function CreateRequest<M extends ModelNames>(model_name: M, payload: WriteRequest<M>)
{
    console.log("[apiRequests.tsx -> CreateRequest()] Start")
    const host: string = import.meta.env.VITE_BACKEND_HOST
    const port: string = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url: string = `http://${host}:${port}/api/${models[model_name].name_plural}/`

    console.log("[apiRequests.tsx -> CreateRequest()] url: ", url)
    console.log("[apiRequests.tsx -> CreateRequest()] making request ...")
    const response = await axios.post(url, payload)
    const data = response.data
    return data;
}

export async function ReadRequest<M extends ModelNames>(model_name: M, id:string): Promise<ReadResponse_Shallow<M>>
{
    console.log("[apiRequests.tsx -> ReadRequest()] Start")
    const host: string = import.meta.env.VITE_BACKEND_HOST
    const port: string = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url: string = `http://${host}:${port}/api/${models[model_name].name_plural}/${id}`

    console.log("[apiRequests.tsx -> ReadRequest()] url: ", url)
    console.log("[apiRequests.tsx -> ReadRequest()] making request ...")
    const response = await axios.get(url)
    const data:ReadResponse_Shallow<M> = response.data
    return data;
}

export async function UpdateRequest<M extends ModelNames>(model_name: M, payload: WriteRequest<M>, id:string)
{
    console.log("[apiRequests.tsx -> UpdateRequest()] Start")
    const host: string = import.meta.env.VITE_BACKEND_HOST
    const port: string = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url: string = `http://${host}:${port}/api/${models[model_name].name_plural}/${id}`

    console.log("[apiRequests.tsx -> UpdateRequest()] url: ", url)
    console.log("[apiRequests.tsx -> UpdateRequest()] making request ...")
    const response = await axios.post(url, payload)
    const data = response.data
    return data;
}

export async function DeleteRequest<M extends ModelNames>(model_name: M, id:string)
{
    console.log("[apiRequests.tsx -> DeleteRequest()] Start")
    const host: string = import.meta.env.VITE_BACKEND_HOST
    const port: string = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url: string = `http://${host}:${port}/api/${models[model_name].name_plural}/${id}`

    console.log("[apiRequests.tsx -> DeleteRequest()] url: ", url)
    console.log("[apiRequests.tsx -> DeleteRequest()] making request ...")
    const response = await axios.delete(url)
    const data = response.data
    return data;
}