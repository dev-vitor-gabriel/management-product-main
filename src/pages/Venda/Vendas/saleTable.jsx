import React from "react";

import { Button } from './style';


import Table from "../../../components/Table";
import { confirmAlert } from "../../../utils/alert";
import { formatDate } from "../../../utils/dateHelper";
// eslint-disable-next-line react/prop-types
export default function SaleTable({ data = [], handleEdit, refresh, tela = ''}) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      // handleFunction: async () => {await deleteSale(id); await refresh()}
    })
  }
  
  const handleFinalizar = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "A venda será finalizada!",
      // handleFunction: async () => {await finalizarSale(id); await refresh()}
    })
  }

  const columns = [
    // {
    //   name: 'Ações',
    //   cell: ({ id_venda_vda, desc_funcionario_tfu }) => (
    //     <div>
    //       {id_venda_vda == 1 && (
    //       <>
    //         <Button onClick={() => handleEdit(id_venda_vda)}>Editar</Button>
    //         <Button onClick={() => handleDelete(id_venda_vda)}>Excluir</Button>
    //         { tela == 'finalizar' && 
    //           <Button
    //           finalizar
    //           onClick={() => handleFinalizar(id_venda_vda)}
    //           >Finalizar</Button>
    //         }
    //       </>
    //       )}
    //     </div>
    //   ),
    // },
    {
      name: "Identificador",
      selector: ({ id_venda_vda }) => `${id_venda_vda}`,
      sortable: true,
    },
    {
      name: "Funcionário",
      selector: ({ desc_funcionario_tfu }) => `${desc_funcionario_tfu}`,
      sortable: true,
    },
    {
      name: "Valor",
      sortable: true,
      cell: (row) => `R$ ${(row.total_vlr_material / 100).toFixed(2).replace('.', ',')}`
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