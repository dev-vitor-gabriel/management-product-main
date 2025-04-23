import { useEffect, useState } from "react";
import yup from "../../../../utils/yup";
import SelectBox from "../../../../components/Select";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { saveUnidade } from "../../../../services/unidade";
import { FormGroup } from "./style";
import { getCentroCusto } from "../../../../services/centroCusto";


const schema = yup.object().shape({
  des_reduz_unidade_und: yup.string().min(1).required(),
  des_unidade_und: yup.string().min(1).required(),
  id_centro_custo_und: yup.number().required().positive(),
});


export default function UnidadeForm({ reg, onClose, visible, refresh }) {

  const [form, setForm] = useState(reg ?? {});
  const [error, setError] = useState({});
  const [formData, setFormData] = useState(reg ?? {});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const centroCusto = await getCentroCusto();
            const centroCustoTypeOptions = centroCusto.items.map(({ id_centro_custo_cco, des_centro_custo_cco }) => ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
            }));
            setFormData({ centroCusto: centroCustoTypeOptions });
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };
    fetchData();
  }, []);

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
        const success = await saveUnidade(form);
        if(success){
          await refresh();
          toast.success("Registro salvo!");
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
      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_est ?? []}
          name='id_centro_custo_und'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_und ?? false}
          limit={1}
        />
      </FormGroup>


      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}