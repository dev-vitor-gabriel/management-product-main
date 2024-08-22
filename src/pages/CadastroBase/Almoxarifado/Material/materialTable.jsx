import React from "react";

import Table from "../../../../components/Table";
import { deleteServiceType } from "../../../../services/serviceType";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function UnidadeTable({ data = [], handleEdit }) {

  const handleDelete = async (id) => {
    await deleteServiceType(id);
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
      selector: ({ des_unidade }) => `${des_unidade}`,
      sortable: true,
    },
    {
      name: "Valor",
      selector: ({ vlr_material_mte }) => `${vlr_material_mte}`,
      sortable: true,
      cell: (row) => `R$ ${parseFloat(row.vlr_material_mte).toFixed(2)}`
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