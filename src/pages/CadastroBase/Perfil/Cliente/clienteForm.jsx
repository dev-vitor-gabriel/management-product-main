import { useEffect,useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveCliente } from "../../../../services/cliente";
import { FormGroup } from "./style";
import { getOrigemCliente } from "../../../../services/origemCliente";
import SelectBox from "../../../../components/Select";
import { getCentroCusto } from "../../../../services/centroCusto";

const schema = yup.object().shape({
  des_cliente_cli: yup.string().min(1).required(),
  telefone_cliente_cli: yup.string().min(1).required(),
  email_cliente_cli: yup.string().nullable().email(),
  documento_cliente_cli: yup.string(),
  endereco_cliente_cli: yup.string(),
  id_centro_custo_cli: yup.number().required().positive(),
  id_origem_cliente_cli: yup.number().required().positive(),
});


export default function ClienteForm({ reg, onClose, visible, refresh, callback }) {

  const [form, setForm] = useState(reg ?? {});
  const [formData, setFormData] = useState(reg ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([getOrigemCliente(), getCentroCusto()])
          .then(([origemCliente, centroCusto]) => {
            const centroCustoTypeOptions = centroCusto.items.map(({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
              });
            })
            const origemClienteTypeOptions = origemCliente.items.map(({ id_origem_cliente_orc, desc_origem_cliente_orc }) => {
              return ({
                value: id_origem_cliente_orc,
                label: desc_origem_cliente_orc
              });
            });
            setFormData({ centroCusto: centroCustoTypeOptions, origemCliente: origemClienteTypeOptions })
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
    setTimeout(async () => {
      try {
        await schema.validate(form);
        const success = await saveCliente(form);
        if(success){
          await refresh();
          if(callback) {
            callback(success.data)
          }
          toast.success("Registro salvo!");
        } else {
          toast.error("Houve um erro ao salvar o registro!");
        }

        setError({});
      } catch (err) {
        console.log(err)
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
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_cli ?? []}
          name='id_centro_custo_cli'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_cli ?? false}
          limit={1}
        />
      </FormGroup>
      <FormGroup>
        <label>Origem do Cliente</label>
        <SelectBox
          options={formData?.origemCliente ?? []}
          defaultValue={form?.id_origem_cliente_cli ?? []}
          name='id_origem_cliente_cli'
          onChange={handleChangeValue}
          error={error?.id_origem_cliente_cli ?? false}
          limit={1}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}