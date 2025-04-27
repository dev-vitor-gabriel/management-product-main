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
      name: "Centro de Custo",
      selector: ({ des_centro_custo_cco }) => `${des_centro_custo_cco}`,
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
        </Modal>
      )}
    </>
  );
}
