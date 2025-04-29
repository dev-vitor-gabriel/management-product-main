import { useEffect, useState } from "react";
import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";
import { formatDate } from "../../../../utils/dateHelper";
import OrigemClienteForm from "./origemClienteForm";
import OrigemClienteTable from "./origemClienteTable";

export default function OrigemCliente() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchRegs = async () => {
        try {
            // const response = await getCliente();
            setRegs(response.items);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_origem_cliente) => {
        const edit = regs.filter((reg) => reg.id_origem_cliente == id_origem_cliente)[0];
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
                adicionar='Nova Origem do Cliente'
                exportar='Exportar'
                exportFilename='export_origem_cliente'
                dataset={regs.map(reg=>({'ID':reg.id_origem_cliente, 'Nome': reg.nome_origem_cliente,'Descrição': reg.descricao_cliente_cli, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <OrigemClienteTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <OrigemClienteForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}