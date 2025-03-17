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
  Checkbox
} from "./style.js";
import { getCompanies } from "../../../services/empresa";
import { getMenus, getEmpresaMenu, salvarEmpresaMenu } from "../../../services/menu.js";

export default function PermissoesEmpresa() {
  const [empresas, setEmpresa] = useState([]);
  const [menus, setMenus] = useState({});
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [permissoesEmpresaMap, setPermissoesEmpresaMap] = useState({});
  const [permissoesEmpresaSelecionada, setPermissoesEmpresaSelecionada] = useState({});

  useEffect(() => {
    const fetchCompanies = async () => {
      const empresas = await getCompanies("", 1, 999);
      setEmpresa(empresas.items);

      const menus = await getMenus();
      setMenus(menus);

    };
    fetchCompanies();
  }, []);

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
      <TreeView key={menu.id_menu_mnu} nodeLabel={
        <label>
          <Checkbox
            checked={ permissoesEmpresaSelecionadaMap.includes(menu.id_menu_mnu) || false }
            onChange={() => togglePermission(menu, permissoesEmpresaSelecionadaMap.includes(menu.id_menu_mnu), empresaSelecionada)}
          />
          {menu.des_menu_mnu}
        </label>
      } defaultCollapsed={true}>
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

  return (
    <Container>
      <Header>
        <Button onClick={savePermissions}>Salvar</Button>
      </Header>
      <SidebarContainer>
        <Sidebar>
          <h1>Empresas</h1>
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
        </Sidebar>
        {empresaSelecionada ? (
          <Content>
            <h1>Permissões</h1>
            {renderTree(menus)}
          </Content>
        ) : null}
      </SidebarContainer>
    </Container>
  );
}
