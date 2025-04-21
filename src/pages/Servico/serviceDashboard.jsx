import { useEffect, useState } from "react";
import { getServiceDashboard, getTopSevenServicesTypes } from "../../services/graphs";
import { getCentroCusto } from "../../services/centroCusto";
import { DashboardContainer, CardsContainer, Card, ChartContainer, ChartWrapper, FilterContainer, CheckboxGroup, SelectWrapper } from "./style";
import Content from "../../components/Content";
import BarChart from '../../components/BarGraph';
import SelectBox from "../../components/Select";
import Checkbox from "../../components/Checkbox/Checkbox";
import { format } from "date-fns";

export default function ServiceDashboard() {
    const [cardData, setCardData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [costCenters, setCostCenters] = useState([]);
    const [selectedCostCenters, setSelectedCostCenters] = useState([]);
    const [dateFilter, setDateFilter] = useState(1);

    const fetchServiceDashboard = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getServiceDashboard(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 00:00:00`);
        setCardData(response);
    };

    const fetchTopSevenServicesTypes = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTopSevenServicesTypes(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 00:00:00`);
        setGraphData(response);
    };

    const fetchCostCenters = async () => {
        const response = await getCentroCusto();
        const costCenters = response.map(({ id_centro_custo_cco, des_centro_custo_cco }) => ({
            value: id_centro_custo_cco,
            label: des_centro_custo_cco
        }));
        setCostCenters(costCenters);
    };

    const getLabels = () => {
        const labels = []
        graphData.map((data) => labels.push(data.tipo_servico));
        return labels;
    };

    const getValues = () => {
        const values = []
        graphData.map((data) => values.push(data.total_tipo_servico));
        return values;
    };

    const handleChangeValue = (e) => {
        const selectedValues = e.target.value.map((option) => option.value);
        setSelectedCostCenters(selectedValues);
    }

    useEffect(() => {
        fetchCostCenters();
        fetchServiceDashboard();
        fetchTopSevenServicesTypes();
    }, [selectedCostCenters, dateFilter]);

    return (
        <Content>
            <DashboardContainer>
                <FilterContainer>
                    <SelectWrapper>
                        <label>Centro de Custo</label>
                        <SelectBox
                            options={costCenters ?? []}
                            defaultValue={costCenters[0]?.id_centro_custo_und ?? []}
                            name='id_centro_custo_und'
                            onChange={handleChangeValue}
                            error={null}
                        />
                    </SelectWrapper>
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
                        <p>{cardData?.total_ativos ? cardData?.total_ativos : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Total Finalizados</h3>
                        <p>{cardData?.total_finalizados ? cardData?.total_finalizados : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Total Inativos</h3>
                        <p>{cardData?.total_inativos ? cardData?.total_inativos : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Média de Tempo</h3>
                        <p>{cardData?.media_tempo_atendimento ? cardData?.media_tempo_atendimento : '-'}</p>
                    </Card>
                </CardsContainer>

                <ChartContainer>
                    <ChartWrapper>
                        <BarChart
                            labels={getLabels()}
                            values={getValues()}
                            label="Total de serviços"
                            backgroundColor="#9052F9"
                            title="Top 7 tipos de serviços"
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        {/* <BarChart
                            labels={['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
                            values={[400, 300, 500, 700, 200, 600, 800, 900, 1000, 1100, 1200, 1300]}
                            label="Sales"
                            backgroundColor="#9052F9"
                            title="Sales Breakdown"
                        /> */}
                    </ChartWrapper>
                </ChartContainer>
            </DashboardContainer>
        </Content>
    )
}