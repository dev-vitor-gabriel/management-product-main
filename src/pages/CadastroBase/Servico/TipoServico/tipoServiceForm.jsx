import { useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveServiceType } from "../../../../services/serviceType";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  vlr_servico_tipo_stp: yup.number().required().positive().integer(),
  des_servico_tipo_stp: yup.string().min(1).required(),
});


export default function TipoServiceForm({ reg, onClose, visible, refresh }) {

  const [form, setForm] = useState(reg ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);



  const handleChangeValue = (event) => {
    const inputName = event.target.name.replace(/\[|\]/g, '');
    const value = event.target.value;
    setForm(prev => ({ ...prev, [inputName]: value }))
  }

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    setTimeout(async () => {
      try {
        await schema.validate(form);
        console.log(JSON.stringify(form));
        const success = await saveServiceType(form);
        if(success){
          await refresh();
          toast.success("Serviço salvo!");
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
          type={'number'}
          defaultValue={form?.vlr_servico_tipo_stp ?? ''}
          name='vlr_servico_tipo_stp'
          onChange={handleChangeValue}
          error={error?.vlr_servico_tipo_stp ?? false}
        />
      </FormGroup>

      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}