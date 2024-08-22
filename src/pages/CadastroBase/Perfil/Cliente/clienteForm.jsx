import { useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveCliente } from "../../../../services/cliente";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  des_cliente_cli: yup.string().min(1).required(),
  telefone_cliente_cli: yup.string().min(1).required(),
  email_cliente_cli: yup.string().min(1).required(),
  documento_cliente_cli: yup.string().min(1),
  endereco_cliente_cli: yup.string().min(1),
});


export default function ClienteForm({ reg, onClose, visible, refresh }) {

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
        const success = await saveCliente(form);
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
    <Modal title={form.id_cliente_cli ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Nome</label>
        <Input
          type={'text'}
          defaultValue={form?.des_cliente_cli ?? ''}
          name='des_cliente_cli'
          onChange={handleChangeValue}
          error={error?.des_cliente_cli ?? false}
        />
        <label>Telefone</label>
        <Input
          type={'text'}
          defaultValue={form?.telefone_cliente_cli ?? ''}
          name='telefone_cliente_cli'
          onChange={handleChangeValue}
          error={error?.telefone_cliente_cli ?? false}
        />
        <label>Email</label>
        <Input
          type={'text'}
          defaultValue={form?.email_cliente_cli ?? ''}
          name='email_cliente_cli'
          onChange={handleChangeValue}
          error={error?.email_cliente_cli ?? false}
        />
        <label>Documento</label>
        <Input
          type={'text'}
          defaultValue={form?.documento_cliente_cli ?? ''}
          name='documento_cliente_cli'
          onChange={handleChangeValue}
          error={error?.documento_cliente_cli ?? false}
        />
        <label>Endereço</label>
        <Input
          type={'text'}
          defaultValue={form?.endereco_cliente_cli ?? ''}
          name='endereco_cliente_cli'
          onChange={handleChangeValue}
          error={error?.endereco_cliente_cli ?? false}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}