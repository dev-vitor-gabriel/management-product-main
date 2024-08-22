import styled, { keyframes } from "styled-components";




const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


export const CenterFullScreen = styled.div`
  display: flex;
  flex:1;
  height: 100dvh;
  justify-content: center;
  align-items: center;
`;
// Estilize o componente usando styled-components e aplique a animação
export const Loading = styled.div`
  width: 15dvw;
  height: 15dvw;
  border: 3px solid var(--primary-bg-border);
  border-top: 3px solid transparent; /* Cor vermelha para o topo do círculo */
  border-bottom: 3px solid transparent;
  border-radius: 50%;
  margin-bottom: 0%;
  animation: ${rotate} 1.0s linear infinite; /* Aplica a animação */
`;

export const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100dvw;
  height: var(--header-height);
  border-bottom: 1px solid var(--primary-bg-border);

  @media (max-width: 600px) {
    /* Estilos específicos para telas menores (modo mobile) */
    flex-direction: column;
    align-items: stretch;
    height: auto !important;
    gap: 16px;
    padding-bottom: 16px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
  height: 100px;
  width: 100dvw;
  position: fixed;
  bottom: 0;
  animation: ${slideIn} 0.5s ease-out;
  @media (max-width: 600px) {
    height: 80px;
  }
`;


export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.img`
  max-height: calc(var(--header-height) - 20px);
`;
export const H1 = styled.h1`
  font-size: 1.6rem;
`;
export const Parag = styled.p`
`;



export const Button = styled.button`
  background-color: var(--yellow);
  color: var(--gray-dark);
  font-weight: 600;
  min-width: 124px;
  margin: 10px 0px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  opacity: 0.9;

  box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
  &:disabled{
    opacity: 0.5;
    cursor: default;
  }
  &:hover{
    opacity: 1;
  }
`;

export const ButtonNext = styled.button`
  background-color: var(--yellow);
  color: var(--gray-dark);
  font-weight: 600;
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  &:disabled{
    opacity: 0.5;
    cursor: default;
  }
  &:hover{
    opacity: 1;
  }
`;


export const SocialMediaBlock = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
  align-items: center;
  & img{
    max-width: 32px;
    opacity: 0.95;
  }
  & img:hover{
    opacity: 1;
    transform: scale(1.05);
  }
  @media (max-width: 600px) {
    /* Estilos específicos para telas menores (modo mobile) */
    
  width: 50%;
    justify-content: space-around;
  }
`;



export const Content = styled.div`
  margin-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 200px;
  min-height: calc(100dvh - var(--header-height));
  gap: 8px;
`;


export const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: ${(props) => (props.selected ? `2px solid var(--yellow)` : `0`)};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  gap: 2px;
`;

export const HeaderCard = styled.div`
  background-color: #FEFEFE;
  display: flex;
  flex-direction: row;
  gap:8px;
  height: 150px;
`;
export const ContentHeaderCard = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
export const TitleHeaderCard = styled.h1`
  text-align: center;
  width: 100%;
`;
export const TextHeaderCard = styled.span`
  flex: 1;
  overflow: hidden;
`;
export const ImageHeaderCard = styled.div`
  width: 100px;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url('${props.imageUrl}')`};
`;
export const FooterCard = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  height: 50px;
  gap: 2px;
`;
export const ItemFooterCard = styled.div`
  text-align: center;
  background-color: #FEFEFE;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const TimeItemFooterCard = styled.div`
  padding: 8px;
  padding-top: 10px;
  text-align: center;
`;
export const ValueItemFooterCard = styled.div`
  padding: 8px;
  padding-top: 10px;
  text-align: center;
`;
export const ButtonItemFooterCard = styled.button`
  
  width: 100%;
  height: 100%;
  font-size: 2rem;
  background-color: #FEFEFE;
  color: var(--gray);
  font-weight: 500;
  border: none;
  cursor: pointer;
  &:hover{
    background-color: var(--yellow);
    color: var(--gray-dark);
  }
`;
