import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background: #f5f5f5;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-block: 10px;
`

export const Button = styled.button`
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

export const SidebarContainer = styled.div`
    display: flex;
    height: 100vh;
    padding: 20px;
    border-radius: 5px;
    background:rgb(255, 255, 255);
    border: 1px solid rgba(0, 0, 0, 0.2);
`

export const Sidebar = styled.div`
    width: 30%;
    overflow-y: auto;
`;

export const Content = styled.div`
    flex: 1;
    background: white;
    margin-left: 20px;
    overflow-y: auto;
`;

export const CompanyItem = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
    background: ${(props) => (props.active ? "var(--primary-bg-color)" : "transparent")};
    color: ${(props) => (props.active ? "white" : "black")};
    &:hover {
        background: ${(props) => (props.active ? "var(--primary-bg-color)" : "rgb(232, 232, 232)")};
    }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
`;

export const IconSeparator = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 40px;
`

export const ListContainer = styled.div`
    background-color: white;
    border-radius: 5px;
    border: 1px solid #B9B9B9;
    min-height: 80%;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  & label {
    color: #666;
    font-size: 0.9rem;
  }
`