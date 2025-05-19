import React from "react";

import { Button } from './style';

import Table from "../../../components/Table";
import { formatDate } from "../../../utils/dateHelper";
import { deleteService, finalizarService } from "../../../services/service";
import { confirmAlert } from "../../../utils/alert";

// eslint-disable-next-line react/prop-types
export default function PagarTable({ data = [], handleEdit, refresh, tela = ''}) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteService(id); await refresh()}
    })
  }

  const columns = [
    {
      name: "ID",
      selector: ({ id_financeiro_fin }) => `${id_financeiro_fin}`,
      sortable: true,
    },
    {
      name: "Valor",
      selector: ({ vlr_financeiro_fin }) => `${vlr_financeiro_fin}`,
      sortable: true,
      cell: (row) => `R$ ${(parseFloat(row.vlr_financeiro_fin) / 100).toFixed(2).replace('.', ',')}`
    },
    {
      name: "Origem",
      selector: ({ tipo_referencia_text }) => `${tipo_referencia_text}`,
      sortable: true,
    },
    {
      name: "Observação",
      selector: ({ desc_financeiro_fin }) => `${desc_financeiro_fin}`,
      sortable: true,
    },
    {
      name: "Tipo de Transação",
      selector: ({ tipo_transacao_text }) => `${tipo_transacao_text}`,
      sortable: true,
    },
    {
      name: "Centro de Custo",
      selector: ({ des_centro_custo_cco }) => `${des_centro_custo_cco}`,
      sortable: true,
    },
    {
      name: "Método de Pagamento",
      selector: ({ desc_metodo_pagamento_tmp }) => `${desc_metodo_pagamento_tmp}`,
      sortable: true,
    },
    {
      name: "Data",
      selector: ({ created_at }) => `${created_at}`,
      sortable: true,
      format: ({ created_at }) => formatDate(created_at),
    },
  ];
  return (
    <Table
      columns={columns}
      data={data}
    />
  )
}