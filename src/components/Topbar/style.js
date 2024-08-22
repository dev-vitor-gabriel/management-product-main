import styled from 'styled-components';

export const Header = styled.header`
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: space-between;
   
    width: calc(100vw - 260px);
    height: 12vh;
    padding: 0px 40px;
    border-left: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    
    position: fixed;
    z-index: 99;
    top: 0;
    left: 260px;
`;

// export const Search = styled.div`
//     border: 1px solid var(--border-color);
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     width: 350px;
//     height: 40px;
//     border-radius: 20px;
//     padding: 16px 24px;

//     input {
//         width: 100%;
//         border: none;
//         font-size: 16px;
//         color: #4d5875;
//     }
//     input::placeholder {
//         color: #4d5875;
//     }

//     button {
//         padding: 5px;
//         background: none;
//         border: none;
//     }
// `;

export const Profile = styled.button`
    border: none;
    background: none;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

export const Menu = styled.div`
    position: relative;
`;

export const DropdownProfile = styled.div`
    position: absolute;
    top: 55px;
    right: 0;
    display: flex;
    flex-direction: column;

    width: 200px;
    background: var(--white);
    border: 2px solid var(--border-color);
    border-radius: 5px;

    .box-profile-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .box-profile-info span {
        color: #76839a;
        font-size: 12px;
        font-weight: 500;
    }

    a {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #000;
        padding: 16px;
        border-top: 1px solid var(--border-color);
    }
    a:hover {
        background: rgba(98, 89, 202, 0.1);
    }
`;