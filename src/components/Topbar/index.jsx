import React, { useContext, useState } from "react";

import { useNavigate } from 'react-router-dom';

import {
    DropdownProfile,
    Header,
    Menu,
    //Search, 
    Profile
} from './style';

import { MdOutlinePerson } from 'react-icons/md';
import { baseUrlImg } from "../../utils/baseUrlImg";
import imgAvatar from '../../assets/avatar.png';


import { AuthContext } from "../../contexts/auth";
import { PaginationContext } from "../../contexts/pagination";
import Breadcrumb from "../Breadcrumb";
import Title from "../Title";

export default function Topbar() {

    const { user, logout } = useContext(AuthContext);
    const { title, breadItens } = useContext(PaginationContext);
    const navigate = useNavigate();

    const userStorage = localStorage.getItem('user');
    if (userStorage) {
    var userObj = JSON.parse(userStorage);
    } else {
    console.log('Usuário não encontrado no localStorage');
    }

    const [showMenuProfile, setShowMenuProfile] = useState(false);

    function handleShowMenuProfile() {
        setShowMenuProfile(!showMenuProfile);
    }

    function handleLogout() {
        logout();
    }

    return (
        <Header>
            {/* <Search>
                <input type="text" placeholder="Pesquise por resultados..."/>
                <button>
                    <MdSearch size={22} color="#b4bdce"/>
                </button>
            </Search> */}

            <div>
                <Title>{title}</Title>
                <Breadcrumb breadItens={breadItens} />
            </div>


            <Menu>
                <Profile onClick={handleShowMenuProfile}>
                    <img src={`${baseUrlImg}${userObj.url_img_user}`} alt="imagem de perfil" />
                </Profile>

                {showMenuProfile &&
                    <DropdownProfile>
                        <div className="box-profile-info">
                            <h5>{user.name}</h5>
                            <span>Administrator</span>
                        </div>
                        <a href="#">
                            <MdOutlinePerson size={20} color="#000" />
                            <span>Perfil</span>
                        </a>
                        <a href="#">
                            <MdOutlinePerson size={20} color="#000" />
                            <span>Ajuda</span>
                        </a>
                        <a href="#">
                            <MdOutlinePerson size={20} color="#000" />
                            <span>Configurações</span>
                        </a>
                        <a onClick={handleLogout}>
                            <MdOutlinePerson size={20} color="#000" />
                            <span>Sair</span>
                        </a>
                    </DropdownProfile>
                }
            </Menu>
        </Header>
    )
}