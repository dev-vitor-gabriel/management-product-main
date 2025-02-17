import { useEffect, useState } from "react";
import yup from "../../../utils/yup";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/Buttons/ButtonSubmit";
import SelectBox from "../../../components/Select";
import { getEmployee } from "../../../services/employee";
import { getSale, getSaleProducts } from "../../../services/sale";
import { Expand, FormGroup } from "./style";
import { getCentroCusto } from "../../../services/centroCusto";
import { getCliente } from "../../../services/cliente";
import { getMaterial } from "../../../services/material";
import api from "../../../services/api";
import { getStatusByOrigem, OrigemStatus } from "../../../services/status";

export default function EmpresaForm({ saleEditing, onClose, visible }) {
  const [form, setForm] = useState(saleEditing);
  const [inputData, setInputData] = useState(saleEditing ?? {});
  const [formData, setFormData] = useState({});
  const [materiaisOriginais, setMateriaisOriginais] = useState([]);
  const [error, setError] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const isEditing = saleEditing ?? false;

  useEffect(() => {
    getFormData();
  }, []);

  const getFormData = () => {
  };

  const setSaleFormInfos = async () => {
    setFormData();
  }

  const handleChangeValue = (event) => {
    if (!event.target)
    {
      return;
    }
    const eventName = event.target.name ?? event.target
    let eventValue = event.target.value ?? null
    inputData[eventName] = eventValue
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    if(!isEditing) {
      await api.post("/empresa", inputData)
      .then((res) => {
        toast.success(res.data.message)
        setLoadingSubmit(false);
        setInputData({})
        onClose();
      }).catch((res) => {
        const errors = res.response.data.errors;
        let message = (
          <div>
            <ul style={{listStyleType: "disc"}}>
              {Object.keys(errors).map((field, index) => (
                <li key={index}>{errors[field]}</li>
              ))}
            </ul>
          </div>
        );

        toast.error(message);
        setLoadingSubmit(false);
      })
    } else {
      await api.put(`/empresa/${inputData.id_empresa_emp}`, inputData)
      .then((res) => {
        toast.success(res.data.message)
        setLoadingSubmit(false);
        setInputData({})
        onClose();
      }).catch((res) => {
        const errors = res.response.data.errors;
        let message = (
          <div>
            <ul style={{listStyleType: "disc"}}>
              {Object.keys(errors).map((field, index) => (
                <li key={index}>{errors[field]}</li>
              ))}
            </ul>
          </div>
        );

        toast.error(message);
        setLoadingSubmit(false);
      })
    }
  };

  return (
    <Modal
      title={form ? "Edição" : "Cadastro"}
      onClose={onClose}
      visible={visible}
    >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={"text"}
          defaultValue={form?.des_empresa_emp ?? ""}
          name="des_empresa_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <FormGroup>
        <label>Razão Social</label>
        <Input
          type={"text"}
          defaultValue={form?.razao_social_empresa_emp ?? ""}
          name="razao_social_empresa_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <FormGroup>
        <label>CNPJ</label>
        <Input
          type={"text"}
          defaultValue={form?.cnpj_empresa_emp ?? ""}
          name="cnpj_empresa_emp"
          onChange={handleChangeValue}
          mask="cnpj"
          error={""}
        />
      </FormGroup>

    <FormGroup>
      <label>Cidade</label>
      <Input
        type={"text"}
        defaultValue={form?.des_cidade_emp ?? ""}
        name="des_cidade_emp"
        onChange={handleChangeValue}
        error={""}
      />
    </FormGroup>

      <FormGroup>
        <label>Endereço</label>
        <Input
          type={"text"}
          defaultValue={form?.des_endereco_emp ?? ""}
          name="des_endereco_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <FormGroup>
        <label>CEP</label>
        <Input
          type={"text"}
          defaultValue={form?.des_cep_emp ?? ""}
          name="des_cep_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <FormGroup>
        <label>Contato(Núm. Telefone)</label>
        <Input
          type={"text"}
          defaultValue={form?.des_tel_emp ?? ""}
          name="des_tel_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <FormGroup>
        <label>Link Whatsapp</label>
        <Input
          type={"text"}
          defaultValue={form?.lnk_whatsapp_emp ?? ""}
          name="lnk_whatsapp_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>
      <FormGroup>
        <label>Link Instagram</label>
        <Input
          type={"text"}
          defaultValue={form?.lnk_instagram_emp ?? ""}
          name="lnk_instagram_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>
      <FormGroup>
        <label>Link Facebook</label>
        <Input
          type={"text"}
          defaultValue={form?.lnk_facebook_emp ?? ""}
          name="lnk_facebook_emp"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <Expand>
        <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>
          Salvar
        </ButtonSubmit>
      </Expand>
    </Modal>
  );
}
