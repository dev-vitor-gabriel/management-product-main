
import api from "./api";


const getServices = async () => {
    try {
        const response = await api.get("/servico");
        // const response = [
        //     {
        //         id_servico_ser: 1,
        //         des_servico_ser: 'teste 1',
        //         txt_servico_ser: 'obs do servico',
        //         vlr_servico_ser: 12.50,
        //         created_at: '2023-09-28 20:50'
        //     },
        //     {
        //         id_servico_ser: 2,
        //         des_servico_ser: 'teste 2',
        //         txt_servico_ser: 'obs do servico2',
        //         vlr_servico_ser: 11.50,
        //         created_at: '2023-09-28 21:50'
        //     }
        // ];
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveServices = async (obj) => {
    try {
        // const response = await api.get("/service");
        if(obj.id_servico_ser){
            const response = await api.put(`/servico/${obj.id_servico_ser}`, obj);
            return response;
        }else{
            const response = await api.post("/servico", obj);
            return response;
        }
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return { error: error.message, message: error?.response?.data };
    }
};

export { getServices, saveServices };
