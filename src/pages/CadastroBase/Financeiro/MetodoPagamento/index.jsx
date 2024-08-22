import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getMetodoPagamento } from "../../../../services/metodoPagamento";
import { formatDate } from "../../../../utils/dateHelper";
import MetodoPagamentoForm from "./metodoPagamentoForm";
import MetodoPagamentoTable from "./metodoPagamentoTable";

export default function MetodoPagamento() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        try {
            const response = await getMetodoPagamento();
            setRegs(response);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_metodo_pagamento_tmp) => {
        const edit = regs.filter((reg) => reg.id_metodo_pagamento_tmp == id_metodo_pagamento_tmp)[0];
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
                adicionar='Novo Método de Pagamento'
                exportar='Exportar'
                exportFilename='export_metodo_pagamento'
                dataset={regs.map(reg=>({'ID':reg.id_metodo_pagamento_tmp, 'Descrição': reg.desc_metodo_pagamento_tmp, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <MetodoPagamentoTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <MetodoPagamentoForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}