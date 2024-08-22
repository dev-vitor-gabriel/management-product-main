import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getCentroCusto } from "../../../../services/centroCusto";
import { formatDate } from "../../../../utils/dateHelper";
import CentroCustoForm from "./centroCustoForm";
import CentroCustoTable from "./centroCustoTable";

export default function CentroCusto() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        try {
            const response = await getCentroCusto();
            setRegs(response);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_centro_custo_cco) => {
        const edit = regs.filter((reg) => reg.id_centro_custo_cco == id_centro_custo_cco)[0];
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
                adicionar='Novo Centro de Custo'
                exportar='Exportar'
                exportFilename='export_centro_custo'
                dataset={regs.map(reg=>({'ID':reg.id_centro_custo_cco, 'Descrição': reg.des_centro_custo_cco, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <CentroCustoTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <CentroCustoForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}