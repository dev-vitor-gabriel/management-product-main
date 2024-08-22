import { useEffect, useState } from "react";
import yup from "../../../../utils/yup";


import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import SelectBox from "../../../../components/Select";
import { saveMaterial } from "../../../../services/material";
import { getUnidade } from "../../../../services/unidade";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  vlr_material_mte: yup.number().required().positive().integer(),
  des_material_mte: yup.string().min(5).required(),
});


export default function MaterialForm({ reg, onClose, visible, refresh }) {

  const [form, setForm] = useState(reg ?? {});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
          Promise.all([getUnidade()])
          .then(([unidade])=>{
            const unidadeOptions = unidade.map(({ id_unidade_und, des_unidade_und, des_reduz_unidade_und })=>{
              return ({
                value: id_unidade_und,
                label: `${des_reduz_unidade_und} - ${des_unidade_und}`
              });
            })
            setFormData({unidadeOptions})
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
        console.log(JSON.stringify(form));
        const success = await saveMaterial(form);
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
    <Modal title={form.id_material_und ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={'text'}
          defaultValue={form?.des_material_mte ?? ''}
          name='des_material_mte'
          onChange={handleChangeValue}
          error={error?.des_material_mte ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Valor</label>
        <Input
          type={'number'}
          defaultValue={form?.vlr_material_mte ?? ''}
          name='vlr_material_mte'
          onChange={handleChangeValue}
          error={error?.vlr_material_mte ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Unidade</label>
        <SelectBox
          options={formData.unidadeOptions ?? []}
          defaultValue={form?.id_unidade_mte ?? []}
          name='id_unidade_mte[]'
          onChange={handleChangeValue}
          error={error?.id_unidade_mte ?? false}
          limit={1}
        />
      </FormGroup>


      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}