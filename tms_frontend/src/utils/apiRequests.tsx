import axios from "./axiosConfig";
import { models, type ModelNames, type ReadResponse_Shallow } from './models';

export async function ListRequest<M extends ModelNames>(model_name: M): Promise<ReadResponse_Shallow<M>[]> {
    const host: string = import.meta.env.VITE_BACKEND_HOST
    const port: string = import.meta.env.VITE_BACKEND_PORT_NUMBER
    const url: string = `https://${host}:${port}/${models[model_name].name_plural}/`

    const data:ReadResponse_Shallow<M>[] = await axios.get(url)
    return data;
    
}