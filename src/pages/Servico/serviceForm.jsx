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
import { getMaterial } from "../../services/material";
import { saveServices } from "../../services/service";
import { getServiceType } from "../../services/serviceType";
import { Expand, FormGroup } from "./style";

const schema = yup.object().shape({
  id_cliente_ser: yup.number().required().positive().integer(),
  id_funcionario_servico_ser: yup.number().required().positive().integer(),
  id_centro_custo_ser: yup.number().required().positive().integer()
});


export default function ServiceForm({ service, onClose, visible }) {

  const [form, setForm] = useState(service ?? {});
  const [formData, setFormData] = useState(service ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([getEmployee(), getServiceType(), getMaterial(), getCliente(), getCentroCusto()])
          .then(([employees, servicesType, material, cliente, centroCusto]) => {
            const funcionarioTypeOptions = employees.map(({ id_funcionario_tfu, desc_funcionario_tfu }) => {
              return ({
                value: id_funcionario_tfu,
                label: desc_funcionario_tfu
              });
            })
            const serviceTypeOptions = servicesType.map(({ id_servico_tipo_stp, des_servico_tipo_stp, vlr_servico_tipo_stp }) => {
              return ({
                value: id_servico_tipo_stp,
                label: des_servico_tipo_stp,
                custom: [{
                  label: 'Valor',
                  column: 'vlr_servico_tipo_stp',
                  value: vlr_servico_tipo_stp,
                  type: 'number',
                  mask: 'currency'
                }]
              });
            })

            const materialOptions = material.map(({ id_material_mte, des_material_mte, des_reduz_unidade_und, vlr_material_mte }) => {
              return ({
                value: id_material_mte,
                label: `${des_material_mte} - ${des_reduz_unidade_und}`,
                custom: [{
                  prefixDefault: des_reduz_unidade_und,
                  label: 'Quantidade',
                  column: 'qtd_material_rsm',
                  value: 1,
                  type: 'number'
                },
                {
                  label: 'Valor Unitário',
                  column: 'vlr_material_mte',
                  value: vlr_material_mte,
                  type: 'number',
                  mask: 'currency'
                }]
              });
            })
            const clienteOptions = cliente.map(({ id_cliente_cli, des_cliente_cli, documento_cliente_cli, telefone_cliente_cli }) => {
              return ({
                value: id_cliente_cli,
                label: `${des_cliente_cli} - ${telefone_cliente_cli == '' ? documento_cliente_cli : telefone_cliente_cli}`
              });
            });
            const centroCustoTypeOptions = centroCusto.map(({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
              });
            })
            setFormData({ employees: funcionarioTypeOptions, servicesType: serviceTypeOptions, materiais: materialOptions, clientes: clienteOptions, centroCusto: centroCustoTypeOptions })
          })
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };
    fetchData();
  }, [])

  const handleChangeValue = (event) => {
    const inputName = event.target.name.replace(/\[|\]/g, '');
    const value = event.target.value;
    // console.log(value, inputName)
    setForm(prev => ({ ...prev, [inputName]: value }))
  }

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    let objError = {};
    setTimeout(async () => {
      try {
        await schema.validate(form);
        // console.log(form);
        const formFactory = {
          txt_servico_ser: '.',
          id_funcionario_servico_ser: null,
          id_centro_custo_ser: null,
          id_cliente_ser: null,
          materiais: [],
          tipos_servico: []
        }
        const formData = { ...formFactory, ...form }
        formData.materiais = formData.materiais.map(reg => {
          const regQtd = reg.custom.filter(({ column }) => column == "qtd_material_rsm");
          const regVlr = reg.custom.filter(({ column }) => ["vlr_material_mte","vlr_material_rsm"].includes(column));

          return {
            id_material_mte: reg.value,
            vlr_material_rsm: parseInt(regVlr?.[0].value) ?? 0,
            qtd_material_rsm: parseInt(regQtd?.[0].value) ?? 1
          }
        });

        formData.tipos_servico = formData.tipos_servico.map(reg => {
          // console.log(reg)
          // console.log('reg',reg)
          const regVlr = parseInt(reg.custom[0].value); // [0]
          // console.log('formData.materiais', regVlr)
          return {
            id_servico_tipo_stp: reg.value,
            vlr_tipo_servico_rst: regVlr ?? 0
          };
        })


        // console.log('formData',formData,JSON.stringify(formData));

        const response = await saveServices(formData);
        // console.log('submitting', response)
        if (!response.error) {
          console.log(response?.data, response?.data?.id)
          if (response?.data?.service?.id ?? false) {
            setForm(prev => ({ ...prev, id_servico_ser: response.data.service.id }));
          }
          toast.success("Serviço salvo!");
        } else {
          toast.error(response?.message?.message ?? response.error);
        }

      } catch (err) {
        if (err?.errors) {
          err.errors.forEach(e => {
            const [inputError, ...error] = e.split(' ');
            objError = { ...objError, [inputError]: error.join(' ') }
          });
        } else {
          console.log(err)
        }
      } finally {
        setError(objError);
        setLoadingSubmit(false);
      }
    }, 1000);
  }


  return (
    <Modal title={form.id_servico_ser ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_ser ?? []}
          name='id_centro_custo_ser'
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
          name='id_funcionario_servico_ser'
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
          name='id_cliente_ser'
          onChange={handleChangeValue}
          error={error?.id_cliente_ser ?? false}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Observação</label>
        <Input
          type={'text'}
          defaultValue={form?.txt_servico_ser ?? ''}
          name='txt_servico_ser'
          onChange={handleChangeValue}
          error={error?.txt_servico_ser ?? false}
        />
      </FormGroup>


      <FormGroup>
        <label>Serviços</label>
        <SelectBox
          options={formData.servicesType ?? []}
          defaultValue={form?.tipos_servico ?? []}
          name='tipos_servico[]'
          onChange={handleChangeValue}
          error={error?.tipo_servico ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Materiais</label>
        <SelectBox
          options={formData.materiais ?? []}
          defaultValue={form?.materiais ?? []}
          name='materiais[]'
          onChange={handleChangeValue}
          error={error?.materiais ?? false}
        />
      </FormGroup>

      <Expand>
        <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
      </Expand>
    </Modal>
  )
}