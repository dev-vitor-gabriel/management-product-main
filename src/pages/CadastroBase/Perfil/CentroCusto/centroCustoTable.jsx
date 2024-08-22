import React from "react";

import Table from "../../../../components/Table";
import { deleteCentroCusto } from "../../../../services/centroCusto";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function CentroCustoTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteCentroCusto(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_centro_custo_cco }) => (
        <div>
          <Button onClick={() => handleEdit(id_centro_custo_cco)}>Editar</Button>
          <Button onClick={() => handleDelete(id_centro_custo_cco)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_centro_custo_cco }) => `${id_centro_custo_cco}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ des_centro_custo_cco }) => `${des_centro_custo_cco}`,
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