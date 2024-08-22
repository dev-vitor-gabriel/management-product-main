import React from "react";

import Table from "../../../../components/Table";
import { deleteServiceType } from "../../../../services/serviceType";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function EstoqueTable({ data = [], handleEdit }) {

  const handleDelete = async (id) => {
    await deleteServiceType(id);
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_estoque_est }) => (
        <div>
          <Button onClick={() => handleEdit(id_estoque_est)}>Editar</Button>
          <Button onClick={() => handleDelete(id_estoque_est)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_estoque_est }) => `${id_estoque_est}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ des_estoque_est }) => `${des_estoque_est}`,
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