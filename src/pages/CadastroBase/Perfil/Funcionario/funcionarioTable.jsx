import React from "react";

import Table from "../../../../components/Table";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';
import { deleteFuncionario } from "../../../../services/funcionario";


export default function FuncionarioTable({ data = [], handleEdit, refresh }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteFuncionario(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_funcionario_tfu }) => (
        <div>
          <Button onClick={() => handleEdit(id_funcionario_tfu)}>Editar</Button>
          <Button onClick={() => handleDelete(id_funcionario_tfu)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_funcionario_tfu }) => `${id_funcionario_tfu}`,
      sortable: true,
    },
    {
      name: "Cargo",
      selector: ({ desc_cargo_tcg }) => `${desc_cargo_tcg}`,
      sortable: true,
    },
    {
      name: "Nome Funcionário",
      selector: ({ desc_funcionario_tfu }) => `${desc_funcionario_tfu}`,
      sortable: true,
    },
    {
      name: "Telefone",
      selector: ({ telefone_funcionario_tfu }) => `${telefone_funcionario_tfu}`,
      sortable: true,
    },
    {
      name: "Documento",
      selector: ({ documento_funcionario_tfu }) => `${documento_funcionario_tfu}`,
      sortable: true,
    },
    {
      name: "Endereço",
      selector: ({ endereco_funcionario_tfu }) => `${endereco_funcionario_tfu}`,
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