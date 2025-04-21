import styled from 'styled-components';

export const Container = styled.div`
`;

export const WelcomeTitle = styled.h1`
    display: flex;
    margin-top: 64px;
    justify-content: center;
    text-align: flex-end;
    color:var(--primary);
    font-size: 3rem;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ChartContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ChartWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;