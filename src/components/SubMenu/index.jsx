import React, { useState, useContext } from "react";

import { Container, FlexRowStart, MenuItem, MenuTitle } from './style';

import { PaginationContext } from "../../contexts/pagination"; 

import SubMenuItem from "../SubMenuItem";

import {
    MdKeyboardArrowDown,
    MdKeyboardArrowRight
} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import Icon from "../Icons";

export default function SubMenu({title, submenu}) {
    
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const { handlePagination } = useContext(PaginationContext);

    function handleShowMenu() {
        setShowMenu(!showMenu);
    }
    
    return(
        <Container> 
            {submenu.children?
                <div className="submenu-item" onClick={() => handleShowMenu()}>
                    <FlexRowStart>
                        <Icon icon={submenu.icon_menu_mnu} />
                        <MenuTitle hasChildren={true}>{submenu.des_menu_mnu}</MenuTitle>
                    </FlexRowStart>
                    {showMenu? <MdKeyboardArrowDown size={18} color="#78839a"/> : <MdKeyboardArrowRight size={18} color="#78839a"/> }
                </div>
            :
                <MenuItem onClick={()=> {
                    navigate(submenu.path_menu_mnu)
                    handlePagination(title, [title, submenu.des_menu_mnu])
                }}>
                    <Icon icon={submenu.icon_menu_mnu} /><span>{submenu.des_menu_mnu}</span>
                </MenuItem>
            }

            {showMenu && submenu.children && submenu.children.map((item, index) => (
                <SubMenuItem key={index} title={submenu.des_menu_mnu} subMenuItem={item}/>
            ))}
        </Container>
    )
}