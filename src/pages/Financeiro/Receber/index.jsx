import { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../../../contexts/pagination";
import Content from "../../../components/Content";
import PageHeader from "../../../components/PageHeader";
import { getFinanceiro } from "../../../services/financeiro";
import { formatDate } from "../../../utils/dateHelper";
import ReceberForm from "./receberForm";
import ReceberTable from "./receberTable";
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export default function FinanceiroReceber({ reg = null, tela }) {
    const [financeiro, setFinanceiro] = useState([]);
    const [shouldReload, setShouldReload] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [type, setType] = useState(window.location.pathname.includes('receber') ? 0 : 1);

    const { title, breadItens } = useContext(PaginationContext);

    const [financeiroEdited, setFinanceiroEdited] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const location = useLocation();

    const fetchFinanceiro = async (filter, pageNumber, perPage) => {
        try {
            const response = await getFinanceiro(type, pageNumber, perPage);
            setFinanceiro(response.items);
            setTotalRows(response.total);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };

    useEffect(() => {
        fetchFinanceiro();

        if (shouldReload) {
            fetchFinanceiro();
            setShouldReload(false);
        }
    }, [shouldReload, type]);

    useEffect(() => {
        setType(location.pathname.includes('receber') ? 0 : 1)
    }, [window.location.pathname]);

    useEffect(() => {
        if (reg != null) {
            setFinanceiroEdited(reg);
            setModalIsOpen(false);
        }
    }, []);

    const handleEdit = (id_financeiro_fin) => {
        // Busca o registro pelo ID
        const edit = regs.find(reg => reg.id_financeiro_fin === id_financeiro_fin);
        if (!edit) return;
      
        // Clona o registro para evitar mutações diretas
        const newEdit = { ...edit };
      
        // Adiciona o campo estruturado com 'custom', como você usa com materiais
        newEdit.custom = [
          {
            label: 'Descrição',
            column: 'desc_financeiro_fin',
            value: edit.desc_financeiro_fin,
            type: 'text'
          },
          {
            label: 'Valor',
            column: 'vlr_financeiro_fin',
            value: edit.vlr_financeiro_fin,
            type: 'number',
            mask: 'currency'
          },
          {
            label: 'Centro de Custo',
            column: 'id_centro_custo_fin',
            value: edit.id_centro_custo_fin,
            type: 'select'
          },
          {
            label: 'Tipo Transação',
            column: 'tipo_transacao_fin',
            value: edit.tipo_transacao_fin,
            type: 'select'
          }
        ];

        setRegEdited(newEdit);
        setModalIsOpen(true);
    };

    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setFinanceiroEdited({});
                    setModalIsOpen(true)
                }}
                adicionar='Novo registro'
                exportar='Exportar'
                exportFilename='export_a_pagar'
                dataset={financeiro.map(reg => ({ 'ID': reg.id_financeiro_fin, 'Valor': `R$ ${(parseFloat(reg.vlr_financeiro_fin) / 100).toFixed(2).replace('.', ',')}`,'Origem': reg.tipo_referencia_text, 'Observação': reg.desc_financeiro_fin,'Tipo de Transação': reg.tipo_transacao_text,'Centro de Custo': reg.des_centro_custo_cco, 'Método de Pagamento': reg.desc_metodo_pagamento_tmp, 'Data Criação': formatDate(reg.created_at) }))}
            />
            <ReceberTable 
                totalRows={totalRows} 
                data={financeiro} 
                handleEdit={handleEdit} 
                refresh={fetchFinanceiro} 
                tela={tela}
            />
            {modalIsOpen && <ReceberForm 
            reg={financeiroEdited} onClose={() => { setModalIsOpen(false); setShouldReload(true); }} 
            tipoTransacao ={type}
            visible={modalIsOpen} />}
        </Content>
    )
}