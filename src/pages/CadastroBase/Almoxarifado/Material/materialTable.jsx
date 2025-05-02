import React from "react";

import Table from "../../../../components/Table";
import { formatCurrency } from "../../../../utils/format";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';
import { deleteMaterial } from "../../../../services/material";
import { confirmAlert } from "../../../../utils/alert";


export default function UnidadeTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteMaterial(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_material_mte }) => (
        <div>
          <Button onClick={() => handleEdit(id_material_mte)}>Editar</Button>
          <Button onClick={() => handleDelete(id_material_mte)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_material_mte }) => `${id_material_mte}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ des_material_mte }) => `${des_material_mte}`,
      sortable: true,
    },
    {
      name: "Unidade",
      selector: ({ des_reduz_unidade_und }) => `${des_reduz_unidade_und}`,
      sortable: true,
    },
    {
      name: "Valor",
      selector: ({ vlr_material_mte }) => `${vlr_material_mte}`,
      sortable: true,
      cell: (row) => `R$ ${formatCurrency(row.vlr_material_mte)}`
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