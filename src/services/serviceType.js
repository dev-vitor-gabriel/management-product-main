
import { useQuery } from "@tanstack/react-query";
import api from "./api";

const GetServiceTypeQuery = () => {
    return useQuery({
            queryKey: ['getServiceType'],
            queryFn: getServiceType,
            staleTime: 1 * 10 * 1000
        });
  };
  
const getServiceType = async (id_centro_custo = null) => {
    try {
        const response = await api.get(`/servicoTipo?id_centro_custo_stp=${id_centro_custo}`);

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteServiceType = async (id) => {
    try {
        await api.delete(`/servicoTipo/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveServiceType = async (obj) => {
    try {
        const response = await api.post("/servicoTipo", obj, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        const success = true;
        return success;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};


export { GetServiceTypeQuery, deleteServiceType, getServiceType, saveServiceType };

