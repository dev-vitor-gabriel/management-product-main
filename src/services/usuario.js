
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
    let token = "";

    if (authorization) {
        const parsedAuthorization = JSON.parse(authorization);
        token = parsedAuthorization.token;
    }

    try {
        let response;
        if (obj.id) {
            response = await api.put(`/auth/${obj.id}`, obj, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } else {
            response = await api.post("/auth/register", obj, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 422) {
                return { success: false, errors: error.response.data.errors };
            }
        }
        return { success: false, errors: { general: ["Erro ao conectar ao servidor."] } };
    }
};



export { deleteUsuario, getUsuario, saveUsuario };

