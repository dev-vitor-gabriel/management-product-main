import React from "react";
import Content from "../../components/Content";
import { WelcomeTitle, DashboardContainer, CardsContainer, Card, ChartContainer, ChartWrapper } from "./style";
import BarChart from '../../components/BarGraph';
import LineChart from '../../components/LineGraph';

export default function Home() {

    const lineGraphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    const lineGraphSales = [500, 700, 800, 600, 900]
    const lineGraphExpenses = [300, 400, 450, 500, 550]

    return (
        <Content>
            <DashboardContainer>
                <CardsContainer>
                    <Card>
                        <h3>Total Sales</h3>
                        <p>$34,516</p>
                    </Card>
                    <Card>
                        <h3>Total Leads</h3>
                        <p>56,992</p>
                    </Card>
                    <Card>
                        <h3>Total Profit</h3>
                        <p>$42,567</p>
                    </Card>
                    <Card>
                        <h3>Total Cost</h3>
                        <p>$34,789</p>
                    </Card>
                </CardsContainer>

                <ChartContainer>
                    <ChartWrapper>
                        <LineChart
                            labels={lineGraphLabels}
                            dataset1={{ label: 'Sales', data: lineGraphSales, borderColor: '#10B981' }}
                            dataset2={{ label: 'Expenses', data: lineGraphExpenses, borderColor: '#EF4444' }}
                            title="Total Transactions"
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        <BarChart
                            labels={['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
                            values={[400, 300, 500, 700, 200, 600, 800, 900, 1000, 1100, 1200, 1300]}
                            label="Sales"
                            backgroundColor="#9052F9"
                            title="Sales Breakdown"
                        />
                    </ChartWrapper>
                </ChartContainer>
            </DashboardContainer>
        </Content>
    )
}