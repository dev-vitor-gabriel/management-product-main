import { useEffect, useState } from "react";
import { getSaleDashboard} from "../../../services/graphs";
import { DashboardContainer, CardsContainer, Card, ChartContainer, ChartWrapper, FilterContainer, CheckboxGroup, SelectWrapper } from "./style";
import Content from "../../../components/Content";
import BarChart from '../../../components/BarGraph';
import SelectBox from "../../../components/Select";
import Checkbox from "../../../components/Checkbox/Checkbox";
import TriggerButton from "../../../components/TriggerButton";

import { format } from "date-fns";

export default function SaleDashboard() {
    const [saleData, setSaleData] = useState([]);
    const [costCenters, setCostCenters] = useState([]);
    const [selectedCostCenters, setSelectedCostCenters] = useState([]);
    const [dateFilter, setDateFilter] = useState(1);

    const fetchSaleDashboard = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getSaleDashboard(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setSaleData(response);
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

    const getTopTenSalesLabels = () => {
        const labels = []
        topTenSalesGraphData.map((data) => labels.push(data.tipo_servico));
        return labels;
    };

    const getTopTenSalesValues = () => {
        const values = []
        topTenSalesGraphData.map((data) => values.push(data.total_tipo_servico));
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
        fetchSaleDashboard();
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
                        <p>{saleData?.total_ativos !== null ? saleData?.total_ativos : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Total Finalizados</h3>
                        <p>{saleData?.total_finalizados !== null ? saleData?.total_finalizados : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Total Inativos</h3>
                        <p>{saleData?.total_inativos !== null ? saleData?.total_inativos : '-'}</p>
                    </Card>
                    <Card>
                        <h3>Média de Tempo</h3>
                        <p>{saleData?.media_tempo_atendimento !== null ? saleData?.media_tempo_atendimento : '-'}</p>
                    </Card>
                </CardsContainer>

                <ChartContainer>
                    <ChartWrapper>
                        <BarChart
                            labels={getTopTenSalesLabels()}
                            values={getTopTenSalesValues()}
                            label="Total de serviços"
                            backgroundColor="#9052F9"
                            title="Top 7 tipos de serviços"
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        <BarChart
                            labels={getSalesByEmployeeLabels()}
                            values={getSalesByEmployeeValues()}
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