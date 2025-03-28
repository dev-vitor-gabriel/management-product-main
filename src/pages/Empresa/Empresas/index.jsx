import { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../../../contexts/pagination";
import Content from "../../../components/Content";
import PageHeader from "../../../components/PageHeader";
import { formatDate } from "../../../utils/dateHelper";
import EmpresaForm from "./empresaForm";
import EmpresaTable from "./empresaTable";
import { getCompanies } from "../../../services/empresa";

export default function Company({ reg = null, tela }) {

    const [company, setCompanies] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [saleEditing, setSaleEditing] = useState(null);
    const [shouldReload, setShouldReload] = useState(false);
    const [filter, setFilter] = useState();

    const { title, breadItens } = useContext(PaginationContext);

    const [companyEdited, setSaleEdited] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    
    const fetchCompanies = async (filter, pageNumber, totalSize) => {
        try {
            const response = await getCompanies(filter, pageNumber, totalSize);
            setCompanies(response.items);
            setTotalRows(response.total);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };

    useEffect(() => {
        if (shouldReload) {
            fetchCompanies();
            setShouldReload(false); 
        }
    }, [shouldReload]);

    const handleEdit = (sale) => {
        setModalIsOpen(true);
        setSaleEditing(sale);
    }


    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setSaleEdited(null);
                    setSaleEditing(null);
                    setModalIsOpen(true)
                }}
                adicionar='Cadastrar Empresa'
                exportar='Exportar'
                exportFilename='export_venda'
            />
            <EmpresaTable 
                totalRows={totalRows} 
                data={company} 
                handleEdit={handleEdit} 
                refresh={fetchCompanies} 
                tela={tela}
                filter={filter}
                setFilter={setFilter}
            />
            {modalIsOpen && <EmpresaForm saleEditing={saleEditing} onClose={() => { setModalIsOpen(false); setSaleEditing({}) ;setShouldReload(true); }} visible={modalIsOpen} />}
        </Content>
    )
}