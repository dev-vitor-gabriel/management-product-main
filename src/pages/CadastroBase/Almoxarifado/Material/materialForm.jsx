import { useEffect, useState } from "react";
import yup from "../../../../utils/yup"; 
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { formatCurrencyString, parseCurrencyToInt } from "../../../../utils/format";
import SelectBox from "../../../../components/Select";
import { saveMaterial } from "../../../../services/material";
import { getUnidade } from "../../../../services/unidade";
import { FormGroup } from "./style";
import { getCentroCusto } from "../../../../services/centroCusto";

const schema = yup.object().shape({
  vlr_material_mte: yup.number().required().positive().integer(),
  des_material_mte: yup.string().min(5).required(),
});


export default function MaterialForm({ reg, onClose, visible, refresh }) {

  const [form, setForm] = useState(reg ?? {});
  const [materialValue, setMaterialValue] = useState();
  const [formData, setFormData] = useState(reg ??{});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unidade, centroCusto] = await Promise.all([getUnidade(), getCentroCusto()]);

        const unidadeOptions = unidade.map(({ id_unidade_und, des_unidade_und, des_reduz_unidade_und }) => ({
          value: id_unidade_und,
          label: `${des_reduz_unidade_und} - ${des_unidade_und}`
        }));

        const centroCustoOptions = centroCusto.items.map(({ id_centro_custo_cco, des_centro_custo_cco }) => ({
          value: id_centro_custo_cco,
          label: des_centro_custo_cco
        }));

        // Atualiza o estado
        setFormData({ unidades: unidadeOptions, centroCusto: centroCustoOptions });
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeValue = (event) => {
    if (event.target.name === ('vlr_material_mte').replace(/\[|\]/g, '')) {
      setMaterialValue(formatCurrencyString(event.target.value));
    }
    const inputName = event.target.name.replace(/\[|\]/g, '');
    const value = inputName === ('vlr_material_mte').replace(/\[|\]/g, '') ? parseCurrencyToInt(event.target.value) : event.target.value;
    setForm(prev => ({ ...prev, [inputName]: value }))
  }

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    setTimeout(async () => {
      try {
        await schema.validate(form);
        const success = await saveMaterial(form);
        if(success){
          await refresh();
          toast.success("Registro salvo!");
          onClose(); // Fecha a modal
        } else {
          toast.error("Ocorreu um erro ao salvar o registro!");
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
console.log('form', form)
  return (
    <Modal title={form.id_material_mte ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={'text'}
          value={form?.des_material_mte ?? ''}
          name='des_material_mte'
          onChange={handleChangeValue}
          error={error?.des_material_mte ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Valor</label>
        <Input
          placeholder="R$ 0,00"
          maxLength={16}
          value={materialValue ?? ''}
          name='vlr_material_mte'
          onChange={handleChangeValue}
          error={error?.vlr_material_mte ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Unidade</label>
        <SelectBox
          options={formData.unidades ?? []}
          defaultValue={form?.id_unidade_mte ?? []}
          name='id_unidade_mte[]'
          onChange={handleChangeValue}
          error={error?.id_unidade_mte ?? false}
          limit={1}
        />
      </FormGroup>
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_mte ?? []}
          name='id_centro_custo_mte[]'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_mte ?? false}
          limit={1}
        />
      </FormGroup>

      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}