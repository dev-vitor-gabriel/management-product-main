import React, {useContext} from "react";

import { PaginationContext } from "../../contexts/pagination";

import { useNavigate } from "react-router-dom";
import Icon from "../Icons";
import { Container, MenuItem } from './style';

export default function SubMenuItem({title, subMenuItem}) {

    const navigate = useNavigate();

    const {handlePagination} = useContext(PaginationContext);

    return(
        <Container>
            <MenuItem onClick={()=> {
                navigate(subMenuItem.path_menu_mnu)
                handlePagination(title, [title, subMenuItem.des_menu_mnu])
            }}>
                <Icon icon={subMenuItem.icon_menu_mnu} />
                <span>{subMenuItem.des_menu_mnu}</span>
            </MenuItem>
        </Container>
    )
}