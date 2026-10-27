import axios from "axios"; //import axios from "./axiosConfig";
import { models, type ModelNames, type ReadResponse_Shallow } from './models';

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