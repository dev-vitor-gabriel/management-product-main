import { useEffect, useState } from "react";
import yup from "../../utils/yup";

import Input from "../../components/Input";
import Modal from "../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../components/Buttons/ButtonSubmit";
import SelectBox from "../../components/Select";
import { getCentroCusto } from "../../services/centroCusto";
import { getCliente } from "../../services/cliente";
import { getEmployee } from "../../services/employee";
import { saveServices } from "../../services/service";
import { getServiceType } from "../../services/serviceType";
import ClienteForm from "../CadastroBase/Perfil/Cliente/clienteForm";
import { Expand, FormGroup } from "./style";
import { getMetodoPagamento } from "../../services/metodoPagamento";

const schema = yup.object().shape({
  id_cliente_ser: yup.number().required().positive().integer(),
  id_funcionario_servico_ser: yup.number().required().positive().integer(),
  id_centro_custo_ser: yup.number().required().positive().integer(),
});

export default function ServiceForm({ service, onClose, visible }) {
  const [form, setForm] = useState(service ?? {});
  const [formData, setFormData] = useState(service ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [modalCreateClientOpen, setModalCreateClientOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([
          getCentroCusto(),
          getMetodoPagamento(),
        ]).then(([centroCusto, metodosPagamento]) => {
          const centroCustoTypeOptions = centroCusto.items.map(
            ({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return {
                value: id_centro_custo_cco,
                label: des_centro_custo_cco,
              };
            }
          );
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
            servicesType: [],
            clientes: [],
            centroCusto: centroCustoTypeOptions,
            metodosPagamento: metodosPagamentoOptions,
          });
        });
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };
    fetchData();
  }, []);

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
  }

  const handleChangeValue = (event) => {
    const inputName = (event.target.name ?? event.target).replace(/\[|\]/g, "");
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [inputName]: value }));

    if (event.target.name === "id_centro_custo_ser") {
          Promise.all([getServiceType(value), getEmployee(value), getCliente(value)]).then(
        ([servicesType, employees, clientes]) => {
          const serviceTypeOptions = servicesType.map(
            ({
              id_servico_tipo_stp,
              des_servico_tipo_stp,
              vlr_servico_tipo_stp,
            }) => {
              return {
                value: id_servico_tipo_stp,
                label: des_servico_tipo_stp,
                custom: [
                  {
                    label: "Valor",
                    column: "vlr_servico_tipo_stp",
                    value: vlr_servico_tipo_stp,
                    type: "number",
                    mask: "currency",
                  },
                ],
              };
            }
          );
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
          setFormData(form => ({
            ...form,
            servicesType: serviceTypeOptions,
            employees: funcionarioTypeOptions,
            clientes: clienteOptions,
          }))
        }
      );
    }
  };

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    let objError = {};
    setTimeout(async () => {
      try {
        await schema.validate(form);
        const formFactory = {
          txt_servico_ser: ".",
          id_funcionario_servico_ser: null,
          id_centro_custo_ser: null,
          id_cliente_ser: null,
          materiais: [],
          tipos_servico: [],
        };
        const formData = { ...formFactory, ...form };

        formData.tipos_servico = formData.tipos_servico.map((reg) => {
          const regVlr = parseInt(reg.custom[0].value); // [0]
          return {
            id_servico_tipo_stp: reg.value,
            vlr_tipo_servico_rst: regVlr ?? 0,
          };
        });

        const response = await saveServices(formData);
        if (!response.error) {
          if (response?.data?.service?.id ?? false) {
            setForm((prev) => ({
              ...prev,
              id_servico_ser: response.data.service.id,
            }));
          }
          toast.success("Serviço salvo!");
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
      } finally {
        setError(objError);
        setLoadingSubmit(false);
      }
    }, 1000);
  };

  return (
    <Modal
      title={form.id_servico_ser ? "Edição" : "Cadastro"}
      onClose={onClose}
      visible={visible}
    >
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_ser ?? []}
          name="id_centro_custo_ser"
          onChange={handleChangeValue}
          error={error?.id_centro_custo_ser ?? false}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Funcionário</label>
        <SelectBox
          options={formData?.employees ?? []}
          defaultValue={form?.id_funcionario_servico_ser ?? []}
          name="id_funcionario_servico_ser"
          onChange={handleChangeValue}
          error={error?.id_funcionario_servico_ser ?? false}
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
          error={error?.id_cliente_ser ?? false}
          limit={1}
        />
        {!formData?.id_cliente_ser && (
          <ButtonSubmit handleSubmit={() => setModalCreateClientOpen(true)}>
            Novo Cliente
          </ButtonSubmit>
        )}
      </FormGroup>

      <FormGroup>
        <label>Método de pagamento</label>
        <SelectBox
          options={formData.metodosPagamento ?? []}
          defaultValue={form?.id_metodo_pagamento_vda ?? []}
          name="id_metodo_pagamento_ser"
          onChange={handleChangeValue}
          error={""}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Observação</label>
        <Input
          type={"text"}
          defaultValue={form?.txt_servico_ser ?? ""}
          name="txt_servico_ser"
          onChange={handleChangeValue}
          error={error?.txt_servico_ser ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Serviços</label>
        <SelectBox
          options={formData.servicesType ?? []}
          defaultValue={form?.tipos_servico ?? []}
          name="tipos_servico[]"
          onChange={handleChangeValue}
          error={error?.tipo_servico ?? false}
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
