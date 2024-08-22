import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background-color: var(--primary-bg-color);
  min-width: 124px;
  margin: 10px 0px;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:disabled{
    opacity: 0.5;
    cursor: default;
  }
`;


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Estilize o componente usando styled-components e aplique a animação
export const Loading = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 3px solid #333;
  border-top: 3px solid #FFF; /* Cor vermelha para o topo do círculo */
  border-radius: 50%;
  margin-bottom: 0%;
  animation: ${rotate} 2s linear infinite; /* Aplica a animação */
`;
