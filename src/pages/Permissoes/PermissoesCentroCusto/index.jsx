import { useState, useEffect } from "react";
import SelectBoxV2 from "../../../components/SelectV2";
import { SaveButton, FormGroup } from "./style";
import { getCompanyUsers, getUsers } from "../../../services/usuario.js";
import { getCentroCusto } from "../../../services/centroCusto.js";
import { getCentroCustoUsuario, createCentroCustoUsuario } from "../../../services/centroCustoUsuario.js";
import { useDebounce } from "../../../utils/customHooks.js";
import CentroCustoTable from "./centroCustoTable.jsx";

export default function PermissoesCentroCusto() {
  const [usuarios, setUsuarios] = useState(null);
  const [centroCustos, setCentroCustos] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [cache, setCache] = useState({});
  const [grantedPermissions, setGrantedPermissions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const debouncedSearch = useDebounce(filtroUsuario, 500);

  const getCentroCustos = async () => {
    try {
      const response = await getCentroCusto();
      setCentroCustos(response);
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

    if (centroCustos) {
      return;
    }
    const response = await getCentroCusto();
    setCentroCustos(response);
  };

  useEffect(() => {
    getUsers();
    getCentroCustos();
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
      const response = await getCentroCustoUsuario(userId);
      const ids = response.map((item) => item.id_centro_custo_cco);
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
      return
    }
    const createCentroCustoUsuarioRequest = {
      id_user: selectedUserId,
      id_centro_custo_ccu: grantedPermissions,
    };
    
    await createCentroCustoUsuario(createCentroCustoUsuarioRequest)
    setCache({});
  }

  return (
    <>
      <div>
        <h1>Permissões Centro de Custo</h1>
        <FormGroup>
          <SelectBoxV2
            options={usuarios}
            name="id_estoque[]"
            onChange={handleUserChange}
            getOptions={getUsersSelect}
            setOptions={setUsuarios}
            error={null ?? false}
            limit={1}
          />
          <SaveButton onClick={handleSave}>Salvar</SaveButton>
        </FormGroup>
        <CentroCustoTable
          data={centroCustos}
          granted={grantedPermissions}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
    </>
  );
}
