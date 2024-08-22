import styled from "styled-components";

export const Container = styled.div`
    padding: 0px 30px;
`;

export const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: auto;
`;
export const ModalScroll = styled.div`
  overflow-y: auto !important;
  overflow-x: hidden;
  max-height: 85dvh;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
      border: none;
      background-color: transparent;
      font-weight: bold;
      padding: 5px;
      border-radius: 3px;
      color: #333;
    }
    button:hover{
      transition: all 0.2s ease-in-out;
      transform: scale(140%);
    }

`

export const MaterialForm = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 0;
`;

export const ModalBotao = styled.div`
    display: flex;
    justify-content: end;
    gap: 10px;
`

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

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
  margin: 10px;
  color: var(--gray-dark);
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const DeviderHorizontal = styled.div`
    height: 1px;
    width: 100%;
    margin: 12px 0;
    background-color: var(--border-color);
`

// Tabela
// Defina um componente de estilo para a tabela
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
  width: 25%;
`;


