import React from "react";
import Content from "../../components/Content";
import { WelcomeTitle } from "./style";
import BarChart from '../../components/BarGraph';
import LineChart from '../../components/LineGraph';

export default function Home() {

    const lineGraphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    const lineGraphSales = [500, 700, 800, 600, 900]
    const lineGraphExpenses = [300, 400, 450, 500, 550]
  
    return (
        <Content>
            <WelcomeTitle>Bem vindo!</WelcomeTitle>
            <BarChart
                labels={['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
                values={[400, 300, 500, 700, 200, 600, 800, 900, 1000, 1100, 1200, 1300]}
                label="Sales"
                backgroundColor="#9052F9"
            />

            <LineChart
                labels={lineGraphLabels}
                dataset1={{ label: 'Sales', data: lineGraphSales, borderColor: '#10B981' }}
                dataset2={{ label: 'Expenses', data: lineGraphExpenses, borderColor: '#EF4444' }}
            />
        </Content>
    )
}