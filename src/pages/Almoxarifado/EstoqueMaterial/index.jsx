import React, { useEffect, useState } from 'react';
import EstoqueMaterialTable from './estoqueMaterialTable'; // Ajuste o caminho conforme necessário
import Content from '../../../components/Content';
import PageHeader from '../../../components/PageHeader';
import { getEstoqueMaterial } from '../../../services/estoqueMaterial'; // Substitua pelo caminho correto do serviço

export default function EstoqueMaterialPage() {
  const [estoques, setEstoques] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  // Chamada da API - Lista todos os estoques
  const fetchEstoques = async () => {
    try {
      const response = await getEstoqueMaterial(); // Ajuste conforme necessário
      setEstoques(response);
    } catch (error) {
      console.error("Erro ao buscar dados dos estoques:", error);
    }
  };

  useEffect(() => {
    fetchEstoques();
    if (shouldReload) {
      fetchEstoques();
      setShouldReload(false);
    }
  }, [shouldReload]);

  return (
    <Content>
      <PageHeader
        exportar='Exportar'
        exportFilename='export_estoque'
        dataset={estoques.map(estoque => ({
          'ID do Estoque': estoque.estoque_id,
          'Descrição': estoque.estoque_descricao,
          // Outras propriedades podem ser adicionadas conforme necessário
        }))}
      />
      <EstoqueMaterialTable data={estoques} />
    </Content>
  );
}
