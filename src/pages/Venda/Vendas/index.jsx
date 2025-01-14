import { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../../../contexts/pagination";
import Content from "../../../components/Content";
import PageHeader from "../../../components/PageHeader";
import { formatDate } from "../../../utils/dateHelper";
import SaleForm from "./saleForm";
import SaleTable from "./saleTable";
import { getSales } from "../../../services/sale";

export default function Sale({ reg = null, tela }) {
    const [sales, setSales] = useState([]);
    const [shouldReload, setShouldReload] = useState(false);

    const { title, breadItens } = useContext(PaginationContext);

    const [saleEdited, setSaleEdited] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    
    const fetchSales = async () => {
        try {
            const response = await getSales();
            setSales(response.data);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []); 

    useEffect(() => {
        if (shouldReload) {
            fetchSales();
            setShouldReload(false); 
        }
    }, [shouldReload]);

    useEffect(() => {
        if (reg != null) {
            setSaleEdited(reg);
            setModalIsOpen(false);
        }
    }, []);

    const handleEdit = (id_venda_ser) => {
        const edit = sales.filter((reg) => reg.id_venda_ser == id_venda_ser)[0];
        const newEdit = {...edit};
        newEdit.materiais = newEdit.materiais.map((reg) => {
            return ({
                value: reg.id_venda_vda,
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
        newEdit.tipos_venda = newEdit.tipos_venda.map((reg) => {
            return ({
                value: reg.id_venda_tipo_stp,
                label: `${reg.des_venda_tipo_stp}`,
                custom: [
                    {
                        label: 'Valor Unitário',
                        column: 'vlr_tipo_venda_rst',
                        value: reg.vlr_tipo_venda_rst,
                        type: 'number',
                        mask: 'currency'
                    }
                ]
            });
        })
        setSaleEdited(newEdit)
        setModalIsOpen(true);
    }

    function getSalesDataSet() {
        return sales.map(reg => ({ 'ID': reg.id_venda_ser, 'Funcionário': reg.desc_funcionario_tfu, 'Data Criação': formatDate(reg.created_at) }))
    }

    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setSaleEdited({});
                    setModalIsOpen(true)
                }}
                adicionar='Nova Venda'
                exportar='Exportar'
                exportFilename='export_venda'
                dataset={getSalesDataSet()}
            />
            <SaleTable data={sales} handleEdit={handleEdit} refresh={fetchSales} tela={tela}/>
            {modalIsOpen && <SaleForm sale={saleEdited} onClose={() => { setModalIsOpen(false); setShouldReload(true); }} visible={modalIsOpen} />}
        </Content>
    )
}