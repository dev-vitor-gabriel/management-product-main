import React from "react";

import Table from "../../../../components/Table";
import { deleteMetodoPagamento } from "../../../../services/metodoPagamento";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function MetodoPagamentoTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteMetodoPagamento(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_metodo_pagamento_tmp }) => (
        <div>
          <Button onClick={() => handleEdit(id_metodo_pagamento_tmp)}>Editar</Button>
          <Button onClick={() => handleDelete(id_metodo_pagamento_tmp)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_metodo_pagamento_tmp }) => `${id_metodo_pagamento_tmp}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ desc_metodo_pagamento_tmp }) => `${desc_metodo_pagamento_tmp}`,
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