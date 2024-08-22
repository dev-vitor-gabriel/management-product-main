import styled from 'styled-components';

export const Aside = styled.aside`
    width: 260px;
    background: var(--white);

    overflow: hidden;

    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
`;

export const Logo = styled.div`
    height: 12vh;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Nav = styled.div`
    padding: 15px 0;
    height: 88vh;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: #fff;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(128, 128, 128, 0.5);
        border-radius: 10px;
    }   
`;

export const NavSubMenu = styled.div`
    & + & {
        margin-top: 25px;
    }
`;

export const NavTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin-bottom: 10px;
    cursor: pointer;

    h3 {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        color: #76839a;
        opacity: 0.7;
    }
`;

export const NavItem = styled.div`
    width: 95%;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 10px 8px 50px;
    cursor: pointer;
    transition: 0.5s all;
    
    svg {
        color: #495584;
        transition: 0.5s all;
    }
    span {
        color: #495584;
        font-size: 14px;
        font-weight: 500;
        transition: 0.5s all;
    }

    &:hover {
        background-color: var(--primary-bg-color);
    }
    &:hover span {
        color: #ffffff;
    }
    &:hover svg {
        color: #ffffff;
    }

`;