
import api from "./api";


const getEmployee = async () => {
    try {
        const response = await api.get("/funcionario");
        // const response = [
        //     {
        //         value: 1,
        //         label: 'Joao'
        //     },
        //     {
        //         value: 2,
        //         label: 'Pedro'
        //     },
        // ];
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};


export { getEmployee };
