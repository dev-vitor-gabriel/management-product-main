
// import api from "./api";


const getEstoque = async () => {
    try {
        // const response = await api.get("/service");
        const response = [
            {
                id_estoque_est:1,
                des_estoque_est:'Estoque A',
                created_at:'2023-01-01',
                updated_at:'2023-01-01'
            },
            {
                id_estoque_est:2,
                des_estoque_est:'Estoque B',
                created_at:'2023-01-01',
                updated_at:'2023-01-01'
            },
        ];
        return response;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteEstoque = async (id) => {
    try {
        // const response = await api.get("/service");
        const response = {};
        return response;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveEstoque = async (obj) => {
    try {
        // const response = await api.get("/service");
        const success = false;
        return success;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};


export { deleteEstoque, getEstoque, saveEstoque };

