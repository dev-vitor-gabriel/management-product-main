import { useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveUnidade } from "../../../../services/unidade";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  des_reduz_unidade_und: yup.string().min(1).required(),
  des_unidade_und: yup.string().min(1).required(),
});


export default function UnidadeForm({ reg, onClose, visible, refresh }) {

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
        const success = await saveUnidade(form);
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
    <Modal title={form.id_unidade_und ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={'text'}
          defaultValue={form?.des_unidade_und ?? ''}
          name='des_unidade_und'
          onChange={handleChangeValue}
          error={error?.des_unidade_und ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Descrição Reduzida</label>
        <Input
          type={'text'}
          defaultValue={form?.des_reduz_unidade_und ?? ''}
          name='des_reduz_unidade_und'
          onChange={handleChangeValue}
          error={error?.des_reduz_unidade_und ?? false}
        />
      </FormGroup>


      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}