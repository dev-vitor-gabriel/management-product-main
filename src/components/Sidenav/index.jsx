import React, { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import logo from '../../assets/logo-omnigest-light.png';

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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <img src={logo} alt="logo" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
            </Logo>
            <Nav>
                {userMenu.map((item, index) => (
                    <Menu key={index} menu={item} />
                ))}
            </Nav>
        </Aside>
    )
}