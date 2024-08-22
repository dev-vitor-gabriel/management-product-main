import { useContext, useEffect, useState } from "react";

import { PaginationContext } from "../../contexts/pagination";




import Content from "../../components/Content";
import PageHeader from "../../components/PageHeader";

import { getServices } from "../../services/service";
import { formatDate } from "../../utils/dateHelper";
import ServiceForm from "./serviceForm";
import ServiceTable from "./serviceTable";

export default function Service({ reg = null }) {

    const [services, setServices] = useState([]);

    const { title, breadItens } = useContext(PaginationContext);

    const [serviceEdited, setServiceEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response);
            } catch (error) {
                console.error("Erro ao buscar:", error);
            }
        };
        fetchServices();
    }, []);
    useEffect(() => {
        if (reg != null) {
            setServiceEdited(reg);
            setModalIsOpen(true);
        }
    }, []);

    const handleEdit = (id_servico_ser) => {
        const edit = services.filter((reg) => reg.id_servico_ser == id_servico_ser)[0];
        const newEdit = {...edit};
        newEdit.materiais = newEdit.materiais.map((reg) => {
            return ({
                value: reg.id_material_mte,
                label: `${reg.des_material_mte}`,
                custom: [
                    {
                        prefixDefault: reg.des_reduz_unidade_und ?? '',
                        label: 'Quantidade',
                        column: 'qtd_material_rsm',
                        value: reg.qtd_material_rsm,
                        type: 'number'
                    },
                    {
                        label: 'Valor Unitário',
                        column: 'vlr_material_rsm',
                        value: reg.vlr_material_rsm,
                        type: 'number',
                        mask: 'currency'
                    }
                ]
            });
        })
        newEdit.tipos_servico = newEdit.tipos_servico.map((reg) => {
            return ({
                value: reg.id_servico_tipo_stp,
                label: `${reg.des_servico_tipo_stp}`,
                custom: [
                    {
                        label: 'Valor Unitário',
                        column: 'vlr_tipo_servico_rst',
                        value: reg.vlr_tipo_servico_rst,
                        type: 'number',
                        mask: 'currency'
                    }
                ]
            });
        })
        setServiceEdited(newEdit)
        setModalIsOpen(true);
    }

    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setServiceEdited({});
                    setModalIsOpen(true)
                }}
                adicionar='Novo Serviço'
                exportar='Exportar'
                exportFilename='export_servico'
                dataset={services.map(reg => ({ 'ID': reg.id_servico_ser, 'Observação': reg.txt_servico_ser, 'Data Criação': formatDate(reg.created_at) }))}
            />
            <ServiceTable data={services} handleEdit={handleEdit} />
            {modalIsOpen && <ServiceForm service={serviceEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} />}
        </Content>
    )
}