import { useEffect, useState } from "react";
import { getServiceDashboard, getTopSevenServicesTypes, getServicesByEmployee } from "../../services/graphs";
import { DashboardContainer, CardsContainer, Card, ChartContainer, ChartWrapper, FilterContainer, CheckboxGroup, SelectWrapper } from "./style";
import Content from "../../components/Content";
import BarChart from '../../components/BarGraph';
import SelectBox from "../../components/Select";
import Checkbox from "../../components/Checkbox/Checkbox";
import TriggerButton from "../../components/TriggerButton";

import { format } from "date-fns";

export default function ServiceDashboard() {
    const [cardData, setCardData] = useState([]);
    const [topSevenServicesGraphData, setTopSevenServicesGraphData] = useState([]);
    const [servicesByEmployeeGraphData, setServicesByEmployeeGraphData] = useState([]);
    const [costCenters, setCostCenters] = useState([]);
    const [selectedCostCenters, setSelectedCostCenters] = useState([]);
    const [dateFilter, setDateFilter] = useState(1);

    const fetchServiceDashboard = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getServiceDashboard(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setCardData(response);
    };

    const fetchTopSevenServicesTypes = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTopSevenServicesTypes(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setTopSevenServicesGraphData(response);
    };

    const fetchServicesByEmployee = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getServicesByEmployee(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setServicesByEmployeeGraphData(response);
    };

    const formatCostCenters = async () => {
        const userData = JSON.parse(localStorage.getItem('user'))

        const costCenters = userData.centro_custo_permission.map(({ id_centro_custo_cco, des_centro_custo_cco }) => ({
            value: id_centro_custo_cco,
            label: des_centro_custo_cco
        }));
        const selectedCostCenters = userData.centro_custo_permission.map(({ id_centro_custo_cco }) => (
            id_centro_custo_cco
        ));

        setCostCenters(costCenters);
        setSelectedCostCenters(selectedCostCenters);
    };

    const getTopSevenServicesLabels = () => {
        const labels = []
        topSevenServicesGraphData.map((data) => labels.push(data.tipo_servico));
        return labels;
    };

    const getTopSevenServicesValues = () => {
        const values = []
        topSevenServicesGraphData.map((data) => values.push(data.total_tipo_servico));
        return values;
    };

    const getServicesByEmployeeLabels = () => {
        const labels = []
        servicesByEmployeeGraphData.map((data) => labels.push(data.nome));
        return labels;
    };

    const getServicesByEmployeeValues = () => {
        const values = []
        servicesByEmployeeGraphData.map((data) => values.push(data.total_tipos_servico));
        return values;
    };

    const handleChangeValue = (e) => {
        const selectedValues = e.target.value.map((option) => option.value);
        setSelectedCostCenters(selectedValues);
    }

    useEffect(() => {
        formatCostCenters();
    }, []);

    useEffect(() => {
        fetchServiceDashboard();
        fetchTopSevenServicesTypes();
        fetchServicesByEmployee();
    }, [selectedCostCenters, dateFilter]);

    return (
        <Content>
            <DashboardContainer>
                <FilterContainer>
                    <SelectWrapper>
                        <label>Centro de Custo</label>
                        <SelectBox
                            options={costCenters ?? []}
                            defaultValue={selectedCostCenters}
                            name='id_centro_custo_und'
                            onChange={handleChangeValue}
                            error={null}
                        />
                    </SelectWrapper>
                    <CheckboxGroup>
                        <TriggerButton
                            label="1 dia"
                            active={dateFilter === 1}
                            onClick={() => setDateFilter(1)}
                        />
                        <TriggerButton
                            label="7 dias"
                            active={dateFilter === 7}
                            onClick={() => setDateFilter(7)}
                        />
                        <TriggerButton
                            label="30 dias"
                            active={dateFilter === 30}
                            onClick={() => setDateFilter(30)}
                        />
                    </CheckboxGroup>
                    <CheckboxGroup>
                        <Checkbox
                            label="1 dia"
                            checked={dateFilter === 1}
                            onChange={() => setDateFilter(1)}
                        />
                        <Checkbox
                            label="7 dias"
                            checked={dateFilter === 7}
                            onChange={() => setDateFilter(7)}
                        />
                        <Checkbox
                            label="30 dias"
                            checked={dateFilter === 30}
                            onChange={() => setDateFilter(30)}
                        />
                    </CheckboxGroup>
                </FilterContainer>

                <CardsContainer>
                    <Card>
                        <h3>Total Ativos</h3>
                        <p>{cardData?.total_ativos !== null ? cardData?.total_ativos : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Total Finalizados</h3>
                        <p>{cardData?.total_finalizados !== null ? cardData?.total_finalizados : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Total Inativos</h3>
                        <p>{cardData?.total_inativos !== null ? cardData?.total_inativos : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Média de Tempo</h3>
                        <p>{cardData?.media_tempo_atendimento !== null ? cardData?.media_tempo_atendimento : '-'}</p>
                    </Card>
                </CardsContainer>

                <ChartContainer>
                    <ChartWrapper>
                        <BarChart
                            labels={getTopSevenServicesLabels()}
                            values={getTopSevenServicesValues()}
                            label="Total de serviços"
                            backgroundColor="#9052F9"
                            title="Top 7 tipos de serviços"
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        <BarChart
                            labels={getServicesByEmployeeLabels()}
                            values={getServicesByEmployeeValues()}
                            label="Qtde de serviços"
                            backgroundColor="#9052F9"
                            title="Top 3 Colaboradores"
                        />
                    </ChartWrapper>
                </ChartContainer>
            </DashboardContainer>
        </Content>
    )
}