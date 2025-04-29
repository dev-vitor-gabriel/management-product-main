import React from "react";

import Table from "../../../../components/Table";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';

// eslint-disable-next-line react/prop-types
export default function OrigemClienteTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => { }
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_origem_cliente }) => (
        <div>
          <Button onClick={() => handleEdit(id_origem_cliente)}>Editar</Button>
          <Button onClick={() => handleDelete(id_origem_cliente)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_origem_cliente }) => `${id_origem_cliente}`,
      sortable: true,
    },
    {
      name: "Nome",
      selector: ({ nome_origem_cliente }) => `${nome_origem_cliente}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ descricao_origem_cliente }) => `${descricao_origem_cliente}`,
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