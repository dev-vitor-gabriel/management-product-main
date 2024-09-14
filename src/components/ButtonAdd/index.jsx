import React from "react";
import { MdAdd, MdOutlineFileDownload } from 'react-icons/md';
import { ButtonArea, AddButton, ExportButton } from './style'; // Ajuste o caminho conforme necessário

const ButtonAdd = ({ adicionar, exportar, onClick, btnExport }) => {
  return (
    <ButtonArea>
      {adicionar && (
        <AddButton onClick={onClick}>
          <MdAdd size={18} color="#fff" />
          <span>{adicionar}</span>
        </AddButton>
      )}
      {exportar && (
        <ExportButton onClick={btnExport}>
          <MdOutlineFileDownload size={18} color="#fff" />
          <span>{exportar}</span>
        </ExportButton>
      )}
    </ButtonArea>
  );
};

export default ButtonAdd;
