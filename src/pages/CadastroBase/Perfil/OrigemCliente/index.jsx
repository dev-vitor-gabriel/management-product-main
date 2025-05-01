import { useEffect, useState } from "react";
import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";
import { formatDate } from "../../../../utils/dateHelper";
import OrigemClienteForm from "./origemClienteForm";
import OrigemClienteTable from "./origemClienteTable";
import { getOrigemCliente } from "../../../../services/origemCliente";


export default function OrigemCliente() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchRegs = async () => {
        try {
            const response = await getOrigemCliente();

            setRegs(response.items);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_origem_cliente_orc) => {
        const edit = regs.filter((reg) => reg.id_origem_cliente_orc == id_origem_cliente_orc)[0];
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
                dataset={regs.map(reg=>({'ID':reg.id_origem_cliente_orc, 'Descrição': reg.desc_origem_cliente_orc, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <OrigemClienteTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <OrigemClienteForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}