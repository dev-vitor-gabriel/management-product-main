import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [userAuthorization, setUserAuthorization] = useState(null);
    const [userMenu, setUserMenu] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            const storageUser = localStorage.getItem('user');

            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        async function loadUserMenu() {
            const storageMenu = localStorage.getItem('menu');

            if(storageMenu) {
                setUserMenu(JSON.parse(storageMenu));
            }
        }

        loadUser();
        loadUserMenu();
    }, [])

    async function signUp(data) {
        setLoadingAuth(true);
        const response = await api.post('/auth/register', {
            "name": data.name,
            "email": data.email,
            "password": data.password,
        })
        toast.success('Cadastro realizado com sucesso!');
        setLoadingAuth(false);
        navigate("/login");
    }

    async function signIn(data) {
        setLoadingAuth(true);
        await api.post('/auth/login', {
            "email": data.email,
            "password": data.password,
        })
        .then((value) => {
            setUser(value.data.user);
            setUserAuthorization(value.data.authorization);
            setUserMenu(value.data.menu);
            
            storageUser(value.data.user);
            storageUserMenu(value.data.menu);
            // console.log(value.data.menu);
            
            toast.success('Seja bem vindo, ' + value.data.user.name + "!");
            setLoadingAuth(false);
            navigate('/');
        })
        .catch((error) => {
            toast.error('Email ou senha incorreto!');
            setLoadingAuth(false);
            return null;
        })
    }

    function logout() {
        localStorage.removeItem('user');
        navigate("/login");
    }

    function storageUser(data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    function storageUserMenu(data) {
        localStorage.setItem('menu', JSON.stringify(data));
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            userAuthorization,
            loading,
            loadingAuth,
            signIn,
            signUp,
            logout,
            userMenu, 
            setUserMenu
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;