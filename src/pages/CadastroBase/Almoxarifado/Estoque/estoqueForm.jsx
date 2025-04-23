import { useEffect, useState } from "react";
import yup from "../../../../utils/yup";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { getCentroCusto } from "../../../../services/centroCusto";
import { saveEstoque } from "../../../../services/estoque";
import { FormGroup } from "./style";
import SelectBox from "../../../../components/Select";

const schema = yup.object().shape({
  des_estoque_est: yup.string().min(1).required(),
  id_centro_custo_est: yup.number().required().positive().integer(),
});


export default function EstoqueForm({ estoque, onClose, visible,refresh }) {

  const [form, setForm] = useState(estoque ?? {});
  const [error, setError] = useState({});
  const [formData, setFormData] = useState(estoque ?? {});
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
        const success = await saveEstoque(form);

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
    <Modal title={form.id_estoque_est ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={'text'}
          defaultValue={form?.des_estoque_est ?? ''}
          name='des_estoque_est'
          onChange={handleChangeValue}
          error={error?.des_estoque_est ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_est ?? []}
          name='id_centro_custo_est'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_est ?? false}
          limit={1}
        />
      </FormGroup>

      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}