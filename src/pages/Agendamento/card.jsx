import { ButtonItemFooterCard, ContentHeaderCard, FooterCard, HeaderCard, ImageHeaderCard, ItemFooterCard, ServiceCard, TextHeaderCard, TimeItemFooterCard, TitleHeaderCard, ValueItemFooterCard } from "./style";

import { useState } from "react";

import corte_example from '../../assets/corte_example.jpeg';
import { formatCurrencyPrefix } from "../../utils/format";

export default function Card({obj, handleSelect, handleRemove}) {
    const [selected, setSelected] = useState(false);
    const handleClick = () =>{
        // selected
        if(selected == false){
            handleSelect(obj)
        }else{
            handleRemove(obj)
        }
        setSelected(prev => !prev);
    }

    const { des_servico_tipo_stp, id_servico_tipo_stp, is_ativo_stp, qtd_minutos_stp, vlr_servico_tipo_stp } = obj;

    return (
        <ServiceCard selected={selected}>
            <HeaderCard>
                <ImageHeaderCard imageUrl={corte_example} />
                {/* <img src={corte_example} width={64}/> */}
                <ContentHeaderCard>
                    <TitleHeaderCard>{des_servico_tipo_stp}</TitleHeaderCard>
                    <TextHeaderCard>Sem obs </TextHeaderCard>
                </ContentHeaderCard>
            </HeaderCard>
            <FooterCard>
                <ItemFooterCard><TimeItemFooterCard>{qtd_minutos_stp} min</TimeItemFooterCard></ItemFooterCard>
                <ItemFooterCard><ValueItemFooterCard>{formatCurrencyPrefix(vlr_servico_tipo_stp)}</ValueItemFooterCard></ItemFooterCard>
                <ItemFooterCard><ButtonItemFooterCard onClick={handleClick}>{selected ? '-' : '+'}</ButtonItemFooterCard></ItemFooterCard>
            </FooterCard>
        </ServiceCard>
    )
}