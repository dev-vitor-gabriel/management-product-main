import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--primary-bg-color);
  margin: 10px;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const ButtonClose = styled.button`
  background-color: var(--home-color);
  margin-top: 10px;
  color: var(--gray-dark);
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const ButtonArea = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddButton = styled.button`
  background-color: var(--primary-bg-color); /* Ajuste a cor de fundo conforme necessário */
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3; /* Ajuste a cor de fundo ao passar o mouse */
  }
`;

export const ExportButton = styled.button`
  background-color: var(--teal); /* Ajuste a cor de fundo conforme necessário */
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3; /* Ajuste a cor de fundo ao passar o mouse */
  }
`;