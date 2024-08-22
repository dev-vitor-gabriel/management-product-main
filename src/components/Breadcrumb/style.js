import styled from "styled-components";

export const BreadMenu = styled.div`

    ul {
        display: flex;
    }

    li + li::before {
        display: inline-block;
        color: #6e7e964d;
        content: "/";
        margin: 0px 8px;
    }

    li:last-child a {
        color: var(--primary-bg-color);
    }

    a {
        color: #76839a;
        font-size: 14px;
    }
`;
