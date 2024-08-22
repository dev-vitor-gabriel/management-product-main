import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getInstituicaoPagamento } from "../../../../services/instituicaoPagamento";
import { formatDate } from "../../../../utils/dateHelper";
import InstituicaoPagamentoForm from "./instituicaoPagamentoForm";
import InstituicaoPagamentoTable from "./instituicaoPagamentoTable";

export default function InstituicaoPagamento() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        try {
            const response = await getInstituicaoPagamento();
            setRegs(response);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_instituicao_pagamento_tip) => {
        const edit = regs.filter((reg) => reg.id_instituicao_pagamento_tip == id_instituicao_pagamento_tip)[0];
        setRegEdited(edit)
        setModalIsOpen(true);
    }

    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setRegEdited({});
                    setModalIsOpen(true)
                }}
                adicionar='Nova Instituição de Pagamento'
                exportar='Exportar'
                exportFilename='export_instituicao_pagamento'
                dataset={regs.map(reg=>({'ID':reg.id_instituicao_pagamento_tip, 'Descrição': reg.desc_instituicao_pagamento_tip, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <InstituicaoPagamentoTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <InstituicaoPagamentoForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}