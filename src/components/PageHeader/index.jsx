import React from "react";
import * as XLSX from 'xlsx';
import ButtonAdd from "../ButtonAdd";
import { Container } from './style';

export default function PageHeader({ adicionar, exportar, onClick, exportFilename = 'export', dataset = [] }) {

    const exportToExcel = async () => {
        const dateNow = (new Date()).toLocaleString().split(',').join('');
        // Criar uma planilha
        const ws = XLSX.utils.json_to_sheet(dataset);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'UserData');

        // Salvar o arquivo
        XLSX.writeFile(wb, `${exportFilename}_${dateNow}.xlsx`);
    }

    return (
        <Container>
            <ButtonAdd
                adicionar={adicionar}
                exportar={exportar}
                onClick={onClick}
                btnExport={exportToExcel}
            />
        </Container>
    )
}
