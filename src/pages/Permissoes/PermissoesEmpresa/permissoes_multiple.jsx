import { useState, useEffect } from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import {
  Container,
  Sidebar,
  Content,
  CompanyItem,
  Header,
  SidebarContainer,
  Button,
  Checkbox,
  IconSeparator,
  ListContainer,
  FormGroup
} from "./style.js";
import { getCompanies } from "../../../services/empresa.js";
import { getMenus, getEmpresaMenu, salvarEmpresaMenu } from "../../../services/menu.js";
import Icon from '../../../components/Icons.jsx'
import { FloppyDisk } from "@phosphor-icons/react";
import './style.css'
import Input from "../../../components/Input/index.jsx";
import { useDebounce } from '../../../utils/customHooks.js';

export default function PermissoesEmpresa() {
  const [empresas, setEmpresa] = useState([]);
  const [menus, setMenus] = useState();
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [permissoesEmpresaMap, setPermissoesEmpresaMap] = useState({});
  const [filtroEmpresa, setFiltroEmpresa] = useState("");  
  const debouncedSearch = useDebounce(filtroEmpresa, 500);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!debouncedSearch) {
        return;
      }
      const empresas = await getCompanies(filtroEmpresa, 1, 999);
      setEmpresa(empresas.items);

      if (menus) {
        return;
      }
      const response = await getMenus();
      setMenus(response);

    };
    fetchCompanies();
  }, [debouncedSearch]);

  const handleCompanyClick = async (company) => {
    setEmpresaSelecionada(company);
    if (!permissoesEmpresaMap[company.id_empresa_emp]) {
      const menusEmpresa = await getEmpresaMenu(company.id_empresa_emp);
      menusEmpresa.forEach(menu => {
        togglePermission(menu, false, company)
      })
    }
  };

  const togglePermission = (menu, removeMenu, empresa) => {
    setPermissoesEmpresaMap((prev) => {
      const updatedPermissoesEmpresaMap = { ...prev };

      if (!updatedPermissoesEmpresaMap[empresa.id_empresa_emp]) {
        updatedPermissoesEmpresaMap[empresa.id_empresa_emp] = [];
      }
      const menusToModify = getAllMenuIds(menu);
      if (menu.id_father_mnu && !removeMenu) {
        menusToModify.push(menu.id_father_mnu)
      }
      if (removeMenu) {
        updatedPermissoesEmpresaMap[empresa.id_empresa_emp] = updatedPermissoesEmpresaMap[empresa.id_empresa_emp].filter(l => !menusToModify.includes(l));
      } else {
        updatedPermissoesEmpresaMap[empresa.id_empresa_emp].push(...menusToModify);
      }
  
      return updatedPermissoesEmpresaMap;
    });
  };

  const getAllMenuIds = (menu) => {
    const ids = [menu.id_menu_mnu]
    if (menu.children) 
    {
      menu.children.forEach(children => {
        ids.push(...getAllMenuIds(children))
      });
    }
    return ids;
  }

  const renderTree = (menus) => {
    const permissoesEmpresaSelecionadaMap = permissoesEmpresaMap[empresaSelecionada.id_empresa_emp] || [];
    return menus.map((menu) => (
      <TreeView treeViewClassName={menu.children ? "" : "hide-arrow"} key={menu.id_menu_mnu} nodeLabel={
        <label>
          <Checkbox
            checked={ permissoesEmpresaSelecionadaMap.includes(menu.id_menu_mnu) || false }
            onChange={() => togglePermission(menu, permissoesEmpresaSelecionadaMap.includes(menu.id_menu_mnu), empresaSelecionada)}
          />
          {menu.des_menu_mnu}
        </label>
      } 
      defaultCollapsed={true}

      >
        {menu.children ? renderTree(menu.children, menu.id_menu_mnu) : null}
      </TreeView>
    ));
  };

  const savePermissions = async () => {
    const empresas = []
    Object.keys(permissoesEmpresaMap).map(key => {
      empresas.push({
        id_empresa_emn: key,
        id_menu_emn: permissoesEmpresaMap[key]
      })
    })
    
    await salvarEmpresaMenu(empresas)
  }

  const handleCompanyNameChanged = (event) => {
    if (!event.target)
    {
      return;
    }

    setFiltroEmpresa(event.target.value)
  };

  return (
    <Container>
      <Header>
        <Button onClick={savePermissions}>
          <h4 style={{ fontWeight: "600" }}>Salvar</h4>
          <IconSeparator>
            <span style={ { fontSize: '18px', fontWeight: 'lighter' } }>|</span>
            <FloppyDisk size={25} />
          </IconSeparator>
        </Button>
      </Header>
      <SidebarContainer>
        <Sidebar>
          <h1>Empresas</h1>
          <ListContainer>
            <FormGroup>
              <Input
                className
                type={"text"}
                placeholder={"Comece a digitar..."}
                name="empresa_name"
                onChange={handleCompanyNameChanged}
                error={""}
              />
            </FormGroup>
              {empresas.map((company) => (
                  <CompanyItem
                    key={company.id_empresa_emp}
                    active={
                      empresaSelecionada?.id_empresa_emp === company.id_empresa_emp
                    }
                    onClick={() => handleCompanyClick(company)}
                  >
                    {company.des_empresa_emp}
                  </CompanyItem>
                ))}
          </ListContainer>
        </Sidebar>
        {empresaSelecionada ? (
          <Content>
            <h1>Permissões</h1>
            <ListContainer>
              {renderTree(menus)}
            </ListContainer>
          </Content>
        ) : null}
      </SidebarContainer>
    </Container>
  );
}
