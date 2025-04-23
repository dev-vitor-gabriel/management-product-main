import React from "react";
import { Button } from "./style";

const TriggerButton = ({ label, active, onClick }) => {
    return <Button active={active} onClick={onClick}>{label}</Button>;
};

export default TriggerButton;