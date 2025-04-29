import { useState } from "react";
import yup from "../../../../utils/yup";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { FormGroup } from "./style";
import { saveOrigemCliente } from "../../../../services/origemCliente";


const schema = yup.object().shape({
  desc_origem_cliente_orc: yup.string().min(1).required(),
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
        const success = await saveOrigemCliente(form);
        if(success){
          await refresh();
          toast.success("Registro salvo!");
        } else {
          toast.error("Houve um erro ao salvar o registro!");
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
        <label>Descrição</label>
        <Input
          type={'text'}
          defaultValue={form?.desc_origem_cliente_orc ?? ''}
          name='desc_origem_cliente_orc'
          onChange={handleChangeValue}
          error={error?.desc_origem_cliente_orc ?? false}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>Salvar</ButtonSubmit>
    </Modal>
  )
}