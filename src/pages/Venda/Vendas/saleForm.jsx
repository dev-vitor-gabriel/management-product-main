import { useEffect, useState } from "react";
import yup from "../../../utils/yup";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/Buttons/ButtonSubmit";
import SelectBox from "../../../components/Select";
import { getEmployee } from "../../../services/employee";
import { getSale, getSaleProducts } from "../../../services/sale";
import { Expand, FormGroup } from "./style";
import { getCentroCusto } from "../../../services/centroCusto";
import { getCliente } from "../../../services/cliente";
import { getMaterial } from "../../../services/material";
import api from "../../../services/api";
import { getEstoque } from "../../../services/estoque";
import { getStatusByOrigem, OrigemStatus } from "../../../services/status";
import ClienteForm from "../../CadastroBase/Perfil/Cliente/clienteForm";
import { getMetodoPagamento } from "../../../services/metodoPagamento";

export default function SaleForm({ saleEditing, onClose, visible }) {
  const [form, setForm] = useState(saleEditing);
  const [inputData, setInputData] = useState(saleEditing ?? {});
  const [formData, setFormData] = useState({});
  const [formChanged, setFormChanged] = useState({});
  const [materiaisOriginais, setMateriaisOriginais] = useState([]);
  const [error, setError] = useState({});
  const [modalCreateClientOpen, setModalCreateClientOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const isEditing = saleEditing ?? false;

  useEffect(() => {
    getFormData();
  }, []);

  useEffect(() => {}, [formChanged]);

  const getFormData = () => {
    Promise.all([
      getCentroCusto(),
      getStatusByOrigem(OrigemStatus.Venda),
      getMetodoPagamento(),
    ]).then(([centrosCusto, status, metodosPagamento]) => {
      setSaleFormInfos(centrosCusto, status, metodosPagamento);
    });
  };

  const setSaleFormInfos = async (
    centrosCusto,
    status,
    metodosPagamento
  ) => {
    const centroCustoTypeOptions = centrosCusto.items.map(
      ({ id_centro_custo_cco, des_centro_custo_cco }) => {
        return {
          value: id_centro_custo_cco,
          label: des_centro_custo_cco,
        };
      }
    );
    const statusOption = status.map(({ id_status_sts, des_status_sts }) => {
      return {
        value: id_status_sts,
        label: des_status_sts,
      };
    });

    if (isEditing) {
      const materiais = await getSaleProducts(saleEditing.id_venda_vda);
      setMateriaisOriginais(materiais);
      form.materiais = materiais
        .map((item) => {
          return {
            id: item.id,
            id_material_rvm: item.id_material_rvm,
            des_material_mte: item.des_material_mte,
            des_reduz_unidade_und: item.des_reduz_unidade_und,
            vlr_material_rvm:
              item.vlr_material_mte ?? item.vlr_unit_material_rvm,
            qtd_material_rvm: item.qtd_material_rvm,
          };
        })
        .map((item) => {
          return {
            value: { id: item.id, id_material_rvm: item.id_material_rvm },
            label: `${item.des_material_mte} - ${item.des_reduz_unidade_und}`,
            custom: [
              {
                prefixDefault: item.des_reduz_unidade_und,
                label: "Quantidade",
                column: "qtd_material_rsm",
                value: item.qtd_material_rvm,
                type: "number",
              },
              {
                label: "Valor Unitário",
                column: "vlr_unit_material_rvm",
                value: item.vlr_material_rvm,
                type: "number",
                mask: "currency",
              },
            ],
          };
        });
      setForm(form);
    }

    const estoquesOptions = [];

    const metodosPagamentoOptions = metodosPagamento.items.map(
      ({ id_metodo_pagamento_tmp, desc_metodo_pagamento_tmp }) => {
        return {
          value: id_metodo_pagamento_tmp,
          label: desc_metodo_pagamento_tmp,
        };
      }
    );

    setFormData({
      employees: [],
      materiais: [],
      clientes: [],
      centroCusto: centroCustoTypeOptions,
      status: statusOption,
      estoques: estoquesOptions,
      metodosPagamento: metodosPagamentoOptions,
    });
  };

  const handleChangeValue = (event) => {
    if (!event.target) {
      return;
    }
    const eventName = event.target.name ?? event.target;
    let eventValue = event.target.value ?? null;
    inputData[eventName] = eventValue;
    if (eventName == "materiais" && !isEditing) {
      inputData[eventName] = eventValue.map((material) => {
        return {
          id_material_rvm: material.value.id_material_rvm,
          qtd_material_rvm: material.custom[0].value,
          vlr_unit_material_rvm: parseInt(material.custom[1].value),
        };
      });
    }

    if (eventName == "materiais" && isEditing) {
      const materiaisSelecionados = eventValue.map((material) => {
        return {
          id: material.value.id,
          id_material_rvm: material.value.id_material_rvm,
          id_material_mte: material.value.id_material_mte,
          qtd_material_rvm: material.custom[0].value,
          vlr_unit_material_rvm: parseInt(material.custom[1].value),
        };
      });
      const materiaisInserir = materiaisSelecionados.filter((l) => !l.id);
      const materiaisAtualizar = materiaisSelecionados
        .filter((material) => material.id)
        .map((material) => {
          return {
            id: material.id,
            id_material_rvm: material.id_material_rvm,
            qtd_material_rvm: Number(material.qtd_material_rvm),
            vlr_unit_material_rvm: material.vlr_unit_material_rvm,
          };
        });
      const idsMateriaisSelecionados = materiaisSelecionados
        .filter((material) => material.id)
        .map((material) => material.id);
      const materiaisExcluir = materiaisOriginais.filter(
        (materialOriginal) =>
          !idsMateriaisSelecionados.includes(materialOriginal.id)
      );
      inputData.idsMateriaisExcluir = materiaisExcluir.map(
        (material) => material.id
      );
      inputData.materiaisAtualizar = materiaisAtualizar;
      inputData.materiaisInserir = materiaisInserir;
    }

    if (eventName == "id_centro_custo_vda") {
      Promise.all([
        getMaterial(true, eventValue),
        getEmployee(eventValue),
        getCliente(eventValue),
        getEstoque("", 0, 999, eventValue),
      ]).then(([materiais, employees, clientes, estoques]) => {
        const funcionarioTypeOptions = employees.items.map(
          ({ id_funcionario_tfu, desc_funcionario_tfu }) => {
            return {
              value: id_funcionario_tfu,
              label: desc_funcionario_tfu,
            };
          }
        );
        const clienteOptions = clientes.items.map(
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
        const estoqueOptions = estoques.items.map(
          ({ id_estoque_est, des_estoque_est }) => {
            return {
              value: id_estoque_est,
              label: des_estoque_est,
            };
          }
        );

        const materialOptions = materiais
        .map((item) => {
          return {
            id_material_rvm: item.id_material_mte,
            des_material_mte: item.des_material_mte,
            des_reduz_unidade_und: item.des_reduz_unidade_und,
            vlr_material_mte:
              item.vlr_material_mte ?? item.vlr_unit_material_mte,
          };
        })
        .map((item) => {
          return {
            value: { id_material_rvm: item.id_material_rvm },
            label: `${item.des_material_mte} - ${item.des_reduz_unidade_und}`,
            custom: [
              {
                prefixDefault: item.des_reduz_unidade_und,
                label: "Quantidade",
                column: "qtd_material_rvm",
                value: 1,
                type: "number",
              },
              {
                label: "Valor Unitário",
                column: "vlr_unit_material_rvm",
                value: item.vlr_material_mte,
                type: "number",
                mask: "currency",
              },
            ],
          };
        });

        setFormData((form) => ({
          ...form,
          employees: funcionarioTypeOptions,
          materiais: materialOptions,
          clientes: clienteOptions,
          estoques: estoqueOptions,
        }));
      });
    }
    setFormChanged(!formChanged);
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      if (!isEditing) {
        await api.post("/venda", inputData);
      } else {
        await api.put(`/venda/${inputData.id_venda_vda}`, inputData);
      }
      setLoadingSubmit(false);
      setInputData({});
      onClose();
    } catch (e) {
      setLoadingSubmit(false);
      toast.error(e.response.data.message);
    }
  };

  function handleClienteCriado(novoCliente) {
    setModalCreateClientOpen(false);
    if (!novoCliente) {
      return;
    }
    setFormData((currentForm) => {
      const formData = currentForm;

      formData.clientes = [
        {
          value: novoCliente.id,
          label: `${novoCliente.des_cliente_cli} - ${
            !novoCliente.telefone_cliente_cli
              ? novoCliente.documento_cliente_cli
              : novoCliente.telefone_cliente_cli
          }`,
        },
      ];

      return formData;
    });

    inputData.id_cliente_vda = novoCliente.id;
  }

  return (
    <Modal
      title={form ? "Edição" : "Cadastro"}
      onClose={onClose}
      visible={visible}
    >
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_vda ?? []}
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
          defaultValue={form?.id_funcionario_vda ?? []}
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
          defaultValue={form?.id_cliente_vda ?? []}
          name="id_cliente_vda"
          onChange={handleChangeValue}
          error={""}
          limit={1}
          setDefaultValue={true}
        />
        {!inputData?.id_cliente_vda && (
          <ButtonSubmit handleSubmit={() => setModalCreateClientOpen(true)}>
            Novo Cliente
          </ButtonSubmit>
        )}
      </FormGroup>

      <FormGroup>
        <label>Estoque</label>
        <SelectBox
          options={formData.estoques ?? []}
          defaultValue={form?.estoques ?? []}
          name="id_estoque_est"
          onChange={handleChangeValue}
          limit={1}
          error={""}
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
        <label>Status</label>
        <SelectBox
          options={formData.status ?? []}
          defaultValue={form?.id_status_vda ?? []}
          name="id_status_vda"
          onChange={handleChangeValue}
          error={""}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Método de pagamento</label>
        <SelectBox
          options={formData.metodosPagamento ?? []}
          defaultValue={form?.id_metodo_pagamento_vda ?? []}
          name="id_metodo_pagamento_vda"
          onChange={handleChangeValue}
          error={""}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Observação</label>
        <Input
          type={"text"}
          defaultValue={form?.desc_venda_vda ?? ""}
          name="desc_venda_vda"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>
      {modalCreateClientOpen && (
        <ClienteForm
          onClose={() => {
            setModalCreateClientOpen(false);
          }}
          visible={modalCreateClientOpen}
          refresh={function () {}}
          callback={handleClienteCriado}
        />
      )}
      <Expand>
        <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>
          Salvar
        </ButtonSubmit>
      </Expand>
    </Modal>
  );
}
