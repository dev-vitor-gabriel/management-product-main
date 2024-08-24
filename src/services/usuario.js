
import api from "./api";


const getUsuario = async () => {
    try {
        const authorization = localStorage.getItem("authorization");

        if (authorization) {
            const parsedAuthorization = JSON.parse(authorization);
            var token = parsedAuthorization.token;
        }

        const { data } = await api.get("/auth", {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteUsuario = async (id) => {
    try {
        await api.delete(`/auth/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveUsuario = async (obj) => {
    const authorization = localStorage.getItem("authorization");

    if (authorization) {
        const parsedAuthorization = JSON.parse(authorization);
        var token = parsedAuthorization.token;
    }

    try {
        if(obj.id){
            await api.put(`/auth/${obj.id}`, obj, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/auth/register", obj, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        return true;
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return false;
    }
};


export { deleteUsuario, getUsuario, saveUsuario };

