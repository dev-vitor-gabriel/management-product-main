import { useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveUsuario } from "../../../../services/usuario";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  name: yup.string().min(1).required(),
  email: yup.string().min(1).required(),
  password: yup.string().min(1).required(),
});


export default function UsuarioForm({ reg, onClose, visible, refresh }) {

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
        const success = await saveUsuario(form);
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
    <Modal title={form.id ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Nome</label>
        <Input
          type={'text'}
          defaultValue={form?.name ?? ''}
          name='name'
          onChange={handleChangeValue}
          error={error?.name ?? false}
        />
        <Input
          type={'email'}
          defaultValue={form?.email ?? ''}
          name='email'
          onChange={handleChangeValue}
          error={error?.email ?? false}
        />
        <Input
          type={'password'}
          defaultValue={form?.password ?? ''}
          name='password'
          onChange={handleChangeValue}
          error={error?.password ?? false}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}