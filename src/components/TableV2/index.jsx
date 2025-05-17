import React, { useEffect, useState } from "react";

import { PiBracketsSquareLight } from "react-icons/pi";
import { FilterTable, StyledTable } from './style';

import DataTable from "react-data-table-component";

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};
// eslint-disable-next-line react/prop-types
export default function TableV2({ columns, fetchData, totalRows, data = [], filter, setFilter }) {
  if (!setFilter) {
    [filter, setFilter] = useState('');
  }
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [debouncedFilter, setDebouncedFilter] = useState(filter); 

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(debouncedFilter);
    }, 500);

    return () => clearTimeout(handler); 
  }, [debouncedFilter]); 


  useEffect(() => {
    fetchData(filter, page, perPage);
  }, [filter, page, perPage]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <FilterTable defaultValue={filter} onChange={({ target }) => setDebouncedFilter(target.value)} />
      </div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationPage={page}
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[5, 10, 20]}
        searchable
        paginationComponentOptions={paginationComponentOptions}
        paginationTotalRows={totalRows}
        noDataComponent={<><PiBracketsSquareLight size={32} style={{ marginRight: 16 }} /> Nenhum registro encontrado.</>}
        onChangePage={(pageNumber) => {
          setPage(pageNumber);
        }}
        onChangeRowsPerPage={(newPerPage) => {
          setPerPage(newPerPage);
        }}
      />
    </>
  );
}