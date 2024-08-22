import styled from "styled-components";


export const BoxInput = styled.div`
  display: flex;
  flex-direction: row;
  & span{
    position: relative;
    margin-top: 5px;
    left: 32px;
  }
`;
export const InputForm = styled.input`
  padding: 5px 8px;
  padding-left: ${props=> props?.alignright ?? false ? "36px" : "8px"};
  height: 32px;
  border: 1px solid ${props => props.error ? "#f00" : "#ccc"};
  border-radius: 4px;
  width: 100%;

  text-align: ${props=> props?.alignright ?? false ? "right" : "left"};
`;
export const InputError = styled.span`
  color: #a00;
  font-size: 0.8rem;
  margin-top: -8px;
  margin-left: 8px;
`;
