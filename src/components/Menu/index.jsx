import React, { useState } from "react";

import { Container, FlexRowStart, MenuTitle } from './style';

import SubMenu from "../SubMenu";

import {
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
} from 'react-icons/md';
import Icon from "../Icons";

export default function Menu({ menu }) {

    const [showMenu, setShowMenu] = useState(false);

    function handleShowMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <Container>
            {menu.children ?
                <div className="menu-item" onClick={() => handleShowMenu()}>
                    <FlexRowStart>
                    <Icon icon={menu.icon_menu_mnu} />
                    <MenuTitle>{menu.des_menu_mnu}</MenuTitle>
                    </FlexRowStart>
                    {showMenu? <MdKeyboardArrowDown size={18} color="#78839a"/> : <MdKeyboardArrowRight size={18} color="#78839a"/> }
                </div>
                :
                <div className="menu-item">

                    <MenuTitle><Icon icon={menu.icon_menu_mnu} />{menu.des_menu_mnu}</MenuTitle>
                </div>
            }

            {showMenu && menu.children && menu.children.map((item, index) => (
                <SubMenu key={index} title={menu.des_menu_mnu} submenu={item} />
            ))}
        </Container>
    )
}