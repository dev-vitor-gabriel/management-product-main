import styled from "styled-components";

export const Container = styled.div`
    margin: 1.5rem 0rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn-area {
        display: flex;
        gap: 16px;
    }

    .btn-area button {
        color: var(--white);
        border-radius: 5px;
        padding: 0.6rem;

        border: none;

        display: flex;
        align-items: center;
        gap: 5px;
    }

    .btn-area .add-btn {
        background: var(--primary-bg-color);
    }
    .btn-area .add-btn:hover {
        opacity: 0.8;
    }

    .btn-area .export-btn {
        background: #13bfa6;
    }
`;