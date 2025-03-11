import { useState, useEffect } from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { Card, CardHeader, CardContent } from "../../../components/Cards/Card"
import ButtonSubmit from "../../../components/Buttons/ButtonSubmit"
import { getUsers } from "../../../services/usuario"
 
// Simulação da API para buscar permissões de um usuário (estrutura de árvore)
const getUserPermissions = async (userId) => {
  return [
    {
      id: 1,
      name: "Relatórios",
      checked: false,
      children: [
        { id: 4, name: "Visualizar Relatórios", checked: false },
        { id: 5, name: "Exportar Relatórios", checked: false },
      ],
    },
    {
      id: 2,
      name: "Configurações",
      checked: false,
      children: [
        { id: 6, name: "Editar Configurações", checked: false },
        { id: 7, name: "Gerenciar Sistema", checked: false },
      ],
    },
    {
      id: 3,
      name: "Usuários",
      checked: false,
      children: [
        { id: 8, name: "Criar Usuários", checked: false },
        { id: 9, name: "Excluir Usuários", checked: false },
      ],
    },
  ];
};

export default function PermissoesUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [permissoes, setPermissoes] = useState({});
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [expanded, setExpanded] = useState({}); 
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      console.log(data)
      setUsuarios(data);
    };
    fetchUsers();
  }, []);

  const handleUserClick = async (userId) => {
    setUsuarioSelecionado(userId);

    if (!permissoes[userId]) {
      const data = await getUserPermissions(userId);
      setPermissoes((prev) => ({ ...prev, [userId]: data }));
    }
  };

  const handleCheckboxChange = (userId, permId, parentId = null) => {
    setPermissoes((prev) => {
      const updatePermissions = (permissions) => {
        return permissions.map((perm) => {
          if (perm.id === permId) {
            const newChecked = !perm.checked;
            return {
              ...perm,
              checked: newChecked,
              children: perm.children ? perm.children.map((child) => ({ ...child, checked: newChecked })) : [],
            };
          } else if (perm.children) {
            return { ...perm, children: updatePermissions(perm.children) };
          }
          return perm;
        });
      };

      return { ...prev, [userId]: updatePermissions(prev[userId]) };
    });
  };

  const toggleExpand = (permId) => {
    setExpanded((prev) => ({ ...prev, [permId]: !prev[permId] }));
  };

  return (
    <div className="flex gap-4 p-4">
      <Card className="w-1/3">
        <CardHeader title="Usuários" />
        <CardContent>
          <ul>
            {usuarios.map((user) => (
              <li
                key={user.id}
                className={`p-2 cursor-pointer ${
                  usuarioSelecionado === user.id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleUserClick(user.id)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Permissões em formato de árvore */}
      {usuarioSelecionado && (
        <Card className="w-2/3">
          <CardHeader title={`Permissões de ${usuarios.find((u) => u.id === usuarioSelecionado)?.name}`} />
          <CardContent>
            {permissoes[usuarioSelecionado] ? (
              <ul>
                {permissoes[usuarioSelecionado].map((perm) => (
                  <TreeNode
                    key={perm.id}
                    perm={perm}
                    userId={usuarioSelecionado}
                    expanded={expanded}
                    toggleExpand={toggleExpand}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </ul>
            ) : (
              <p>Carregando permissões...</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Componente Recursivo para Renderizar a Árvore de Permissões
function TreeNode({ perm, userId, expanded, toggleExpand, handleCheckboxChange }) {
  return (
    <li className="ml-4">
      <div className="flex items-center gap-2">
        {perm.children && (
          <button onClick={() => toggleExpand(perm.id)} className="text-blue-500">
            {expanded[perm.id] ? "▼" : "▶"}
          </button>
        )}
        <input
          type="checkbox"
          checked={perm.checked}
          onChange={() => handleCheckboxChange(userId, perm.id)}
        />
        <span>{perm.name}</span>
      </div>

      {/* Renderiza os filhos caso esteja expandido */}
      {perm.children && expanded[perm.id] && (
        <ul>
          {perm.children.map((child) => (
            <TreeNode
              key={child.id}
              perm={child}
              userId={userId}
              expanded={expanded}
              toggleExpand={toggleExpand}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
