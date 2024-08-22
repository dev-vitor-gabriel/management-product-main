import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getEstoque } from "../../../../services/estoque";
import { formatDate } from "../../../../utils/dateHelper";
import EstoqueForm from "./estoqueForm";
import EstoqueTable from "./estoqueTable";

export default function Estoque() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getEstoque();
                setRegs(response);
            } catch (error) {
                console.error("Erro ao buscar:", error);
            }
        };
        fetchServices();
    }, []);

    const handleEdit = (id_estoque_est) => {
        const edit = regs.filter((reg) => reg.id_estoque_est == id_estoque_est)[0];
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
                adicionar='Novo'
                exportar='Exportar'
                exportFilename='export_estoque'
                dataset={regs.map(reg=>({'ID':reg.id_estoque_est, 'Descrição': reg.des_estoque_est,'Data Criação': formatDate(reg.created_at)}))}
            />
            <EstoqueTable data={regs} handleEdit={handleEdit} />
            {modalIsOpen && <EstoqueForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} />}
        </Content>
    )
}