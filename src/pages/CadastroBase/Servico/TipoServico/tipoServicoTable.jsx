import React from "react";

import Table from "../../../../components/Table";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';
import { deleteServiceType } from "../../../../services/serviceType";
import { confirmAlert } from "../../../../utils/alert";

export default function TipoServiceTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteServiceType(id); await refresh();}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_servico_tipo_stp }) => (
        <div>
          <Button onClick={() => handleEdit(id_servico_tipo_stp)}>Editar</Button>
          <Button onClick={() => handleDelete(id_servico_tipo_stp)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_servico_tipo_stp }) => `${id_servico_tipo_stp}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ des_servico_tipo_stp }) => `${des_servico_tipo_stp}`,
      sortable: true,
    },
    {
      name: "Valor",
      selector: ({ vlr_servico_tipo_stp }) => `${vlr_servico_tipo_stp}`,
      sortable: true,
      cell: (row) => (`R$ ${parseFloat(row.vlr_servico_tipo_stp).toFixed(2)}`)
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