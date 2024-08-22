import React from "react";

import Table from "../../../components/Table";
import { formatDate } from "../../../utils/dateHelper";

import { deleteBaixa } from "../../../services/baixa";
import { confirmAlert } from "../../../utils/alert";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function BaixaTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteBaixa(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_movimentacao_mov }) => (
        <div>
          <Button onClick={() => handleEdit(id_movimentacao_mov)}>Editar</Button>
          <Button onClick={() => handleDelete(id_movimentacao_mov)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_movimentacao_mov }) => `${id_movimentacao_mov}`,
      sortable: true,
    },
    {
      name: "Observação",
      selector: ({ txt_movimentacao_mov }) => `${txt_movimentacao_mov}`,
      sortable: true,
    },
    {
      name: "Estoque",
      selector: ({ des_estoque_entrada_est, des_estoque_saida_est }) => `${des_estoque_entrada_est ? des_estoque_entrada_est : des_estoque_saida_est}`,
      sortable: true,
    },
    {
      name: "Materiais",
      selector: ({ materiais }) => `${materiais.map(({des_material_mte, qtd_material_mit, vlr_material_mte}) => (`${qtd_material_mit}x R$ ${parseFloat(vlr_material_mte).toFixed(2)} - ${des_material_mte}`)).join(`
      `)}`,
      sortable: true,
    },
    {
      name: "Valor",
      sortable: true,
      cell: (row) => `R$ ${parseFloat(row.materiais.reduce((accumulator, currentValue) => accumulator + currentValue.vlr_material_mte, 0)/100).toFixed(2)}`
    },
    {
      name: "Data de Cadastro",
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