// estoqueMaterialTable.jsx
import React, { useState } from 'react';
import Table from '../../../components/Table'; // Ajuste o caminho conforme necessário
import Modal from '../../../components/Modal'; // Ajuste o caminho conforme necessário
import { Button } from './style'; // Ajuste o caminho conforme necessário

export default function EstoqueMaterialTable({ data = [] }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEstoque, setSelectedEstoque] = useState(null);

  const showMaterials = (estoque) => {
    setSelectedEstoque(estoque);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEstoque(null);
  };

  const columns = [
    {
      name: "Ações",
      cell: (row) => (
        <Button onClick={() => showMaterials(row)}>
          Ver Materiais
        </Button>
      ),
    },
    {
      name: "ID do Estoque",
      selector: ({ estoque_id }) => `${estoque_id}`,
      sortable: true,
    },
    {
      name: "Descrição do Estoque",
      selector: ({ estoque_descricao }) => `${estoque_descricao}`,
      sortable: true,
    },
  ];

  return (
    <>
      <Table columns={columns} data={data} />
      {selectedEstoque && (
        <Modal
          title={`Materiais - ${selectedEstoque.estoque_descricao}`}
          visible={modalVisible}
          onClose={closeModal}
        >
          <div>
            {selectedEstoque.materiais.map(({ material_descricao, valor_unitario, quantidade_em_estoque, valor_total_em_estoque }, index) => (
              <div key={index}>
                <p><strong>Material:</strong> {material_descricao}</p>
                <p><strong>Valor Unitário:</strong> R$ {parseFloat(valor_unitario / 100).toFixed(2)}</p>
                <p><strong>Quantidade em Estoque:</strong> {quantidade_em_estoque}</p>
                <p><strong>Valor Total em Estoque:</strong> R$ {parseFloat(valor_total_em_estoque / 100).toFixed(2)}</p>
                <hr />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
