
import api from "./api";


const getUsuario = async () => {
    try {
        const response = await api.get("/auth");
        // const response = [
        //     {
        //         id:1,
        //         name:'User 1',
        //         email: 'user@user.com',
        //         password: '123123',
        //         url_img_user: 'assets/images/file.png',
        //         created_at:'2023-01-01',
        //         updated_at:'2023-01-01'
        //     },
        //     {
        //         id:2,
        //         name:'User 2',
        //         email: 'user2@user2.com',
        //         password: '123123',
        //         url_img_user: 'assets/images/file.png',
        //         created_at:'2023-01-01',
        //         updated_at:'2023-01-01'
        //     },
        // ];
        return response.data;
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
    try {
        if(obj.id){
            await api.put(`/auth/${obj.id}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/auth/register", obj, {
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


export { deleteUsuario, getUsuario, saveUsuario };

