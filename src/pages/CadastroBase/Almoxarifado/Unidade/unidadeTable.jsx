import React from "react";

import Table from "../../../../components/Table";
import { deleteUnidade } from "../../../../services/unidade";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function UnidadeTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteUnidade(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_unidade_und }) => (
        <div>
          <Button onClick={() => handleEdit(id_unidade_und)}>Editar</Button>
          <Button onClick={() => handleDelete(id_unidade_und)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_unidade_und }) => `${id_unidade_und}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ des_unidade_und }) => `${des_unidade_und}`,
      sortable: true,
    },
    {
      name: "Descrição Reduzida",
      selector: ({ des_reduz_unidade_und }) => `${des_reduz_unidade_und}`,
      sortable: true,
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