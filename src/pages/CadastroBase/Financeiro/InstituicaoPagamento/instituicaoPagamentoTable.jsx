import React from "react";

import Table from "../../../../components/Table";
import { deleteInstituicaoPagamento } from "../../../../services/instituicaoPagamento";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


// eslint-disable-next-line react/prop-types
export default function InstituicaoPagamentoTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteInstituicaoPagamento(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_instituicao_pagamento_tip }) => (
        <div>
          <Button onClick={() => handleEdit(id_instituicao_pagamento_tip)}>Editar</Button>
          <Button onClick={() => handleDelete(id_instituicao_pagamento_tip)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_instituicao_pagamento_tip }) => `${id_instituicao_pagamento_tip}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ desc_instituicao_pagamento_tip }) => `${desc_instituicao_pagamento_tip}`,
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