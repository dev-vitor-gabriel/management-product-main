import React, {useContext} from "react";

import { PaginationContext } from "../../contexts/pagination";

import { Container } from './style';

import Sidenav from '../../components/Sidenav';
import Topbar from "../../components/Topbar";

import Content from "../../components/Content";
import PageHeader from "../../components/PageHeader";

export default function Empty() {

    const {title, breadItens} = useContext(PaginationContext);

    return(
        <Container>
            <Sidenav/>
            <Topbar/>

            <Content>
                <PageHeader title={title} breadItens={breadItens}/>
            </Content>    
        </Container>
    )
}