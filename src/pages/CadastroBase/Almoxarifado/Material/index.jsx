import { useEffect, useState } from "react";





import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getMaterial } from "../../../../services/material";
import { formatDate } from "../../../../utils/dateHelper";
import MaterialForm from "./materialForm";
import MaterialTable from "./materialTable";

export default function Material() {

    const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchRegs = async () => {
        console.log("fetching")
        try {
            const response = await getMaterial();
            setRegs(response);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    useEffect(() => {
        fetchRegs();
    }, []);

    const handleEdit = (id_material_mte) => {
        const edit = regs.filter((reg) => reg.id_material_mte == id_material_mte)[0];
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
                exportFilename='export_material'
                dataset={regs.map(reg=>({'ID':reg.id_material_mte, 'Descrição': reg.des_material_mte, 'Unidade': reg.des_unidade, 'Valor': reg.vlr_material_mte, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <MaterialTable data={regs} handleEdit={handleEdit} />
            {modalIsOpen && <MaterialForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}
        </Content>
    )
}