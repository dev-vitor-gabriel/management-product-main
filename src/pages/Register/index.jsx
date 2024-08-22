import React, {useState, useContext} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

import { toast } from 'react-toastify';

import {MdEmail, MdLock, MdPerson} from 'react-icons/md';

import {
    LoginPage, 
    ContainerLogin, 
    Logo,
    Form,
    FormTitle,
    Input,
    BoxLink,
    Button
} from './style';

import logo from '../../assets/logo-zanex.png';

function Register() {

    const { signUp, loadingAuth } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp(event) {
        event.preventDefault();

        if(password.length < 6) {
            toast.warning('A senha deve conter no mínimo 6 caracteres!')
            return
        }

        signUp({name, email, password});

        setName('');
        setEmail('');
        setPassword('');

    }

    return(
        <LoginPage>
            <Logo src={logo} alt="logo"/>
            <ContainerLogin>
                <Form onSubmit={handleSignUp}>
                    <FormTitle>Cadastro</FormTitle>
                    
                    <Input type="text">
                        <MdPerson size={18} color="#6c757d"/>
                        <input 
                            required
                            type="text" 
                            placeholder="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Input>
                    <Input type="email">
                        <MdEmail size={18} color="#6c757d"/>
                        <input 
                            required
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Input>
                    <Input type="password">
                        <MdLock size={18} color="#6c757d"/>
                        <input 
                            required
                            type="password" 
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Input>
                    
                    <Button>{loadingAuth? <span>Carregando...</span> : <span>Cadastrar-se</span>}</Button>
                    
                    <BoxLink textalign="center">
                        <span>Já possui uma conta? </span>
                        <Link to="/login">Entrar</Link>
                    </BoxLink>
                </Form>
            </ContainerLogin>
        </LoginPage>
    )
}

export default Register;