import { Container, ContentPage } from './style';


import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Content from '../../components/Content';
import Sidenav from '../../components/Sidenav';
import Topbar from "../../components/Topbar";
import { PaginationContext } from '../../contexts/pagination';
import Private from '../../routes/Private';


export default function Layout() {

    // TODO
    // rota autenticada, se nao tiver logado, deve enviar para login

    const { title, breadItens } = useContext(PaginationContext);
    return (
        <Private>
            <Container>
                <Sidenav />
                <Topbar />

                <ContentPage>
                    <Content>
                        <Outlet />
                    </Content>
                </ContentPage>
            </Container>
        </Private>
    )
}