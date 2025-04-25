import { useEffect, useState } from "react";
import yup from "../../../utils/yup";



import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/Buttons/ButtonSubmit";
import SelectBox from "../../../components/Select";
import { getCentroCusto } from "../../../services/centroCusto";
import { getCliente } from "../../../services/cliente";
import { getEmployee } from "../../../services/employee";
import { getMaterial } from "../../../services/material";
import { saveServices } from "../../../services/service";
import { getServiceType } from "../../../services/serviceType";
import { Expand, FormGroup } from "./style";

const schema = yup.object().shape({
  id_cliente_ser: yup.number().required().positive().integer(),
  id_funcionario_servico_ser: yup.number().required().positive().integer(),
  id_centro_custo_ser: yup.number().required().positive().integer()
});


export default function PagarForm({ service, onClose, visible }) {

  const [form, setForm] = useState(service ?? {});
  const [formData, setFormData] = useState(service ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  console.log(formData);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([getEmployee(), getCentroCusto()])
          .then(([employees, centroCusto]) => {
            const funcionarioTypeOptions = employees.items.map(({ id_funcionario_tfu, desc_funcionario_tfu }) => {
              return ({
                value: id_funcionario_tfu,
                label: desc_funcionario_tfu
              });
            })

            const centroCustoTypeOptions = centroCusto.items.map(({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
              });
            })
            setFormData({ employees: funcionarioTypeOptions, centroCusto: centroCustoTypeOptions })
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
    setForm(prev => ({ ...prev, [inputName]: value }))
  }

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    let objError = {};
    setTimeout(async () => {
      try {
        await schema.validate(form);
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
          const regVlr = parseInt(reg.custom[0].value); // [0]
          return {
            id_servico_tipo_stp: reg.value,
            vlr_tipo_servico_rst: regVlr ?? 0
          };
        })

        const response = await saveServices(formData);
        if (!response.error) {
          console.log(response?.data, response?.data?.id)
          if (response?.data?.service?.id ?? false) {
            setForm(prev => ({ ...prev, id_servico_ser: response.data.service.id }));
          }
          toast.success("Serviço salvo!");
          onClose();
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
          <label>Valor</label>
          <Input
            type={'number'}
            defaultValue={form?.vlr_servico_tipo_stp ?? ''}
            name='vlr_servico_tipo_stp'
            onChange={handleChangeValue}
            error={error?.vlr_servico_tipo_stp ?? false}
          />
      </FormGroup>

      <Expand>
        <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>Salvar</ButtonSubmit>
      </Expand>
    </Modal>
  )
}