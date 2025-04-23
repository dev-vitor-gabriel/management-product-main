import styled from "styled-components";

export const Button = styled.button`
    background-color: ${(props) => (props.active ? "#9052F9" : "#f0f0f0")};
    color: ${(props) => (props.active ? "#fff" : "#000")};
    border: 1px solid ${(props) => (props.active ? "#9052F9" : "#ccc")};
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.active ? "#7a42d0" : "#e0e0e0")};
    }
`;
