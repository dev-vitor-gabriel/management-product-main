import React, { useState } from "react";
import Table from "../../../components/Table";
import { formatDate } from "../../../utils/dateHelper";
import { deleteBaixa } from "../../../services/baixa";
import { confirmAlert } from "../../../utils/alert";
import { Button } from './style';
import Modal from '../../../components/Modal'; // Ajuste o caminho conforme necessário

export default function BaixaTable({ data = [], handleEdit, refresh }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {
        await deleteBaixa(id);
        await refresh();
      }
    });
  };

  const showMaterials = (row) => {
    setSelectedRow(row);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRow(null);
  };

  const columns = [
    // Exemplo de coluna de ações, descomente se necessário
    // {
    //   name: 'Ações',
    //   cell: ({ id_movimentacao_mov }) => (
    //     <div>
    //       <Button onClick={() => handleEdit(id_movimentacao_mov)}>Editar</Button>
    //       <Button onClick={() => handleDelete(id_movimentacao_mov)}>Excluir</Button>
    //     </div>
    //   ),
    // },
    {
      name: "ID",
      selector: ({ id_movimentacao_mov }) => `${id_movimentacao_mov}`,
      sortable: true,
    },
    {
      name: "Observação",
      selector: ({ txt_movimentacao_mov }) => `${txt_movimentacao_mov ?? '-'}`,
      sortable: true,
    },
    {
      name: "Estoque",
      selector: ({ des_estoque_entrada, des_estoque_saida }) => `${des_estoque_entrada ? des_estoque_entrada : des_estoque_saida}`,
      sortable: true,
    },
    {
      name: "Materiais",
      cell: (row) => (
        <Button onClick={() => showMaterials(row)}>
          Ver Materiais
        </Button>
      ),
    },
    {
      name: "Valor Total",
      sortable: true,
      cell: (row) => {
        if (Array.isArray(row.materiais) && row.materiais.length > 0) {
          const total = row.materiais.reduce((accumulator, currentValue) => {
            const valorUnitario = typeof currentValue.vlr_material_mit === 'number' ? currentValue.vlr_material_mit : 0;
            const quantidade = typeof currentValue.qtd_material_mit === 'number' ? currentValue.qtd_material_mit : 0;
            return accumulator + (valorUnitario * quantidade);
          }, 0);
          return `R$ ${(total / 100).toFixed(2)}`;
        }
        return `R$ 0.00`;
      },
    },
    {
      name: "Data de Cadastro",
      selector: ({ created_at }) => `${created_at}`,
      sortable: true,
      format: ({ created_at }) => formatDate(created_at),
    },
  ];

  return (
    <>
      <Table columns={columns} data={data} />
      {selectedRow && (
        <Modal
          title="Materiais"
          visible={modalVisible}
          onClose={closeModal}
        >
          <div>
            {selectedRow.materiais.map(({ des_material_mte, qtd_material_mit, vlr_material_mit }, index) => (
              <div key={index}>
                {`${qtd_material_mit}x R$ ${parseFloat(vlr_material_mit / 100).toFixed(2)} - ${des_material_mte}`}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
