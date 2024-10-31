import axios from "axios";
import { Camisa } from "../interface/camisetaDataInterface";

interface Categoria {
  id: number;
  nome: string;
}

export async function getCamisas(): Promise<Camisa[]> {
    const [camisasResponse, categoriasResponse] = await Promise.all([
        axios.get("http://localhost:8080/camiseta"),
        axios.get("http://localhost:8080/categoria")
    ]);

    const camisas = camisasResponse.data as Camisa[];
    const categorias = categoriasResponse.data as Categoria[];

    return camisas.map(camisa => {
        const categoria = categorias.find(cat => cat.id === camisa.categoria_id);
        return { ...camisa, categoriaNome: categoria ? categoria.nome : "Sem categoria" };
    });
}


export async function deleteCamisa(id: number): Promise<void> {
  await axios.delete(await axios.delete(`http://localhost:8080/camiseta/${id}`));
}


export async function updateCamisa(camisa: Camisa): Promise<Camisa> {
  const response = await axios.put(`http://localhost:8080/camiseta/${camisa.id}`, camisa);
  return response.data as Camisa;
}