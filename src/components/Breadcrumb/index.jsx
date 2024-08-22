import React from "react";

import { BreadMenu } from './style';

export default function Breadcrumb({ breadItens }) {
    return (
        <BreadMenu>
            <ul>
                {breadItens.map((item, index) => (
                    <li key={index}>
                        <a href="#">{item}</a>
                    </li>
                 ))}
            </ul>
        </BreadMenu>
    )
}