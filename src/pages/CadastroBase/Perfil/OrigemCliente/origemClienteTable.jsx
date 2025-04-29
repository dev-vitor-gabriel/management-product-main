import React from "react";

import Table from "../../../../components/Table";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';
import { deleteOrigemCliente } from "../../../../services/origemCliente";


export default function OrigemClienteTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteOrigemCliente(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_origem_cliente_orc }) => (
        <div>
          <Button onClick={() => handleEdit(id_origem_cliente_orc)}>Editar</Button>
          <Button onClick={() => handleDelete(id_origem_cliente_orc)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_origem_cliente_orc }) => `${id_origem_cliente_orc}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ desc_origem_cliente_orc }) => `${desc_origem_cliente_orc}`,
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