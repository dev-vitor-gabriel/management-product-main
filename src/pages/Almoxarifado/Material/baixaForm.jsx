import { useEffect, useState } from "react";
import yup from "../../../utils/yup";

import Modal from "../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/Buttons/ButtonSubmit";
import Input from "../../../components/Input";
import SelectBox from "../../../components/Select";
import { saveBaixa } from "../../../services/baixa";
import { getEstoque } from "../../../services/estoque";
import { getMaterial } from "../../../services/material";
import { FormGroup } from "./style";

export default function BaixaForm({
  reg,
  onClose,
  visible,
  refresh,
  tipoMovimentacao,
}) {
  const [form, setForm] = useState(reg ?? {});
  const [formData, setFormData] = useState(reg ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([getMaterial(), getEstoque('', 0, 999)]).then(
          ([material, estoque]) => {

            const materialOptions = material.map(
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
                      column: "qtd_material_eti",
                      value: 1,
                      type: "number",
                    },
                  ],
                };
              }
            );

            const estoqueOptions = estoque.items.map(
              ({ id_estoque_est, des_estoque_est }) => {
                return {
                  value: id_estoque_est,
                  label: des_estoque_est,
                };
              }
            )

            setFormData({ materialOptions, estoqueOptions });
          }
        );
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };
    fetchData();
  }, []);

  const handleChangeValue = (event) => {
    const inputName = event.target.name.replace(/\[|\]/g, "");

    const value = event.target.value;
    setForm((prev) => ({ ...prev, [inputName]: value }));
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    let objError = {};
    setTimeout(async () => {
      try {
        const formFactory = {
          id_centro_custo_mov: null,
          des_estoque_item_eti: "",
          materiais: [],
        };
        const formData = { ...formFactory, ...form };

        formData.materiais = formData.materiais.map((reg) => {
          const regQtd = reg.custom.filter(
            ({ column }) => column == "qtd_material_eti"
          );

          return {
            id_material_mte: reg.value,
            qtd_material_mit: parseInt(regQtd?.[0].value) ?? 1,
          };
        });
        const response = await saveBaixa(tipoMovimentacao, formData);
        if (!response.error) {
          if (response?.data?.service?.id ?? false) {
            setForm((prev) => ({
              ...prev,
              id_servico_ser: response.data.service.id,
            }));
          }
          toast.success("Baixa de Entrada Realizada!");
          onClose();
        } else {
          toast.error(response?.message?.message ?? response.error);
        }
      } catch (err) {
        if (err?.errors) {
          err.errors.forEach((e) => {
            const [inputError, ...error] = e.split(" ");
            objError = { ...objError, [inputError]: error.join(" ") };
          });
        } else {
          console.log(err);
        }
        console.log(err)
      } finally {
        setError(objError);
        setLoadingSubmit(false);
      }
    }, 1000);
  };

  return (
    <Modal
      title={form.id_material_und ? "Edição" : "Cadastro"}
      onClose={onClose}
      visible={visible}
    >
      <FormGroup>
        <label>Estoque</label>
        <SelectBox
          options={formData.estoqueOptions ?? []}
          defaultValue={form.id_estoque_mov ?? []}
          name="id_estoque_mov[]"
          onChange={handleChangeValue}
          error={error?.id_estoque_mov ?? false}
          limit={1}
        />
      </FormGroup>
      <FormGroup>
        <label>Materiais</label>
        <SelectBox
          options={formData.materialOptions ?? []}
          defaultValue={form?.materiais ?? []}
          name="materiais[]"
          onChange={handleChangeValue}
          error={error?.materiais ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Observação</label>
        <Input
          type={"text"}
          defaultValue={form?.txt_movimentacao_mov ?? ""}
          name="des_estoque_item_eti"
          onChange={handleChangeValue}
          error={error?.txt_movimentacao_mov ?? false}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>
        Salvar
      </ButtonSubmit>
    </Modal>
  );
}
