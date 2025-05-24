import styled from "styled-components";

export const FormGroup = styled.div`
  margin: 4px 0px;
  display: grid; 
  grid-template-columns: 1fr 15%; 
  gap: 10px;

  & label {
    color: #666;
    font-size: 0.9rem;
  }
`;
export const SaveButton = styled.button`
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }

  &:active {
    background-color: #3e8e41;
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
`;
