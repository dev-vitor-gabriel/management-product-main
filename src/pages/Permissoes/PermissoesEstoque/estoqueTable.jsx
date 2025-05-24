import React from "react";

import TableV2 from "../../../components/TableV2";
import { deleteEstoque } from "../../../services/estoque";
import { confirmAlert } from "../../../utils/alert";
import { formatDate } from "../../../utils/dateHelper";


export default function EstoqueTable({ data = [], handleEdit, refresh, granted = [], totalRows, onCheckboxChange }) {



  const columns = [
    {
      name: 'Permissão',
      cell: ({ id_estoque_est }) => (
        <div>
          <input
            type="checkbox"
            checked={granted.includes(id_estoque_est)}
            onChange={() => onCheckboxChange(id_estoque_est)} 
            />
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
      name: "Centro de Custo",
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
    <TableV2
      columns={columns}
      totalRows={totalRows}
      data={data}
      fetchData={refresh}
    />
  )
}