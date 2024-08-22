import React from "react";


import { Container } from './style';

import Breadcrumb from '../../components/Breadcrumb';
import Title from '../../components/Title';
import ButtonAdd from "../ButtonAdd";

export default function PageHeader({ titulo, adicionar, exportar, onClick, breadItens, btnExport }) {
    return (
        <Container>
            <div>
                <Title>{titulo}</Title>
                <Breadcrumb breadItens={breadItens} />
            </div>

            <ButtonAdd
                adicionar={adicionar}
                exportar={exportar}
                onClick={onClick}
                btnExport={btnExport}
            />

        </Container>
    )
}