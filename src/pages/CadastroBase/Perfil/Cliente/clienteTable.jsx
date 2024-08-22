import React from "react";

import Table from "../../../../components/Table";
import { deleteCliente } from "../../../../services/cliente";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function ClienteTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteCliente(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_cliente_cli }) => (
        <div>
          <Button onClick={() => handleEdit(id_cliente_cli)}>Editar</Button>
          <Button onClick={() => handleDelete(id_cliente_cli)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_cliente_cli }) => `${id_cliente_cli}`,
      sortable: true,
    },
    {
      name: "Nome",
      selector: ({ des_cliente_cli }) => `${des_cliente_cli}`,
      sortable: true,
    },
    {
      name: "Telefone",
      selector: ({ telefone_cliente_cli }) => `${telefone_cliente_cli}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: ({ email_cliente_cli }) => `${email_cliente_cli}`,
      sortable: true,
    },
    {
      name: "Documento",
      selector: ({ documento_cliente_cli }) => `${documento_cliente_cli}`,
      sortable: true,
    },
    {
      name: "Endereço",
      selector: ({ endereco_cliente_cli }) => `${endereco_cliente_cli}`,
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