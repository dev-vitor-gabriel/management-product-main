import React from "react";

import Table from "../../../../components/Table";
import { deleteUsuario } from "../../../../services/usuario";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function UsuarioTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteUsuario(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id }) => (
        <div>
          <Button onClick={() => handleEdit(id)}>Editar</Button>
          <Button onClick={() => handleDelete(id)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id }) => `${id}`,
      sortable: true,
    },
    {
      name: "Imagem",
      selector: ({ url_img_user }) => `${url_img_user}`,
      sortable: true, 
    },
    {
      name: "Nome",
      selector: ({ name }) => `${name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: ({ email }) => `${email}`,
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