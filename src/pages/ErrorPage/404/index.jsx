import React from "react";



import { useNavigate } from "react-router-dom";
import Content from "../../../components/Content";
import { Container, ErrorTitle, Link, Message } from "./style";

export default function Page404() {

    const navigate = useNavigate();
    return (
        <Content>
            <Container>
            <ErrorTitle>404</ErrorTitle>
            <Message>Página não encontrada</Message>
            <Link onClick={()=>navigate('/')}>Clique aqui para voltar a página inicial</Link>
            </Container>
        </Content>
    )
}