import { useEffect, useState } from "react";


import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getCliente } from "../../../../services/cliente";
import { formatDate } from "../../../../utils/dateHelper";
import ClienteForm from "./clienteForm";
import ClienteTable from "./clienteTable";

export default function Cliente() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchRegs = async () => {
        try {
            const response = await getCliente();
            setRegs(response.items);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_cliente_cli) => {
        const edit = regs.filter((reg) => reg.id_cliente_cli == id_cliente_cli)[0];
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
                adicionar='Novo Cliente'
                exportar='Exportar'
                exportFilename='export_cliente'
                dataset={regs.map(reg=>({'ID':reg.id_cliente_cli, 'Nome': reg.des_cliente_cli,'Telefone': reg.telefone_cliente_cli,'Email': reg.email_cliente_cli, 'Centro de Custo': reg.des_centro_custo_cco, 'Origem Cliente': reg.desc_origem_cliente_orc, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <ClienteTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <ClienteForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}