import styled from 'styled-components';

export const LoginPage = styled.div`
    min-height: 100vh;
    background: var(--primary-bg-color);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

export const Logo = styled.img`
    object-fit: cover;
`;

export const ContainerLogin = styled.div`
    width: 370px;
    background: var(--light);
    border-radius: 5px;
    padding: 25px;
`;

export const Form = styled.form`
   
`;

export const FormTitle = styled.span`
    font-size: 24px;
    line-height: 1.2;
    text-align: center;
    width: 100%;
    display: block;
    padding-bottom: 30px;
`;

export const Input = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ecf0fa;

    & + & {
        margin-top: 10px;
    }

    input {
        border: 0;
        background: transparent;
    }
`;

export const BoxLink = styled.div`
    margin-top: 10px;
    text-align: ${props => props.textalign? props.textalign : 'center'};
    font-size: 14px;

    a {
        font-weight: 400;
        line-height: 1.5;
        color: var(--primary-bg-color);
    }
`;

export const Button = styled.button`
    margin-top: 15px;
    font-size: 14px;
    width: 100%;
    border: 0;
    background: var(--primary-bg-color);
    border-radius: 5px;
    height: 40px;
    color: var(--light);

    &:hover {
        opacity: 0.8;
    }
`;