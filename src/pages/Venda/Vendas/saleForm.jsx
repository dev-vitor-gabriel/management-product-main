import { useEffect, useState } from "react";
import yup from "../../../utils/yup";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/Buttons/ButtonSubmit";
import SelectBox from "../../../components/Select";
import { getEmployee } from "../../../services/employee";
import { getSaleProducts, saveSales } from "../../../services/sale";
import { Expand, FormGroup } from "./style";
import { getCentroCusto } from "../../../services/centroCusto";
import { getCliente } from "../../../services/cliente";
import { getMaterial } from "../../../services/material";
import api from "../../../services/api";

const schema = yup.object().shape({
  id_cliente_ser: yup.number().required().positive().integer(),
  id_funcionario_vda: yup.number().required().positive().integer(),
  id_centro_custo_ser: yup.number().required().positive().integer()
});

export default function SaleForm({ sale, onClose, visible }) {
  const [form, setForm] = useState(sale ?? {});
  const [inputData, setInputData] = useState({});
  const [formData, setFormData] = useState(sale ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const isEditing = sale.id_venda_vda ?? false;

  useEffect(() => {
    if (isEditing) {
      getSaleData(sale);
    } else {
      getFormData();
    }
  }, []);

  const getSaleData = (sale) => {};

  const getFormData = () => {
    Promise.all([
      getEmployee(),
      getMaterial(),
      getCliente(),
      getCentroCusto(),
    ]).then(([employees, materiais, clientes, centrosCusto]) => {
      const funcionarioTypeOptions = employees.map(
        ({ id_funcionario_tfu, desc_funcionario_tfu }) => {
          return {
            value: id_funcionario_tfu,
            label: desc_funcionario_tfu,
          };
        }
      );
      const materialOptions = materiais.map(
        ({
          id_material_mte,
          des_material_mte,
          des_reduz_unidade_und,
          vlr_material_mte,
        }) => {
          return {
            value: id_material_mte,
            label: `${des_material_mte} - ${des_reduz_unidade_und}`,
            custom: [
              {
                prefixDefault: des_reduz_unidade_und,
                label: "Quantidade",
                column: "qtd_material_rsm",
                value: 1,
                type: "number",
              },
              {
                label: "Valor Unitário",
                column: "vlr_material_mte",
                value: vlr_material_mte,
                type: "number",
                mask: "currency",
              },
            ],
          };
        }
      );
      const clienteOptions = clientes.map(
        ({
          id_cliente_cli,
          des_cliente_cli,
          documento_cliente_cli,
          telefone_cliente_cli,
        }) => {
          return {
            value: id_cliente_cli,
            label: `${des_cliente_cli} - ${
              telefone_cliente_cli == ""
                ? documento_cliente_cli
                : telefone_cliente_cli
            }`,
          };
        }
      );
      const centroCustoTypeOptions = centrosCusto.map(
        ({ id_centro_custo_cco, des_centro_custo_cco }) => {
          return {
            value: id_centro_custo_cco,
            label: des_centro_custo_cco,
          };
        }
      );
      setFormData({
        employees: funcionarioTypeOptions,
        materiais: materialOptions,
        clientes: clienteOptions,
        centroCusto: centroCustoTypeOptions,
      });
    });
  };

  const handleChangeValue = (event) => {
    if (!event.target)
    {
      return;
    }
    inputData[event.target.name] = event.target.value
    if (event.target.name == 'materiais'){
      inputData[event.target.name] = event.target.value.map((material) => {
        return {
          id_material_rvm: material.value,
          qtd_material_rvm: material.custom[0].value,
          vlr_unit_material_rvm: parseInt(material.custom[1].value)
        }  
      })
    }
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    await api.post("/venda", inputData)
    .then((res) => {
      toast.success(res.data.message)
      setLoadingSubmit(false);
      setInputData({})
      onClose();
    }).catch((res) => {
      toast.error(res.data.message)
      setLoadingSubmit(false);
    })
  };

  return (
    <Modal
      title={form.id_venda_vda ? "Edição" : "Cadastro"}
      onClose={onClose}
      visible={visible}
    >
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_ser ?? []}
          name="id_centro_custo_vda"
          onChange={handleChangeValue}
          error={""}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Funcionário</label>
        <SelectBox
          options={formData?.employees ?? []}
          defaultValue={form?.id_funcionario_servico_ser ?? []}
          name="id_funcionario_vda"
          onChange={handleChangeValue}
          error={""}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Cliente</label>
        <SelectBox
          options={formData?.clientes ?? []}
          defaultValue={form?.id_cliente_ser ?? []}
          name="id_cliente_ser"
          onChange={handleChangeValue}
          error={""}
          limit={1}
          setDefaultValue = {false}
        />
      </FormGroup>

      <FormGroup>
        <label>Materiais</label>
        <SelectBox
          options={formData.materiais ?? []}
          defaultValue={form?.materiais ?? []}
          name="materiais"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <FormGroup>
        <label>Observação</label>
        <Input
          type={"text"}
          defaultValue={form?.txt_servico_ser ?? ""}
          name="desc_venda_vda"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <Expand>
        <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>
          Salvar
        </ButtonSubmit>
      </Expand>
    </Modal>
  );
}
