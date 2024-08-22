
import api from "./api";


const getMaterial = async () => {
    try {
        const response = await api.get("/material");
        // const response = [
        //     {
        //         id_material_mte: 1,
        //         des_material_mte: 'Lamina de barbear',
        //         id_unidade_mte: '1',
        //         des_unidade: 'UN',
        //         vlr_material_mte:'1.00',
        //         created_at: '2023-01-01'
        //     },
        //     {
        //         id_material_mte: 2,
        //         des_material_mte: 'Giz Preto',
        //         id_unidade_mte: '2',
        //         des_unidade: 'UN',
        //         vlr_material_mte:'5.00',
        //         created_at: '2023-01-01'
        //     },
        // ];
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const deleteMaterial = async (id) => {
    try {
        // const response = await api.get("/service");
        const response = {};
        return response;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveMaterial = async (obj) => {
    try {
        console.log(obj)
        const response = await api.post("/material", obj, {
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

export { deleteMaterial, getMaterial, saveMaterial };

