import React from "react";

import { Button } from './style';


import Table from "../../../components/Table";
import { confirmAlert } from "../../../utils/alert";
import { formatDate } from "../../../utils/dateHelper";
import { StatusVenda } from "../../../services/status";
import { cancelarSale, finalizarSale } from "../../../services/sale";

export default function SaleTable({ data = [], handleEdit, refresh, tela = ''}) {
  
  const handleFinalizar = async (sale) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "A venda será finalizada!",
      handleFunction: async () => {await finalizarSale(sale.id_venda_vda); await refresh()}
    })
  }

  const handleCancelar = async (sale) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "A venda será cancelada!",
      handleFunction: async () => {await cancelarSale(sale.id_venda_vda); await refresh()}
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: (sale) => (
        <div>
          {(sale.status_sts == StatusVenda.Aberta || sale.status_sts == StatusVenda.Negociando) && <>
            <Button onClick={() => handleEdit(sale)}>Editar</Button>
          </>}
          {(sale.status_sts == StatusVenda.Aberta || sale.status_sts == StatusVenda.Negociando) && <>
            <Button onClick={() => handleFinalizar(sale)}>Finalizar</Button>
          </>}
          {sale.status_sts == StatusVenda.Finalizada && <>
            <Button onClick={() => handleCancelar(sale)}>Cancelar</Button>
          </>}
        </div>
      ),
    },
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
      name: "Status",
      selector: ({ des_status_sts }) => `${des_status_sts}`,
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