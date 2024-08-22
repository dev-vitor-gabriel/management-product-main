import { useEffect, useState } from "react";
import yup from "../../../utils/yup";


import Modal from "../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/Buttons/ButtonSubmit";
import Input from "../../../components/Input";
import SelectBox from "../../../components/Select";
import { saveBaixa } from "../../../services/baixa";
import { getCentroCusto } from "../../../services/centroCusto";
import { getEstoque } from "../../../services/estoque";
import { getMaterial } from "../../../services/material";
import { FormGroup } from "./style";

const schema = yup.object().shape({
  id_estoque: yup.number().required().positive().integer(),
  id_centro_custo_mov: yup.number().required().positive().integer()
});


export default function BaixaForm({ reg, onClose, visible, refresh, tipoMovimentacao }) {

  const [form, setForm] = useState(reg ?? {});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
          Promise.all([getEstoque(),getCentroCusto(), getMaterial()])
          .then(([estoque, centroCusto, material])=>{
            const estoqueOptions = estoque.map(({ id_estoque_est, des_estoque_est })=>{
              return ({
                value: id_estoque_est,
                label: `${des_estoque_est}`
              });
            })

            const centroCustoOptions = centroCusto.map(({ id_centro_custo_cco, des_centro_custo_cco }) => {
              return ({
                value: id_centro_custo_cco,
                label: des_centro_custo_cco
              });
            })

            const materialOptions = material.map(({ id_material_mte, des_material_mte, des_reduz_unidade_und, vlr_material_mte }) => {
              return ({
                value: id_material_mte,
                label: `${des_material_mte} - ${des_reduz_unidade_und}`,
                custom: [{
                  prefixDefault: des_reduz_unidade_und,
                  label: 'Quantidade',
                  column: 'qtd_material_rsm',
                  value: 1,
                  type: 'number'
                },
                {
                  label: 'Valor Unitário',
                  column: 'vlr_material_mte',
                  value: vlr_material_mte,
                  type: 'number',
                  mask: 'currency'
                }]
              });
            })
            setFormData({estoqueOptions, centroCustoOptions, materialOptions })
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
    let objError = {};
    setTimeout(async () => {
      try {
        await schema.validate(form);
        const formFactory = {
          txt_movimentacao_mov:'',
          id_estoque:null,
          id_centro_custo_mov:null,
          materiais: [],
        }
        const formData = { ...formFactory, ...form }

        // console.log(formData)
        formData.materiais = formData.materiais.map(reg => {
          const regQtd = reg.custom.filter(({ column }) => column == "qtd_material_rsm");
          const regVlr = reg.custom.filter(({ column }) => ["vlr_material_mte","vlr_material_rsm"].includes(column));

          return {
            id_material_mte: reg.value,
            vlr_material_mit: parseInt(regVlr?.[0].value) ?? 0,
            qtd_material_mit: parseInt(regQtd?.[0].value) ?? 1
          }
        });
        // console.log(JSON.stringify(formFactory));
        const success = await saveBaixa(tipoMovimentacao, formData);
        if(success){
          await refresh();
          toast.success("Registro salvo!");
        } else {

          toast.error("aaaa!");
        }

        setError({});
      } catch (err) {
        err.errors.forEach(e => {
          const [inputError, ...error] = e.split(' ');
          objError = { ...objError, [inputError]: error.join(' ') }
        });

      } finally {
        setError(objError);
        setLoadingSubmit(false);
      }
    }, 1000);
  }


  return (
    <Modal title={form.id_material_und ? "Edição" : "Cadastro"} onClose={onClose} visible={visible} >
      <FormGroup>
        <label>Centro de custo</label>
        <SelectBox
          options={formData.centroCustoOptions ?? []}
          defaultValue={form.id_centro_custo_mov ?? []}
          name='id_centro_custo_mov[]'
          onChange={handleChangeValue}
          error={error?.id_centro_custo_mov ?? false}
          limit={1}
        />
      </FormGroup>
      <FormGroup>
        <label>Estoque</label>
        <SelectBox
          options={formData.estoqueOptions ?? []}
          defaultValue={form.id_estoque_entrada_mov ?? form.id_estoque_saida_mov ?? []}
          name='id_estoque[]'
          onChange={handleChangeValue}
          error={error?.id_estoque ?? false}
          limit={1}
        />
      </FormGroup>
      <FormGroup>
        <label>Observação</label>
        <Input
          type={'text'}
          defaultValue={form?.txt_movimentacao_mov ?? ''}
          name='txt_movimentacao_mov'
          onChange={handleChangeValue}
          error={error?.txt_movimentacao_mov ?? false}
        />
      </FormGroup>
      <FormGroup>
        <label>Materiais</label>
        <SelectBox
          options={formData.materialOptions ?? []}
          defaultValue={form?.materiais ?? []}
          name='materiais[]'
          onChange={handleChangeValue}
          error={error?.materiais ?? false}
        />
      </FormGroup>


      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit} >Salvar</ButtonSubmit>
    </Modal>
  )
}