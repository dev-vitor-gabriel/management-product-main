import { useEffect, useState } from "react";






import { useNavigate, useParams } from "react-router-dom";
import { getInfoEmpresa, getServiceType } from "../../services/agendamento";
import { Button, ButtonNext, CenterFullScreen, Conteiner, Content, Footer, H1, Header, HeaderBlock, Loading, Logo, Parag, SocialMediaBlock } from "./style";


import socialFacebook from '../../assets/social_facebook.png';
import socialInstagram from '../../assets/social_instagram.png';
import socialWhatsapp from '../../assets/social_whatsapp.png';
import Card from "./card";
export default function Agendamento() {

    const [form, setForm] = useState({});
    const [formData, setFormData] = useState({});


    const { empresa } = useParams();

    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/agendamento/${empresa}/calendario`, { state:{form,formData} });
    }

    const handleSelect = (obj) => {
        const factory = {serviceType:[]};
        const newForm = {...factory,...form};
        const exists = newForm.serviceType.find((reg)=> (reg.id_servico_tipo_stp == obj.id_servico_tipo_stp));
        if(exists){
            return;
        }
        newForm.serviceType.push(obj);
        setForm(newForm);
    }
    const handleRemove = (obj) => {
        const factory = {serviceType:[]};
        const newForm = {...factory,...form};
        newForm.serviceType = newForm.serviceType.filter((reg)=> (reg.id_servico_tipo_stp != obj.id_servico_tipo_stp));
        setForm(newForm);
    }


    // Chamada da API - Lista todos os materiais
    useEffect(() => {

        const fetchData = async () => {
            try {
                await (new Promise((resolve) => setTimeout(resolve, 1000)))
                Promise.all([getServiceType(empresa), getInfoEmpresa(empresa)])
                .then(([serviceType, entrepriseInfo]) => {
                    setFormData((prev)=>({serviceType, entrepriseInfo}));
                })
            } catch (error) {
                console.error("Erro ao buscar:", error);
            }
        };
        fetchData();
    }, []);

    console.log('#######',form);


    if(!formData.entrepriseInfo){
        return <CenterFullScreen><Loading/></CenterFullScreen>;
    }

    return (
        <Conteiner>
            <Header>
                <HeaderBlock><Logo src={formData.entrepriseInfo.logo} /></HeaderBlock>
                <HeaderBlock>
                    <H1>{formData.entrepriseInfo.des_nome}</H1>
                    <Parag>{formData.entrepriseInfo.street}</Parag>
                    <Parag>{formData.entrepriseInfo.cidade} - CEP: {formData.entrepriseInfo.cep}</Parag>
                    <Parag>{formData.entrepriseInfo.telefone}</Parag>
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
            <Content>
                {
                    formData.serviceType.map(service => (<Card key={service.id_servico_tipo_stp} obj={service} handleSelect={handleSelect} handleRemove={handleRemove}/>))
                }
                
            </Content>
            {
                form.serviceType && form.serviceType.length > 0 && <Footer><ButtonNext onClick={handleNext}>Próximo</ButtonNext></Footer>
            }
            
        </Conteiner>
    )
}