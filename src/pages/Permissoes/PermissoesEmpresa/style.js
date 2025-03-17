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

export const Button = styled.div`
    padding-block: 7.5px;
    padding-inline: 15px;
    width: 145px;
    background-color:rgb(15, 149, 0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
`

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
    margin-bottom: 5px;
    cursor: pointer;
    background: ${(props) => (props.active ? "var(--primary-bg-color)" : "transparent")};
    color: ${(props) => (props.active ? "white" : "black")};
    border-radius: 5px;
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