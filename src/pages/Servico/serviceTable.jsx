import React from "react";

import { Button } from './style';

import Table from "../../components/Table";
import { formatDate } from "../../utils/dateHelper";
import { deleteService, finalizarService } from "../../services/service";
import { confirmAlert } from "../../utils/alert";

// eslint-disable-next-line react/prop-types
export default function ServiceTable({ data = [], handleEdit, refresh, tela = ''}) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteService(id); await refresh()}
    })
  }
  
  const handleFinalizar = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O serviço será finalizado!",
      handleFunction: async () => {await finalizarService(id); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_servico_ser, id_situacao_ser }) => (
        <div>
          {id_situacao_ser == 1 && (
          <>
            <Button onClick={() => handleEdit(id_servico_ser)}>Editar</Button>
            <Button onClick={() => handleDelete(id_servico_ser)}>Excluir</Button>
            { tela == 'finalizar' && 
              <Button
              finalizar
              onClick={() => handleFinalizar(id_servico_ser)}
              >Finalizar</Button>
            }
          </>
          )}
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_servico_ser }) => `${id_servico_ser}`,
      sortable: true,
    },
    {
      name: "Observação",
      selector: ({ txt_servico_ser }) => `${txt_servico_ser}`,
      sortable: true,
    },
    {
      name: "Valor",
      selector: ({ vlr_servico_ser }) => `${vlr_servico_ser}`,
      sortable: true,
      cell: (row) => `R$ ${(parseFloat(row.vlr_servico_ser) / 100).toFixed(2).replace('.', ',')}`
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