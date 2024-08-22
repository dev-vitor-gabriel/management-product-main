import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getCargo } from "../../../../services/cargo";
import { formatDate } from "../../../../utils/dateHelper";
import CargoForm from "./cargoForm";
import CargoTable from "./cargoTable";

export default function Cargo() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        try {
            const response = await getCargo();
            setRegs(response);
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_cargo_tcg) => {
        const edit = regs.filter((reg) => reg.id_cargo_tcg == id_cargo_tcg)[0];
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
                adicionar='Novo Cargo'
                exportar='Exportar'
                exportFilename='export_cargo'
                dataset={regs.map(reg=>({'ID':reg.id_cargo_tcg, 'Descrição': reg.desc_cargo_tcg, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <CargoTable data={regs} handleEdit={handleEdit} refresh={fetchRegs} />
            {modalIsOpen && <CargoForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}