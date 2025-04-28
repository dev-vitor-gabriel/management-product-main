import { useEffect, useState } from "react";
import BarChart from '../../../components/BarGraph';
import Content from "../../../components/Content";
import SelectBox from "../../../components/Select";
import TriggerButton from "../../../components/TriggerButton";
import { getTopTenSaleMaterialsDashboard, getTopTenSaleValueDashboard } from "../../../services/graphs";
import { ChartContainer, ChartWrapper, CheckboxGroup, DashboardContainer, FilterContainer, SelectWrapper } from "./style";

import { format } from "date-fns";

export default function SaleDashboard() {
    const [costCenters, setCostCenters] = useState([]);
    const [topTenSalesGraphData, setTopTenSalesGraphData] = useState([]);
    const [topTenSalesValueGraphData, setTopTenSalesValueGraphData] = useState([]);
    const [selectedCostCenters, setSelectedCostCenters] = useState([]);
    const [dateFilter, setDateFilter] = useState(30);

    const fetchSaleDashboard = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTopTenSaleMaterialsDashboard(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setTopTenSalesGraphData(response);
    };

    const fetchSaleValueDashboard = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTopTenSaleValueDashboard(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setTopTenSalesValueGraphData(response);
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
        topTenSalesGraphData.map((data) => labels.push(data.nome_material));
        return labels;
    };

    const getTopTenSalesValues = () => {
        const values = []
        topTenSalesGraphData.map((data) => values.push(data.quantidade_vendida));
        return values;
    };

    const getTopTenSalesValueLabels = () => {
        const labels = []
        topTenSalesValueGraphData.map((data) => labels.push(data.nome_material));
        return labels;
    };

    const getTopTenSalesValueValues = () => {
        const values = []
        topTenSalesValueGraphData.map((data) => values.push(data.valor_total_vendido));
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
        fetchSaleValueDashboard();
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
                            label="Hoje"
                            active={dateFilter === 1}
                            onClick={() => setDateFilter(1)}
                        />
                        <TriggerButton
                            label="Última Semana"
                            active={dateFilter === 7}
                            onClick={() => setDateFilter(7)}
                        />
                        <TriggerButton
                            label="Último Mês"
                            active={dateFilter === 30}
                            onClick={() => setDateFilter(30)}
                        />
                    </CheckboxGroup>
                </FilterContainer>
                <ChartContainer>
                    <ChartWrapper>
                        <BarChart
                            labels={getTopTenSalesLabels()}
                            values={getTopTenSalesValues()}
                            label="Materiais mais vendidos" 
                            backgroundColor="#9052F9"
                            title="Top 10 Materiais Vendidos"
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        <BarChart
                            labels={getTopTenSalesValueLabels()}
                            values={getTopTenSalesValueValues()}
                            label="Valores das vendas"
                            backgroundColor="#9052F9"
                            title="Top 10 Valores por Venda"
                        />
                    </ChartWrapper>
                </ChartContainer>
            </DashboardContainer>
        </Content>
    )
}