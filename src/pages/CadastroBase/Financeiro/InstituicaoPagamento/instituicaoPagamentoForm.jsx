import { useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveInstituicaoPagamento } from "../../../../services/instituicaoPagamento";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  desc_instituicao_pagamento_tip: yup.string().min(1).required(),
});


export default function InstituicaoPagamentoForm({ reg, onClose, visible, refresh }) {

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
        const success = await saveInstituicaoPagamento(form);
        if(success){
          await refresh();
          toast.success("Registro salvo!");
        } else {

          toast.error("aaaa!");
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
    <Modal title={form.id_instituicao_pagamento_tip ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={'text'}
          defaultValue={form?.desc_instituicao_pagamento_tip ?? ''}
          name='desc_instituicao_pagamento_tip'
          onChange={handleChangeValue}
          error={error?.desc_instituicao_pagamento_tip ?? false}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}