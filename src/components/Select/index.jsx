import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { parseCurrencyToInt } from '../../utils/format';
import Icon from '../Icons';
import Input from '../Input';
import {
  Box,
  BoxFormSelectBox,
  InputError,
  Label,
  LiSelectBox,
  SelectedBox,
  VisibledPointer
} from "./style";

const SelectBox = ({ options, defaultValue, name, onChange, error, limit = 0, setDefaultValue = true }) => {

  // console.log(defaultValue)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [visibled, setVisibled] = useState(true);

  // console.log(selectedOptions)
  useEffect(() => {
    // preenche quando existir um unico registro
    if (options?.length == 1 && setDefaultValue) {
      const alreadySelected = selectedOptions.map(o => o.value);
      const newValues = options.map(o => o.value);

      if (JSON.stringify(alreadySelected) !== JSON.stringify(newValues)) {
        handleSelectChange(options);
      }
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
  const handleChangeCustomValue = ({customValue, value, column}) => {
    customValue = parseCurrencyToInt(customValue);
    const newSelectedOptions = selectedOptions.map(reg => {
      if(reg.value === value){
        reg.custom = reg.custom.map(col => {

          if(col.column == column){
            col.value = customValue
          }
          return col;
        });
      }
      return reg;
    })
    
    setSelectedOptions(newSelectedOptions);
    const event = { target: { name: name, value: newSelectedOptions } };
    onChange(event)
  }
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
      <SelectedBox>
        <Label>
          <label>Selecionado(s):</label>
          <VisibledPointer onClick={() => setVisibled((prev) => !prev)}>
            {!visibled && <Icon icon={'Eye'} />}
            {visibled && <Icon icon={'EyeSlash'} />}
          </VisibledPointer>
        </Label>
        {
          visibled &&
          <ul>
            {selectedOptions.map((option) => {
              return (
              <LiSelectBox key={`selecionado_${name}_${option.value}`}>{option.label}
                {
                  option.custom && <>
                  {
                    option.custom.map(reg=>(<BoxFormSelectBox key={`box_input_${name}_${option.value}_${reg.value}_${reg.column}`}>
                      <label>{reg?.label}</label>
                    <Input type={reg.type} defaultValue={reg.value} mask={reg.mask ?? false} prefixDefault={reg.prefixDefault ?? ''} onBlur={(e)=>handleChangeCustomValue({customValue: e.target.value, value: option.value, column: reg.column})}/>
                    </BoxFormSelectBox>))
                  }
                  </>
                }
              </LiSelectBox>
            )})}
          </ul>
        }
      </SelectedBox>
    </>
  );
};

export default SelectBox;
