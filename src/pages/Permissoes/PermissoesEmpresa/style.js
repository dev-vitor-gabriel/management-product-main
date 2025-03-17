import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f5f5f5;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-block: 10px;
`

export const Button = styled.div`
    padding-block: 7.5px;
    padding-inline: 30px;
    background-color:rgb(15, 149, 0);
    font-size: large;
    font-weight: 700;
    color: white;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
`

export const SidebarContainer = styled.div`
    display: flex;
    height: 100vh;
    background: #f5f5f5;
`

export const Sidebar = styled.div`
    width: 30%;
    background: white;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
`;

export const Content = styled.div`
    flex: 1;
    background: white;
    padding: 20px;
    margin-left: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
`;

export const CompanyItem = styled.div`
    padding: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    background: ${(props) => (props.active ? "#007bff" : "#e0e0e0")};
    color: ${(props) => (props.active ? "white" : "black")};
    border-radius: 5px;
    &:hover {
        background: ${(props) => (props.active ? "#0056b3" : "#c0c0c0")};
    }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
`;