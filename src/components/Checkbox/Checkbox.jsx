import React from "react";
import { CheckboxContainer, StyledCheckbox } from "./style";

export default function Checkbox({ label, checked, onChange }) {
    return (
        <CheckboxContainer>
            <StyledCheckbox
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            {label}
        </CheckboxContainer>
    );
}
