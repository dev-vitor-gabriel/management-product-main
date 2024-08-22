import React, {useState, useContext} from "react";

import { Link } from "react-router-dom";

import {MdEmail, MdLock} from 'react-icons/md';

import { AuthContext } from "../../contexts/auth";

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

function Login() {

    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn(event) {
        event.preventDefault();

        signIn({email, password})

        setEmail('');
        setPassword('');
    }

    return(
        <LoginPage>
            <Logo src={logo} alt="logo"/>
            <ContainerLogin>
                <Form onSubmit={handleSignIn}>
                    <FormTitle>Entrar</FormTitle>

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

                    <BoxLink textalign="right">
                        <a href="#">Esqueceu sua senha?</a>
                    </BoxLink>
                    
                    <Button>{loadingAuth? <span>Carregando...</span> : <span>Entrar</span>}</Button>
                    
                    <BoxLink textalign="center">
                        <span>Não é um membro? </span>
                        <Link to="/register">Criar uma conta</Link>
                    </BoxLink>
                </Form>
            </ContainerLogin>
        </LoginPage>
    )
}

export default Login;