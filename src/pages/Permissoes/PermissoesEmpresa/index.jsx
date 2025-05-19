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
  FormGroup,
} from "./style.js";
import { getCompanies } from "../../../services/empresa.js";
import {
  getMenus,
  getEmpresaMenu,
  salvarEmpresaMenu,
} from "../../../services/menu.js";
import Icon from "../../../components/Icons.jsx";
import { FloppyDisk } from "@phosphor-icons/react";
import "./style.css";
import Input from "../../../components/Input";
import { useDebounce } from "../../../utils/customHooks.js";
import { toast } from "react-toastify";

export default function PermissoesEmpresa() {
  const [empresas, setEmpresa] = useState([]);
  const [menus, setMenus] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [permissoesEmpresa, setPermissoesEmpresa] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [cachedMenuEmpresas, setCachedMenuEmpresas] = useState({});
  const [filtroEmpresa, setFiltroEmpresa] = useState("");
  const debouncedSearch = useDebounce(filtroEmpresa, 500);

  useEffect(() => {
    const fetchCompanies = async () => {
      const empresas = await getCompanies(filtroEmpresa, 1, 5);
      setEmpresa(empresas.items);

      if (menus.length > 0) {
        return;
      }
      const response = await getMenus();
      setMenus(response);
    };
    fetchCompanies();
  }, [debouncedSearch]);

  const handleCompanyClick = async (company) => {
    if (company.id_empresa_emp == empresaSelecionada?.id_empresa_emp) return;

    setEmpresaSelecionada(company);
    let menusEmpresa = [];
    if (cachedMenuEmpresas[company.id_empresa_emp]) {
      menusEmpresa = cachedMenuEmpresas[company.id_empresa_emp];
    } else {
      menusEmpresa = await getEmpresaMenu(company.id_empresa_emp);
      setCachedMenuEmpresas((prev) => {
        let newCachedMenuEmpresas = { ...prev };

        newCachedMenuEmpresas[company.id_empresa_emp] = menusEmpresa;

        return newCachedMenuEmpresas;
      });
    }
    setPermissoesEmpresa([]);
    menusEmpresa.forEach((menu) => {
      togglePermission(menu, false);
    });
  };

  const togglePermission = (menu, removeMenu) => {
    setPermissoesEmpresa((permissoesEmpresa) => {
      let updatedPermissions = [...permissoesEmpresa];

      const menusToModify = getAllMenuIds(menu);
      if (menu.id_father_mnu && !removeMenu) {
        menusToModify.push(menu.id_father_mnu);
      }
      if (removeMenu) {
        updatedPermissions = updatedPermissions.filter(
          (l) => !menusToModify.includes(l)
        );
      } else {
        updatedPermissions.push(...menusToModify);
      }

      return updatedPermissions;
    });
  };

  const getAllMenuIds = (menu) => {
    const ids = [menu.id_menu_mnu];
    if (menu.children) {
      menu.children.forEach((children) => {
        ids.push(...getAllMenuIds(children));
      });
    }
    return ids;
  };

  const renderTree = (menus) => {
    return menus.map((menu) => (
      <TreeView
        treeViewClassName={menu.children ? "" : "hide-arrow"}
        key={menu.id_menu_mnu}
        nodeLabel={
          <label>
            <Checkbox
              checked={permissoesEmpresa.includes(menu.id_menu_mnu)}
              onChange={() =>
                togglePermission(
                  menu,
                  permissoesEmpresa.includes(menu.id_menu_mnu)
                )
              }
            />
            {menu.des_menu_mnu}
          </label>
        }
        defaultCollapsed={true}
      >
        {menu.children != undefined ? renderTree(menu.children ?? []) : null}
      </TreeView>
    ));
  };

  const savePermissions = async () => {
    const empresas = [
      {
        id_empresa_emn: empresaSelecionada.id_empresa_emp,
        id_menu_emn: permissoesEmpresa,
      },
    ];
    try {
      setIsSaving(true);
      await salvarEmpresaMenu(empresas);
      toast.success("Permissões salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar permissões:", error);
      toast.error("Erro ao salvar permissões.");
    } finally {
      setIsSaving(false);
    }
    setCachedMenuEmpresas((prev) => {
      let newCachedMenuEmpresas = { ...prev };

      newCachedMenuEmpresas[empresaSelecionada.id_empresa_emp] = null;

      return newCachedMenuEmpresas;
    });
  };

  const handleCompanyNameChanged = (event) => {
    if (!event.target) {
      return;
    }

    setFiltroEmpresa(event.target.value);
  };

  return (
    <Container>
      <Header>
        <Button onClick={savePermissions} disabled={isSaving}>
          <h4 style={{ fontWeight: "600" }}>
            {isSaving ? "Salvando..." : "Salvar"}
          </h4>
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
            <ListContainer>{renderTree(menus)}</ListContainer>
          </Content>
        ) : null}
      </SidebarContainer>
    </Container>
  );
}
