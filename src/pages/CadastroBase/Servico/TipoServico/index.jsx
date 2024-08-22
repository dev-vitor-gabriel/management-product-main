import { useState } from "react";

import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { GetServiceTypeQuery } from "../../../../services/serviceType";
import { formatDate } from "../../../../utils/dateHelper";
import TipoServiceForm from "./tipoServiceForm";
import TipoServicoTable from "./tipoServicoTable";

export default function TipoServico() {

    // const [regs, setRegs] = useState([]);

    const [regEdited, setRegEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {data: regs, isLoading} = GetServiceTypeQuery();
    // const {data, isLoading} = useQuery({
    //     queryKey: ['getServiceType'],
    //     queryFn: getServiceType,
    //     staleTime: 1 * 5 * 1000
    // });
    
    if(isLoading){
        return "Loading";
    }

    console.log('data',regs, isLoading);

    // const {data, isLoading} = useQuery({
    //         queryKey: ['getServiceType'],
    //         queryFn: getServiceType
    //     });
    // const {data, isLoading} = GetServiceTypeQuery();
    // console.log(data);

    // if (isLoading) {
    //     return <p>Carregando...</p>;
    //   }



    const fetchRegs = async () => {
        try {
            // const response = await getServiceType();
            // const data = GetServiceTypeQuery();
            // setRegs(response);
            // setRegs(data);
            // setModalIsOpen(false)
            // console.log(data);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    // useEffect(() => {
    //     fetchRegs();
    // }, []);

    const handleEdit = (id_servico_tipo_stp) => {
        const edit = regs.filter((reg) => reg.id_servico_tipo_stp == id_servico_tipo_stp)[0];
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
                adicionar='Novo Tipo de Serviço'
                exportar='Exportar'
                exportFilename='export_tipo_servico'
                dataset={regs.map(reg => ({ 'ID': reg.id_servico_tipo_stp, 'Nome': reg.des_servico_tipo_stp, 'Valor': reg.vlr_servico_tipo_stp, 'Data Criação': formatDate(reg.created_at) }))}
            />
            <TipoServicoTable refresh={fetchRegs} data={regs} handleEdit={handleEdit} />
            {modalIsOpen && <TipoServiceForm reg={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchRegs} />}

        </Content>
    )
}