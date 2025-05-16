import { useEffect, useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveServiceType } from "../../../../services/serviceType";
import { FormGroup } from "./style";
import { getCentroCusto } from "../../../../services/centroCusto";
import SelectBox from "../../../../components/Select";
import { formatCurrencyString, parseCurrencyToInt } from "../../../../utils/format";


const schema = yup.object().shape({
  vlr_servico_tipo_stp: yup.number().required().positive().integer(),
  des_servico_tipo_stp: yup.string().min(1).required(),
});


export default function TipoServiceForm({ reg, onClose, visible, refresh }) {

  const [form, setForm] = useState(reg ?? {});
  const [formData, setFormData] = useState(reg ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [tipoServicoValue, setTipoServicoValue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([getCentroCusto()])
          .then(([centroCusto]) => {
            const centroCustoTypeOptions = centroCusto.items.map(({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
              });
            })
            setFormData({ centroCusto: centroCustoTypeOptions })
          })
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };
    fetchData();
  }, [])

  const handleChangeValue = (event) => {
    if (event.target.name === ('vlr_servico_tipo_stp').replace(/\[|\]/g, '')) {
      setTipoServicoValue(formatCurrencyString(event.target.value));
    }
    const inputName = event.target.name.replace(/\[|\]/g, '');
    const value = inputName === ('vlr_servico_tipo_stp').replace(/\[|\]/g, '') ? parseCurrencyToInt(event.target.value) : event.target.value;
    setForm(prev => ({ ...prev, [inputName]: value }))
  }

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    setTimeout(async () => {
      try {
        await schema.validate(form);
        const success = await saveServiceType(form);
        if(success){
          await refresh();
          toast.success("Tipo de Serviço criado com sucesso!");
          onClose();
        } else {
          toast.error("Erro ao Cadastrar!");
        }

        setError({});
      } catch (err) {
        let objError = {};
        err.errors.forEach(e => {
          const [inputError, ...error] = e.split(' ');
          objError = { ...objError, [inputError]: error.join(' ') }
        });

        setError(objError);
      } finally {
        setLoadingSubmit(false);
      }
    }, 1000);
  }


  return (
    <Modal title={form.id_servico_tipo_stp ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={'text'}
          defaultValue={form?.des_servico_tipo_stp ?? ''}
          name='des_servico_tipo_stp'
          onChange={handleChangeValue}
          error={error?.des_servico_tipo_stp ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Valor</label>
        <Input
          placeholder="R$ 0,00"
          maxLength={16}
          value={tipoServicoValue ?? ''}
          name='vlr_servico_tipo_stp'
          onChange={handleChangeValue}
          error={error?.vlr_servico_tipo_stp ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_stp ?? []}
          name='id_centro_custo_stp'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_stp ?? false}
          limit={1}
        />
      </FormGroup>

        <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>Salvar</ButtonSubmit>
    </Modal>
  )
}