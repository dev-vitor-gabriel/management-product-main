import { useEffect, useState } from "react";





import Content from "../../../components/Content";
import PageHeader from "../../../components/PageHeader";

import { getBaixas } from "../../../services/baixa";
import { formatDate } from "../../../utils/dateHelper";
import BaixaForm from "./baixaForm";
import BaixaTable from "./baixaTable";

export default function Baixa({tipoMovimentacao}) {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        try {
            const response = await getBaixas(tipoMovimentacao);
            setRegs(response);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_movimentacao_mov) => {
        const edit = regs.filter((reg) => reg.id_movimentacao_mov == id_movimentacao_mov)[0];
        const newEdit = {...edit};
        newEdit.materiais = newEdit.materiais.map((reg) => {
            return ({
                value: reg.id_material_mte,
                label: `${reg.des_material_mte}`,
                custom: [
                    {
                        prefixDefault: reg.des_reduz_unidade_und ?? '',
                        label: 'Quantidade',
                        column: 'qtd_material_mit',
                        value: reg.qtd_material_mit,
                        type: 'number'
                    },
                    {
                        label: 'Valor Unitário',
                        column: 'vlr_material_mte',
                        value: reg.vlr_material_mte,
                        type: 'number',
                        mask: 'currency'
                    }
                ]
            });
        })
        setRegEdited(newEdit)
        setModalIsOpen(true);
    }



    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setRegEdited({});
                    setModalIsOpen(true)
                }}
                adicionar='Novo'
                exportar='Exportar'
                exportFilename='export_material'
                dataset={regs.map(reg=>({'ID':reg.id_material_mte, 'Descrição': reg.des_material_mte, 'Unidade': reg.des_unidade, 'Valor': reg.vlr_material_mte, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <BaixaTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <BaixaForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} tipoMovimentacao={tipoMovimentacao}/>}
        </Content>
    )
}