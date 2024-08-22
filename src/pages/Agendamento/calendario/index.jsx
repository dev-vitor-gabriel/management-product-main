

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Body, Button, CalendarBox, CenterFullScreen, Conteiner, H1, Header, HeaderBlock, Loading, Logo, Parag, SocialMediaBlock } from "./style";





import ptbr from 'date-fns/locale/pt-BR';
import DatePicker, { registerLocale } from "react-datepicker";
registerLocale('pt-BR', ptbr)

import "./react-datepicker.css";

import socialFacebook from '../../../assets/social_facebook.png';
import socialInstagram from '../../../assets/social_instagram.png';
import socialWhatsapp from '../../../assets/social_whatsapp.png';
import { getFuncByServices } from "../../../services/agendamento";
import CardProfissional from "./cardProfissional";
import { Content } from "./style";


export default function AgendamentoCalendario() {

    const [form, setForm] = useState({});
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({});


    const dataAtual = new Date();
    // Adiciona 15 dias em milissegundos
    const dataFuturaEmMilissegundos = dataAtual.getTime() + 30 * 24 * 60 * 60 * 1000;
    // Cria um novo objeto Date com a data futura
    const dataFutura = new Date(dataFuturaEmMilissegundos);


    const navigate = useNavigate()
    const { empresa } = useParams();
    const { state } = useLocation();

    // redirect pagina de agendamento se for acessada diretamente
    if (!state || !state.formData || !state.formData.entrepriseInfo) {
        setTimeout(() => {
            navigate(`/agendamento/${empresa}`);
        }, 1);
        return (<></>);
    }

    const { form: { serviceType: serviceTypeSelected }, formData: { entrepriseInfo } } = state;

    // ignorar warning devido ao return de acesso invalido direto ao link
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchData = async () => {
            const profissionais = await getFuncByServices(empresa)
            setTimeout(() => { setFormData({ profissionais }); }, 1000);
        }
        fetchData();
    }, [])

    return (
        <Conteiner>
            <Header>
                <HeaderBlock><Logo src={entrepriseInfo.logo} /></HeaderBlock>
                <HeaderBlock>
                    <H1>{entrepriseInfo.des_nome}</H1>
                    <Parag>{entrepriseInfo.street}</Parag>
                    <Parag>{entrepriseInfo.cidade} - CEP: {entrepriseInfo.cep}</Parag>
                    <Parag>{entrepriseInfo.telefone}</Parag>
                </HeaderBlock>
                <HeaderBlock>
                    <Button>Meus agendamentos</Button>
                    <SocialMediaBlock>
                        <a href="#"><img src={socialWhatsapp} /></a>
                        <a href="#"><img src={socialInstagram} /></a>
                        <a href="#"><img src={socialFacebook} /></a>
                    </SocialMediaBlock>
                </HeaderBlock>
            </Header>
            <Body>

                {!formData.profissionais && <CenterFullScreen><Loading /></CenterFullScreen>}
                {formData.profissionais && <>
                    <CalendarBox>
                        <h2>Selecione o dia:</h2>
                        <DatePicker minDate={dataAtual} maxDate={dataFutura} selected={date} onChange={(date) => setDate(date)} locale="pt-BR" />
                    </CalendarBox>
                    <Content>
                        {formData.profissionais.map(profissional => (<CardProfissional key={profissional.id_func} obj={profissional} date={date} />))}
                    </Content>
                </>
                }


            </Body>

        </Conteiner>
    )
}