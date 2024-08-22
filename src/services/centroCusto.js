
import api from "./api";


const getCentroCusto = async () => {
    try {
        const response = await api.get("/centroCusto");
        // const response = [
        //     {
        //         id_centro_custo_cco:1,
        //         des_centro_custo_cco:'CEntro de Custo 1',
        //         created_at:'2023-01-01',
        //         updated_at:'2023-01-01'
        //     },
        //     {
        //         id_centro_custo_cco:2,
        //         des_centro_custo_cco:'Centro de Custo 2',
        //         created_at:'2023-01-01',
        //         updated_at:'2023-01-01'
        //     },
        // ];
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteCentroCusto = async (id) => {
    try {
        await api.delete(`/centroCusto/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveCentroCusto = async (obj) => {
    try {
        if(obj.id_centro_custo_cco){
            await api.put(`/centroCusto/${obj.id_centro_custo_cco}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/centroCusto", obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return true;
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return false;
    }
};


export { deleteCentroCusto, getCentroCusto, saveCentroCusto };

