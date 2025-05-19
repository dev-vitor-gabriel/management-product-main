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
  getUsuarioMenu,
  salvarUsuarioMenu,
  getMenusEmpresa,
} from "../../../services/menu.js";
import { getCompanyUsers } from "../../../services/usuario.js";
import Icon from "../../../components/Icons.jsx";
import { FloppyDisk } from "@phosphor-icons/react";
import "./style.css";
import Input from "../../../components/Input/index.jsx";
import { useDebounce } from "../../../utils/customHooks.js";
import { toast } from "react-toastify";

export default function PermissoesUsuario() {
  const [empresas, setUsuario] = useState([]);
  const [menus, setMenus] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionada] = useState(null);
  const [permissoesUsuario, setPermissoesUsuario] = useState([]);
  const [cachedMenuUsuarios, setCachedMenuUsuarios] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const debouncedSearch = useDebounce(filtroUsuario, 500);

  useEffect(() => {
    const fetchCompanies = async () => {
      const empresas = await getCompanyUsers(filtroUsuario, 1, 5);
      setUsuario(empresas.items);

      if (menus.length > 0) {
        return;
      }
      const response = await getMenusEmpresa();
      setMenus(response);
    };
    fetchCompanies();
  }, [debouncedSearch]);

  const handleUserClick = async (user) => {
    if (user.id == usuarioSelecionado?.id) return;

    setUsuarioSelecionada(user);
    let menusUsuario = [];
    if (cachedMenuUsuarios[user.id]) {
      menusUsuario = cachedMenuUsuarios[user.id];
    } else {
      menusUsuario = await getUsuarioMenu(user.id);
      setCachedMenuUsuarios((prev) => {
        let newCachedMenuUsuarios = { ...prev };

        newCachedMenuUsuarios[user.id] = menusUsuario;

        return newCachedMenuUsuarios;
      });
    }
    setPermissoesUsuario([]);
    menusUsuario.forEach((menu) => {
      togglePermission(menu, false);
    });
  };

  const togglePermission = (menu, removeMenu) => {
    setPermissoesUsuario((permissoesUsuario) => {
      let updatedPermissions = [...permissoesUsuario];

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
              checked={permissoesUsuario.includes(menu.id_menu_mnu)}
              onChange={() =>
                togglePermission(
                  menu,
                  permissoesUsuario.includes(menu.id_menu_mnu)
                )
              }
            />
            {menu.des_menu_mnu}
          </label>
        }
        defaultCollapsed={true}
      >
        {menu.children ? renderTree(menu.children) : null}
      </TreeView>
    ));
  };

  const savePermissions = async () => {
    const usuario = {
      id_user: usuarioSelecionado.id,
      id_menu_usm: permissoesUsuario ?? [],
    };

    try {
      setIsSaving(true);
      await salvarUsuarioMenu(usuario);
      toast.success("Permissões salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar permissões:", error);
      toast.error("Erro ao salvar permissões.");
    } finally {
      setIsSaving(false);
    }
    setCachedMenuUsuarios((prev) => {
      const newCache = { ...prev };
      delete newCache[usuarioSelecionado.id];
      return newCache;
    });
  };

  const handleCompanyNameChanged = (event) => {
    if (!event.target) {
      return;
    }

    setFiltroUsuario(event.target.value);
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
          <h1>Usuarios</h1>
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
                key={company.id}
                active={usuarioSelecionado?.id === company.id}
                onClick={() => handleUserClick(company)}
              >
                {company.name}
              </CompanyItem>
            ))}
          </ListContainer>
        </Sidebar>
        {usuarioSelecionado ? (
          <Content>
            <h1>Permissões</h1>
            <ListContainer>{renderTree(menus)}</ListContainer>
          </Content>
        ) : null}
      </SidebarContainer>
    </Container>
  );
}
