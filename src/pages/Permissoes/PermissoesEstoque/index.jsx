import { useState, useEffect } from "react";
import SelectBoxV2 from "../../../components/SelectV2/index.jsx";
import { SaveButton, FormGroup } from "./style.js";
import { getCompanyUsers } from "../../../services/usuario.js";
import { getEstoque } from "../../../services/estoque";
import { useDebounce } from "../../../utils/customHooks.js";
import { toast } from "react-toastify";
import EstoqueTable from "./estoqueTable.jsx";
import { createUsuarioEstoque, getUsuarioEstoque } from "../../../services/usuarioEstoque.js";

export default function PermissoesEstoque() {
  const [usuarios, setUsuarios] = useState([]);
  const [estoques, setEstoques] = useState([]);
  const [totalRows, setTotalRows] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [cache, setCache] = useState({});
  const [grantedPermissions, setGrantedPermissions] = useState([]);
  const [isSaving, setIsSaving] = useState(false); // Estado para controlar o botão
  const [selectedUserId, setSelectedUserId] = useState(null);
  const debouncedSearch = useDebounce(filtroUsuario, 500);

  const getEstoques = async (filter, page, pageSize) => {
    try {
      const response = await getEstoque('',page, pageSize, null, true);
      setEstoques(response.items);
      setTotalRows(response.totalRows);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    }
  };
  const getUsers = async () => {
    const users = await getCompanyUsers(filtroUsuario, 1, 5);
    setUsuarios(
      users.items.map((user) => {
        return { value: user.id, label: user.name };
      })
    );
  };

  useEffect(() => {
    getUsers();
    getEstoques(true);
  }, [debouncedSearch]);

  const handleUserChange = async (event) => {
    if (!event.target.value) {
      setGrantedPermissions([]);
      setSelectedUserId(null);
      return;
    }
    const userId = event.target.value;
    setSelectedUserId(userId);
    if (cache[userId]) {
      setGrantedPermissions(cache[userId]);
      return;
    }
    try {
      const response = await getUsuarioEstoque(userId);
      const ids = response.map((item) => item.id_estoque_est);
      setGrantedPermissions(ids);
      setCache((prevCache) => ({
        ...prevCache,
        [userId]: ids,
      }));
    } catch (error) {
      console.error(
        "Erro ao buscar permissões de centro de custo do usuário:",
        error
      );
    }
  };

  const getUsersSelect = async (filter) => {
    const users = await getUsers(filter).then((users) => {
      return users.map((user) => {
        return { value: user.id, label: user.name };
      });
    });
    setUsuarios(users);
    return users;
  };

  const handleCheckboxChange = (id) => {
    setGrantedPermissions((prev) => {
      const updatedPermissions = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      return updatedPermissions;
    });
  };

  const handleSave = async () => {
    if (!selectedUserId) {
      return;
    }
    setIsSaving(true);
    const createUsuarioEstoqueRequest = {
      id_user_rue: selectedUserId,
      id_estoque_rue: grantedPermissions,
    };

    try {
      await createUsuarioEstoque(createUsuarioEstoqueRequest);
      setCache({});
      toast.success("Permissões salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar permissões:", error);
      toast.error("Erro ao salvar permissões.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div>
        <h1>Permissões Estoque</h1>
        <FormGroup>
          <SelectBoxV2
            options={usuarios}
            name="usuarios[]"
            onChange={handleUserChange}
            getOptions={getUsersSelect}
            setOptions={setUsuarios}
            error={null ?? false}
            limit={1}
          />
          <SaveButton onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </SaveButton>
        </FormGroup>
        <EstoqueTable
          refresh={getEstoques}
          data={estoques}
          totalRows={totalRows}
          granted={grantedPermissions}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
    </>
  );
}
