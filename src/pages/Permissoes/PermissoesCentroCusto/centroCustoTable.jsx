import React from "react";

import Table from "../../../components/Table";
import { deleteCentroCusto } from "../../../services/centroCusto";
import { confirmAlert } from "../../../utils/alert";
import { formatDate } from "../../../utils/dateHelper";


// eslint-disable-next-line react/prop-types
export default function CentroCustoTable({ data = [], handleEdit, refresh, granted = [], onCheckboxChange }) {
  const columns = [
    {
      name: 'Permissão',
      cell: ({ id_centro_custo_cco }) => (
        <div>
          <input
            type="checkbox"
            checked={granted.includes(id_centro_custo_cco)}
            onChange={() => onCheckboxChange(id_centro_custo_cco)} 
            />
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
      inputFilter={false}
    />
  )
}