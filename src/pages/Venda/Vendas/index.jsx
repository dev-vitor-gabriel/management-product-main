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
    const [totalRows, setTotalRows] = useState(0);
    const [saleEditing, setSaleEditing] = useState(null);
    const [shouldReload, setShouldReload] = useState(false);

    const { title, breadItens } = useContext(PaginationContext);

    const [saleEdited, setSaleEdited] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    
    const fetchSales = async (filter, pageNumber, totalSize) => {
        try {
            const response = await getSales(filter, pageNumber, totalSize);

            setSales(response.items);
            setTotalRows(response.total);
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

    const handleEdit = (sale) => {
        setModalIsOpen(true);
        setSaleEditing(sale);
    }

    function getSalesDataSet() {
        
        return sales.map(reg => ({ 'ID': reg.id_venda_ser, 'Funcionário': reg.desc_funcionario_tfu, 'Data Criação': formatDate(reg.created_at) }))
    }

    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setSaleEdited(null);
                    setSaleEditing(null);
                    setModalIsOpen(true)
                }}
                adicionar='Nova Venda'
                exportar='Exportar'
                exportFilename='export_venda'
                dataset={getSalesDataSet()}
            />
            <SaleTable totalRows={totalRows} data={sales} handleEdit={handleEdit} refresh={fetchSales} tela={tela}/>
            {modalIsOpen && <SaleForm saleEditing={saleEditing} onClose={() => { setModalIsOpen(false); setSaleEditing({}) ;setShouldReload(true); }} visible={modalIsOpen} />}
        </Content>
    )
}