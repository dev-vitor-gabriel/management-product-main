import React from "react";

import { Button } from './style';
import { toast } from "react-toastify";

import Table from "../../../components/Table";
import { confirmAlert } from "../../../utils/alert";
import { formatDate } from "../../../utils/dateHelper";
import { StatusVenda } from "../../../services/status";
import { cancelarSale, finalizarSale } from "../../../services/sale";
import TableV2 from "../../../components/TableV2";

export default function SaleTable({ data = [], handleEdit, refresh, totalRows }) {

  const handleFinalizar = async (sale) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "A venda será finalizada!",
      handleFunction: async () => {await finalizarVenda(sale.id_venda_vda)}
    })
  }

  const handleCancelar = async (sale) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "A venda será cancelada!",
      handleFunction: async () => {await cancelarVenda(sale.id_venda_vda)}
    })
  }

  async function cancelarVenda(id_venda_vda) {
    try {
      await cancelarSale(id_venda_vda); 
      await refresh()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function finalizarVenda(id_venda_vda) {
    try {
      await finalizarSale(id_venda_vda); 
      await refresh()
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
      name: "ID",
      selector: ({ id_venda_vda }) => `${id_venda_vda}`,
      sortable: true,
    },
    {
      name: "Funcionário",
      selector: ({ desc_funcionario_tfu }) => `${desc_funcionario_tfu}`,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: ({ des_cliente_cli }) => `${des_cliente_cli}`,
      cell: ({ des_cliente_cli }) => des_cliente_cli || '',
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
      name: "Observação",
      selector: ({ desc_venda_vda }) => `${desc_venda_vda ?? '-'}`,
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