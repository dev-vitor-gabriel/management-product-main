import React from "react";

import Table from "../../../../components/Table";
import { deleteCargo } from "../../../../services/cargo";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function CargoTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteCargo(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_cargo_tcg }) => (
        <div>
          <Button onClick={() => handleEdit(id_cargo_tcg)}>Editar</Button>
          <Button onClick={() => handleDelete(id_cargo_tcg)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_cargo_tcg }) => `${id_cargo_tcg}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ desc_cargo_tcg }) => `${desc_cargo_tcg}`,
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