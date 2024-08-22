import { Center, ContentHeaderCard, GridHeaderCard, HeaderCard, Horario, ImageHeaderCard, LoadingHour, ServiceCard, TitleHeaderCard } from "./style";


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import corte_example from '../../../assets/corte_example.jpeg';
import { getHorarioByFunc } from "../../../services/agendamento";

export default function CardProfissional({obj, date}) {

    const [hourList, setHourList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { nome_func, id_func, link_foto } = obj;
    const { empresa } = useParams();

    // if(id_func == 1)
        // console.log('novo',date);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            // console.log('getHorarioByFunc(empresa, id_func)',empresa, id_func, date)
            const response = await getHorarioByFunc(empresa, id_func, date)
            setHourList(response);
            setLoading(false);
        }
        fetchData();
    }, [date])

    const handleHour = (hora) => {
        console.log('select',hora)
    }

    // console.log(hourList)

    return (
        <ServiceCard>
            <HeaderCard>
                <ImageHeaderCard imageUrl={corte_example} />
                {/* <img src={corte_example} width={64}/> */}
                <ContentHeaderCard>
                    <TitleHeaderCard>{nome_func}</TitleHeaderCard>
                    { loading && <Center><LoadingHour /></Center> }
                    { !loading && 
                        <GridHeaderCard>
                            { hourList.map(({hora, isOpen})=>(<Horario key={hora} disabled={!isOpen} onClick={()=>handleHour(hora)}>{hora}</Horario>)) }
                        </GridHeaderCard>
                    }
                </ContentHeaderCard>
            </HeaderCard>
        </ServiceCard>
    )
}