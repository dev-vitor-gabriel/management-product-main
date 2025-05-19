import { useEffect, useState } from "react";
import yup from "../../../utils/yup";



import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/Buttons/ButtonSubmit";
import SelectBox from "../../../components/Select";
import { getCentroCusto } from "../../../services/centroCusto";
import { saveFinanceiro } from "../../../services/financeiro";
import { Expand, FormGroup } from "./style";
import { formatCurrencyString, parseCurrencyToInt } from "../../../utils/format";
import { getMetodoPagamento } from "../../../services/metodoPagamento";

const schema = yup.object().shape({
  tipo_transacao_fin: yup.number().required().integer(),
  id_centro_custo_fin: yup.number().required().positive().integer(),
  tipo_referencia_fin: yup.number().required().integer(),
  vlr_financeiro_fin: yup.number().required().positive().integer(),
});

export default function PagarForm({ financeiro, onClose, visible, refresh }) {

  const [form, setForm] = useState(financeiro ?? {});
  const [formData, setFormData] = useState(financeiro ?? {});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [financeiroValue, setFinanceiroValue] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([getCentroCusto(), getMetodoPagamento()])
          .then(([centroCusto, metodoPagamento]) => {
            const centroCustoTypeOptions = centroCusto.items.map(({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
              });
            });
            const metodoPagamentoOptions = metodoPagamento.items.map(({ id_metodo_pagamento_tmp, desc_metodo_pagamento_tmp }) => {
              return ({
                value: id_metodo_pagamento_tmp,
                label: desc_metodo_pagamento_tmp
              });
            })
            setFormData({centroCusto: centroCustoTypeOptions, metodoPagamento: metodoPagamentoOptions })
          })
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };
    fetchData();
  }, [])

  const handleChangeValue = (event) => {
    if (event.target.name === ('vlr_financeiro_fin').replace(/\[|\]/g, '')) {
      setFinanceiroValue(formatCurrencyString(event.target.value));
    }
    const inputName = event.target.name.replace(/\[|\]/g, '');
    const value = inputName === ('vlr_financeiro_fin').replace(/\[|\]/g, '') ? parseCurrencyToInt(event.target.value) : event.target.value;
    setForm(prev => ({ ...prev, [inputName]: value }))
  }

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    setTimeout(async () => {
      try {
        console.log(form);
        
        await schema.validate(form);
        const success = await saveFinanceiro(form);
        if(success){
          toast.success("Baixa de entrada realizada com sucesso!");
          onClose();
          refresh();
        } else {
          toast.error("Erro ao Cadastrar!");
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
    <Modal title={form.id_financeiro_fin ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >

      <FormGroup>
        <label>Observação</label>
        <Input
          type={'text'}
          defaultValue={form?.desc_financeiro_fin ?? ''}
          name='desc_financeiro_fin'
          onChange={handleChangeValue}
          error={error?.desc_financeiro_fin ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Valor</label>
        <Input
          placeholder="R$ 0,00"
          maxLength={16}
          value={financeiroValue ?? ''}
          name='vlr_financeiro_fin'
          onChange={handleChangeValue}
          error={error?.vlr_financeiro_fin ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Tipo de Transação</label>
        <SelectBox
          options={[
            { value: 1, label: "Saída" }
          ]}
          value={form?.tipo_transacao_fin ?? 0}
          name="tipo_transacao_fin"
          onChange={handleChangeValue}
          error={error?.tipo_transacao_fin ?? false}
          limit={1}
          isDisabled={true}
        />
      </FormGroup>

      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_fin ?? []}
          name='id_centro_custo_fin'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_fin ?? false}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Método de Pagamento</label>
        <SelectBox
          options={formData?.metodoPagamento ?? []}
          defaultValue={form?.id_metodo_pagamento_fin ?? []}
          name='id_metodo_pagamento_fin'
          onChange={handleChangeValue}
          error={error?.id_metodo_pagamento_fin ?? false}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Origem</label>
        <SelectBox
          options={[
            { value: 0, label: "Manual" },
            { value: 1, label: "Venda" },
            { value: 2, label: "Serviço" },
            { value: 3, label: "Compra" }
          ]}
          defaultValue={form?.tipo_referencia_fin ?? []}
          name="tipo_referencia_fin"
          onChange={handleChangeValue}
          error={error?.tipo_referencia_fin ?? false}
          limit={1}
        />
      </FormGroup>

      <Expand>
        <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>Salvar</ButtonSubmit>
      </Expand>
    </Modal>
  )
}