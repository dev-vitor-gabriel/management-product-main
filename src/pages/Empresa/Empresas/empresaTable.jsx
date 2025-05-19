import React from "react";

import { Button } from './style';

import { formatDate } from "../../../utils/dateHelper";
import TableV2 from "../../../components/TableV2";

export default function  EmpresaTable({ data = [], handleEdit, refresh, totalRows, filter, setFilter }) {

  const columns = [
    {
      name: 'Ações',
      cell: (sale) => (
        <div>
            <Button onClick={() => handleEdit(sale)}>Editar</Button>
        </div>
      ),
    },
    {
      name: "Identificador",
      selector: ({ id_empresa_emp }) => `${id_empresa_emp}`,
      sortable: true,
    },
    {
      name: "Razão Social",
      selector: ({ razao_social_empresa_emp }) => `${razao_social_empresa_emp}`,
      sortable: true,
    },
    {
      name: "CNPJ",
      sortable: true, 
      selector: ({ cnpj_empresa_emp }) => `${cnpj_empresa_emp}`,
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
      data={data}
      totalRows={totalRows}
      fetchData={refresh}
      filter={filter}
      setFilter={setFilter}
    />
  )
}