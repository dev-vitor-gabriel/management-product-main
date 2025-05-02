import { useEffect, useState } from "react";
import BarChart from '../../../components/BarGraph';
import Content from "../../../components/Content";
import SelectBox from "../../../components/Select";
import { formatCurrency } from "../../../utils/format.js";

import TriggerButton from "../../../components/TriggerButton";
import {
    getTopTenSaleMaterialsDashboard,
    getTopTenSaleValueDashboard,
    getTopFuncionariosPorVenda,
    getTopVendasPorCentroCusto,
    getTopVendasPorCliente,
    getTotalVendasPorOrigemCliente
} from "../../../services/graphs";
import {
    ChartContainer,
    ChartWrapper,
    CheckboxGroup,
    DashboardContainer,
    FilterContainer,
    SelectWrapper,
    SmallChartWrapper
} from "./style";
import DoubleBarGraph from "../../../components/DoubleBarGraph";
import PieChart from "../../../components/PieChart";
import { format } from "date-fns";

export default function SaleDashboard() {
    const [costCenters, setCostCenters] = useState([]);
    const [topTenSalesGraphData, setTopTenSalesGraphData] = useState([]);
    const [topTenSalesValueGraphData, setTopTenSalesValueGraphData] = useState([]);
    const [topFuncionariosPorVenda, setTopFuncionariosPorVenda] = useState([]);
    const [topVendasPorCentroCusto, setTopVendasPorCentroCusto] = useState([]);
    const [topVendasPorCliente, setTopVendasPorCliente] = useState([]);
    const [totalVendasPorOrigemCliente, setTotalVendasPorOrigemCliente] = useState([]);
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

    const fetchTopFuncionariosPorVenda = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTopFuncionariosPorVenda(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setTopFuncionariosPorVenda(response);
    };

    const fetchTopVendasPorCentroCusto = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTopVendasPorCentroCusto(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setTopVendasPorCentroCusto(response);
    };

    const fetchTopVendasPorCliente = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTopVendasPorCliente(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setTopVendasPorCliente(response);
    };

    const fetchTotalVendasPorOrigemCliente = async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - dateFilter);
        const response = await getTotalVendasPorOrigemCliente(selectedCostCenters.join(","), `${format(pastDate, 'yyyy-MM-dd')} 00:00:00`, `${format(new Date(), 'yyyy-MM-dd')} 23:59:59`);
        setTotalVendasPorOrigemCliente(response);
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
        topTenSalesValueGraphData.map((data) => {
            const newValue = data.valor_total_vendido.toString().split(',')[0].replace('.', '')
            values.push(newValue)
        });
        return values;
    };

    const getTopFuncionariosPorVendaLabels = () => {
        const labels = []
        topFuncionariosPorVenda.map((data) => labels.push(data.nome_funcionario));
        return labels;
    };

    const getTopFuncionariosPorVendaValues = () => {
        const values1 = []
        const values2 = []
        topFuncionariosPorVenda.map((data) => {
            const newValue1 = data.quantidade_vendida
            const newValue2 = data.valor_total_vendido.toString().split(',')[0].replace('.', '')
            values1.push(newValue1)
            values2.push(newValue2)
        });

        return {
            values1: values1,
            values2: values2
        };
    };

    const getTopVendasPorCentroCustoLabels = () => {
        const labels = []
        topVendasPorCentroCusto.map((data) => labels.push(data.des_centro_custo_cco));
        return labels;
    };

    const getTopVendasPorCentroCustoValues = () => {
        const values1 = []
        const values2 = []
        topVendasPorCentroCusto.map((data) => {
            const newValue1 = data.quantidade_vendida
            const newValue2 = data.valor_total_vendido.toString().split(',')[0].replace('.', '')
            values1.push(newValue1)
            values2.push(newValue2)
        });

        return {
            values1: values1,
            values2: values2
        };
    };
    

    const getTopVendasPorClienteLabels = () => {
        const labels = []
        topVendasPorCliente.map((data) => labels.push(data.des_cliente_cli));
        return labels;
    };

    const getTopVendasPorClienteValues = () => {
        const values1 = []
        const values2 = []
        topVendasPorCliente.map((data) => {
            const newValue1 = data.quantidade_vendida
            const newValue2 = data.valor_total_vendido.toString().split(',')[0].replace('.', '')
            values1.push(newValue1)
            values2.push(newValue2)
        });

        return {
            values1: values1,
            values2: values2
        };
    };
    
    const getTotalVendasPorOrigemClienteLabels = () => {
        return totalVendasPorOrigemCliente.map(
            (data) => `${data.desc_origem_cliente_orc}: ${data.total_vendas}`
        );
    };


    const getTotalVendasPorOrigemClienteValues = () => {
        const values = []
        totalVendasPorOrigemCliente.map((data) => values.push(data.total_vendas));

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
        fetchTopFuncionariosPorVenda();
        fetchTopVendasPorCentroCusto();
        fetchTotalVendasPorOrigemCliente();
        fetchTopVendasPorCliente();
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
                    <SmallChartWrapper>
                        <BarChart
                            labels={getTopTenSalesLabels()}
                            values={getTopTenSalesValues()}
                            label="Materiais mais vendidos"
                            backgroundColor="#9052F9"
                            title="Top 10 Materiais Vendidos"
                        />
                    </SmallChartWrapper>
                    <SmallChartWrapper>
                        <BarChart
                            labels={getTopTenSalesValueLabels()}
                            values={getTopTenSalesValueValues()}
                            label="Valores das vendas"
                            backgroundColor="#9052F9"
                            title="Top 10 Valores por Venda"
                        />
                    </SmallChartWrapper>
                </ChartContainer>
                <ChartContainer>
                    <SmallChartWrapper>
                        <DoubleBarGraph
                            labels={getTopFuncionariosPorVendaLabels()}
                            values1={getTopFuncionariosPorVendaValues().values1}
                            values2={getTopFuncionariosPorVendaValues().values2}
                            label1="Quantidade Vendida"
                            label2="Valor Total Vendido"
                            backgroundColor1="#9052F9"
                            backgroundColor2="#52B6F9"
                            title="Top 3 Funcionários"
                        />
                    </SmallChartWrapper>
                    <SmallChartWrapper>
                        <DoubleBarGraph
                            labels={getTopVendasPorCentroCustoLabels()}
                            values1={getTopVendasPorCentroCustoValues().values1}
                            values2={getTopVendasPorCentroCustoValues().values2}
                            label1="Quantidade Vendida"
                            label2="Valor Total Vendido"
                            backgroundColor1="#9052F9"
                            backgroundColor2="#52B6F9"
                            title="Vendas por Centro de Custo"
                        />
                    </SmallChartWrapper>

                </ChartContainer>
                <ChartContainer>
                    <SmallChartWrapper>
                        <DoubleBarGraph
                            labels={getTopVendasPorClienteLabels()}
                            values1={getTopVendasPorClienteValues().values1}
                            values2={getTopVendasPorClienteValues().values2}
                            label1="Quantidade Vendida"
                            label2="Valor Total Vendido"
                            backgroundColor1="#9052F9"
                            backgroundColor2="#52B6F9"
                            title="Vendas por Cliente"
                        />
                    </SmallChartWrapper>
                    <SmallChartWrapper>
                        <PieChart
                            labels={getTotalVendasPorOrigemClienteLabels()}
                            dataValues={getTotalVendasPorOrigemClienteValues()}
                            title="Origem dos Clientes"
                        />
                    </SmallChartWrapper>
                </ChartContainer>
            </DashboardContainer>
        </Content>
    )
}