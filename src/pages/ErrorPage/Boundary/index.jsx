import React from "react";

import { ErrorBoundary } from 'react-error-boundary';


import { useNavigate } from "react-router-dom";
import Content from "../../../components/Content";
import { Container, ErrorTitle, Link, Message } from "./style";

function FallbackComponent({ error, resetErrorBoundary }){
    const navigate = useNavigate();
    return (
        <Content>
            <Container>
            <ErrorTitle>Oops!</ErrorTitle>
            <Message>Ocorreu um erro!</Message>
            <Link onClick={()=>{navigate('/'); resetErrorBoundary();}}>Clique aqui para voltar a página inicial</Link>
            </Container>
        </Content>
    )
}

// Error logging function
function logErrorToService(error, info) {
    console.error("Caught an error:", error, info);
  }
  

export default function Boundary({children}) {
    return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={logErrorToService}>
        {children}
    </ErrorBoundary>
    )
    
}