import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { formatDate } from "../../../../utils/dateHelper";
import { getFuncionario } from "../../../../services/funcionario";
import FuncionarioTable from "./funcionarioTable";
import FuncionarioForm from "./funcionarioForm";

export default function Funcionario() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        try {
            const response = await getFuncionario();
            setRegs(response);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_funcionario_tfu) => {
        const edit = regs.filter((reg) => reg.id_funcionario_tfu == id_funcionario_tfu)[0];
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
                adicionar='Novo Funcionario'
                exportar='Exportar'
                exportFilename='export_funcionario'
                dataset={regs.map(reg=>(
                    {   'ID':reg.id_funcionario_tfu,
                        'Descrição': reg.desc_funcionario_tfu,
                        'Telefone': reg.telefone_funcionario_tfu,
                        'Documento': reg.documento_funcionario_tfu,
                        'Endereço': reg.endereco_funcionario_tfu,
                        'Data Criação': formatDate(reg.created_at)}))}
            />
            <FuncionarioTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <FuncionarioForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}