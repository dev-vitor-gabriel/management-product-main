import { useEffect, useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";
import { formatCPFandCNPJ, removeNonNumeric, formatPhoneNumber } from "../../../../utils/format";
import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { FormGroup } from "./style";
import { saveFuncionario } from "../../../../services/funcionario";
import { getCargo } from "../../../../services/cargo";
import SelectBox from "../../../../components/Select";
import { getCentroCusto } from "../../../../services/centroCusto";

const schema = yup.object().shape({
  desc_funcionario_tfu: yup.string().min(1).required(),
  telefone_funcionario_tfu: yup.string().min(1).required(),
  documento_funcionario_tfu: yup.string().min(1).required(),
  endereco_funcionario_tfu: yup.string().min(1).required(),
});

export default function FuncionarioForm({ reg, onClose, visible, refresh }) {

  const [form, setForm] = useState(reg ?? {});
  const [docValue, setDocValue] = useState();
  const [numberValue, setNumberValue] = useState();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
          Promise.all([getCargo(), getCentroCusto()])
          .then(([cargo, centroCusto])=>{
            const cargoOptions = cargo.map(({ id_cargo_tcg, desc_cargo_tcg })=>{
              return ({
                value: id_cargo_tcg,
                label: desc_cargo_tcg
              });
            })
            const centroCustoOptions = centroCusto.items.map(({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
              });
            })
            setFormData({cargoOptions, centroCustoOptions})
          })
      } catch (error) {
          console.error("Erro ao buscar:", error);
      }
    };
    fetchData();
  }, [])


  const handleChangeValue = (event) => {
    if (event.target.name === ('documento_funcionario_tfu').replace(/\[|\]/g)) {
      setDocValue(formatCPFandCNPJ(event.target.value));
    } else if (event.target.name === ('telefone_funcionario_tfu').replace(/\[|\]/g)) {
      setNumberValue(formatPhoneNumber(event.target.value));
    }
    const inputName = event.target.name.replace(/\[|\]/g, '');
    const value = (inputName === ('documento_funcionario_tfu').replace(/\[|\]/g) || inputName === ('telefone_funcionario_tfu').replace(/\[|\]/g)) 
      ? removeNonNumeric(event.target.value) 
      : event.target.value;
    setForm(prev => ({ ...prev, [inputName]: value }))
  }

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    setTimeout(async () => {
      try {
        await schema.validate(form);
        const success = await saveFuncionario(form);
        if(success){
          await refresh();
          toast.success("Registro salvo!");
        } else {

          toast.error("Erro ao cadastrar!");
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

console.log('form', form, docValue )
  return (
    <Modal title={form.id_funcionario_tfu ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Cargo</label>
        <SelectBox
          options={formData.cargoOptions ?? []}
          defaultValue={form?.id_funcionario_cargo_tfu ?? []}
          name='id_funcionario_cargo_tfu[]'
          onChange={handleChangeValue}
          error={error?.id_funcionario_cargo_tfu ?? false}
          limit={1}
        />
      </FormGroup>
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData.centroCustoOptions ?? []}
          defaultValue={form?.id_centro_custo_tfu ?? []}
          name='id_centro_custo_tfu[]'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_tfu ?? false}
          limit={1}
        />
      </FormGroup>
      <FormGroup>
        <label>Nome Funcionário</label>
        <Input
          type={'text'}
          defaultValue={form?.desc_funcionario_tfu ?? ''}
          name='desc_funcionario_tfu'
          onChange={handleChangeValue}
          error={error?.desc_funcionario_tfu ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Telefone</label>
        <Input
          type={'text'}
          defaultValue={form?.telefone_funcionario_tfu ?? ''}
          value={numberValue ?? ''}
          maxLength={15}
          placeholder="(00) 00000-0000"
          name='telefone_funcionario_tfu'
          onChange={handleChangeValue}
          error={error?.telefone_funcionario_tfu ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>CPF/CNPJ</label>
        <Input
          type={'text'}
          maxLength={14}
          placeholder="000.000.000-00"
          value={docValue ?? ''}
          defaultValue={form?.documento_funcionario_tfu ?? ''}
          name='documento_funcionario_tfu'
          onChange={handleChangeValue}
          error={error?.documento_funcionario_tfu ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Endereço</label>
        <Input
          type={'text'}
          defaultValue={form?.endereco_funcionario_tfu ?? ''}
          name='endereco_funcionario_tfu'
          onChange={handleChangeValue}
          error={error?.endereco_funcionario_tfu ?? false}
        />
      </FormGroup>
      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}