import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import {
  Box,
  InputError,
} from "./style";

const SelectBox = ({ options, defaultValue, name, onChange, error, limit = 0, setDefaultValue = true }) => {

  // console.log(defaultValue)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [visibled, setVisibled] = useState(true);

  // console.log(selectedOptions)
  useEffect(() => {
    // preenche quando existir um unico registro
    if(options?.length == 1 && setDefaultValue){
      handleSelectChange(options);
      return;
    }

    // preenche com o valor default
    if(typeof defaultValue == 'number'){
      const selected = options.filter(reg => defaultValue == reg.value)
      setSelectedOptions(selected);
    }else if(defaultValue.length > 0 && typeof defaultValue[0] == 'number'){
      const selected = options.filter(reg => defaultValue.includes(reg.value))
      setSelectedOptions(selected);
    }else{
      const selected = defaultValue;
      setSelectedOptions(selected);
    }
  }, [options])

  const handleSelectChange = (selected) => {
    var event;
    if(limit == 1 && selected.length > 0){
      selected = [selected.at(-1)];

      event = { target: { name: name, value: selected[0].value } };
    }
    if (selected.length == 0)
    {
      event = { target: name, value: null }
    }
    if (limit == 0)
    {
      event = { target: { name: name, value: selected } };
    }
    setSelectedOptions(selected);
    onChange(event)
  };

  return (
    <>
      <Box error={error}>
        <Select
          options={options}
          isMulti
          value={selectedOptions}
          onChange={handleSelectChange}
        />
      </Box>
      {error && <InputError>{`${error[0].toUpperCase()}${error.substring(1)}`}</InputError>}
    </>
  );
};

export default SelectBox;
