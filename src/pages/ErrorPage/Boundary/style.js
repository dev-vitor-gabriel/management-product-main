import styled from 'styled-components';

export const Container = styled.div`
padding-bottom: 20%;
width: 100dvw;
height: 100dvh;
display: flex;
flex-direction: column;
justify-content: center;
background: var(--home-color);
`;


export const ErrorTitle = styled.h1`
    display: flex;
    justify-content: center;
    text-align: center;
    color:var(--primary);
    font-size: 8rem;
`;


export const Message = styled.h2`
    display: flex;
    justify-content: center;
    text-align: flex-end;
    color:var(--primary);
    font-size: 3rem;
`;
export const Link = styled.a`
    margin-top: 48px;
    display: flex;
    justify-content: center;
    text-align: flex-end;
    color:var(--primary);
    font-size: 1.6rem;
    &:hover{
        color:var(--indigo);
    }
`;

