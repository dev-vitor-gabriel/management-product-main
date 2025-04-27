import React, { useEffect, useState } from 'react';
import EstoqueMaterialTable from './estoqueMaterialTable'; 
import Content from '../../../components/Content';
import PageHeader from '../../../components/PageHeader';
import { getEstoqueMaterial } from '../../../services/estoqueItem';

export default function EstoqueMaterialPage() {
  const [estoques, setEstoques] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  const fetchEstoques = async () => {
    try {
      const response = await getEstoqueMaterial(); 
      setEstoques(response.items);
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
          'ID do Estoque': estoque.id_estoque_item_eti,
          'Descrição': estoque.des_estoque_item_eti,
        }))}
      />
      <EstoqueMaterialTable data={estoques} />
    </Content>
  );
}
