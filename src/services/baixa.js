
import api from "./api";


const getBaixas = async (tipoMovimentacao) => {
    try {
        const response = await api.get(`/movimentacao/${tipoMovimentacao}`);
        // const response = {data:[
        //     {
        //         id_movimentacao_mov:1,
        //         txt_movimentacao_mov:'',
        //         id_estoque_entrada_mov:1,
        //         des_estoque_entrada_est: 'Estoque A',
        //         id_estoque_saida_mov:null,
        //         des_estoque_saida_est: null,
        //         is_ativo_mov:1,
        //         id_centro_custo_mov:1,
        //         materiais:[
        //             {
        //                 id_material_mte:1,
        //                 des_material_mte:'Material A',
        //                 des_reduz_unidade_und:'UN',
        //                 qtd_material_mit:1,
        //                 vlr_material_mte:2000,
        //             },
        //             {
        //                 id_material_mte:2,
        //                 des_material_mte:'Material B',
        //                 des_reduz_unidade_und:'UN',
        //                 qtd_material_mit:1,
        //                 vlr_material_mte:2000,
        //             }
        //         ],
        //         created_at:'2023-01-01 00:00:00',
        //     },
        //     {
        //         id_movimentacao_mov:2,
        //         txt_movimentacao_mov:'',
        //         id_estoque_entrada_mov:1,
        //         des_estoque_entrada_est: 'Estoque B',
        //         id_estoque_saida_mov:null,
        //         des_estoque_saida_est: null,
        //         is_ativo_mov:1,
        //         id_centro_custo_mov:1,
        //         materiais:[
        //             {
        //                 id_material_mte:1,
        //                 des_material_mte:'Material A',
        //                 qtd_material_mit:3,
        //                 vlr_material_mte:2000,
        //             },
        //             {
        //                 id_material_mte:2,
        //                 des_material_mte:'Material B',
        //                 qtd_material_mit:2,
        //                 vlr_material_mte:2000,
        //             }
        //         ],
        //         created_at:'2023-01-01 00:00:00'
        //     },
        // ]};
        return response.data;
    } catch (error) {
        // console.error("Erro ao buscar:", error);
        return [];
    }
};
const deleteBaixa = async (id) => {
    try {
        // const response = await api.get("/service");
        // if(obj.id_movimentacao_mov){
        //     const response = await api.put(`/baixa/${obj.id_servico_ser}`, obj);
        //     return response;
        // }else{
        //     const response = await api.post("/baixa", obj);
        //     return response;
        // }
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return { error: error.message, message: error?.response?.data };
    }
};
const saveBaixa = async (tipoMovimentacao, obj) => {
    try {
        // const response = await api.get("/service");
        if(obj.id_movimentacao_mov){
            const response = await api.put(`/movimentacao/${tipoMovimentacao}/${obj.id_movimentacao_mov}`, obj);
            return response;
        }else{
            const response = await api.post(`/movimentacao/${tipoMovimentacao}`, obj);
            return response;
        }
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return { error: error.message, message: error?.response?.data };
    }
};

export { deleteBaixa, getBaixas, saveBaixa };

