import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getUsuario } from "../../../../services/usuario";
import { formatDate } from "../../../../utils/dateHelper";
import UsuarioForm from "./usuarioForm";
import UsuarioTable from "./usuarioTable";

export default function Usuario() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        try {
            const response = await getUsuario();
            setRegs(response);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id) => {
        const edit = regs.filter((reg) => reg.id == id)[0];
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
                adicionar='Novo Usuário'
                exportar='Exportar'
                exportFilename='export_usuario'
                dataset={regs.map(reg=>({'ID':reg.id, 'Nome': reg.name, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <UsuarioTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <UsuarioForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}