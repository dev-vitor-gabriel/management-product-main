import React, { useCallback, useEffect, useState } from "react";
import {
  BoxInput,
  InputError,
  InputForm
} from "./style";

import { formatCurrency } from "../../utils/format";
import { cep, cpf, currency } from "./mask";


export default function Input({ type, mask, prefixDefault= '', defaultValue, onChange, error, ...props }) {
  const [prefix, setPrefix] = useState('');
  useEffect(() => {
    if(prefixDefault != ''){
      setPrefix(prefixDefault);
      return;
    }
    if (mask == "currency") {
      setPrefix('R$');
      return;
    }
  }, [])
  const handleKeyUp = useCallback(
    (e) => {
      if (mask === "cep") {
        cep(e);
      }
      if (mask === "currency") {
        currency(e);
      }
      if (mask === "cpf") {
        cpf(e);
      }
    },
    [mask]
  );
  return (<BoxInput>
    {
      prefix != '' &&
      <span>{prefix}</span>
    }
    <InputForm
      type={mask === "currency" ? "text" : type}
      defaultValue={mask === "currency" ? formatCurrency(defaultValue) : defaultValue}
      onChange={onChange}
      error={!!error}
      onKeyUp={handleKeyUp}
      alignright={prefix != '' ? 1 : 0}
      {...props}
    />
    {!!error && <InputError>{`${error[0].toUpperCase()}${error.substring(1)}`}</InputError>}

  </BoxInput>
  )
}