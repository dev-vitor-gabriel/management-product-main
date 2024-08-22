import React, { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import logo from '../../assets/logo-dark-zanex.png';

import Menu from "../Menu";

import {
    Aside,
    Logo,
    Nav
} from './style';

export default function Sidenav() {

    const { userMenu } = useContext(AuthContext);


    return (
        <Aside>
            <Logo>
                <img src={logo} alt="logo" />
            </Logo>
            <Nav>
                {userMenu.map((item, index) => (
                    <Menu key={index} menu={item} />
                ))}
            </Nav>
        </Aside>
    )
}