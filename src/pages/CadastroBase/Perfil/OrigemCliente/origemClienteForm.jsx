import { useState } from "react";
import yup from "../../../../utils/yup";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  nome_origem_cliente: yup.string().min(1).required(),
  descricao_origem_cliente: yup.string().min(1).required(),
});

export default function OrigemClienteForm({ reg, onClose, visible, refresh }) {
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
        // const success = await saveCliente(form);
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
    <Modal title={form.id_origem_cliente ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Nome</label>
        <Input
          type={'text'}
          defaultValue={form?.nome_origem_cliente ?? ''}
          name='nome_origem_cliente'
          onChange={handleChangeValue}
          error={error?.nome_origem_cliente ?? false}
        />
        <label>Descrição</label>
        <Input
          type={'text'}
          defaultValue={form?.descricao_origem_cliente ?? ''}
          name='descricao_origem_cliente'
          onChange={handleChangeValue}
          error={error?.descricao_origem_cliente ?? false}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>Salvar</ButtonSubmit>
    </Modal>
  )
}