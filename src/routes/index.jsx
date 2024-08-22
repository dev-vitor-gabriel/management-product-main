import { Route, Routes } from 'react-router-dom';

//Pages
import Agendamento from '../pages/Agendamento';
import AgendamentoCalendario from '../pages/Agendamento/calendario';
import Baixa from '../pages/Almoxarifado/Material';
import Estoque from '../pages/CadastroBase/Almoxarifado/Estoque';
import Material from '../pages/CadastroBase/Almoxarifado/Material';
import Unidade from '../pages/CadastroBase/Almoxarifado/Unidade';
import InstituicaoPagamento from '../pages/CadastroBase/Financeiro/InstituicaoPagamento';
import MetodoPagamento from '../pages/CadastroBase/Financeiro/MetodoPagamento';
import Cargo from '../pages/CadastroBase/Perfil/Cargo';
import CentroCusto from '../pages/CadastroBase/Perfil/CentroCusto';
import Funcionario from '../pages/CadastroBase/Perfil/Funcionario';
import Cliente from '../pages/CadastroBase/Perfil/Cliente';
import TipoServico from '../pages/CadastroBase/Servico/TipoServico';
import ListIcons from '../pages/Debug/ListIcons';
import Empty from "../pages/Empty";
import Page404 from '../pages/ErrorPage/404';
import Home from "../pages/Home";
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Service from '../pages/Servico';

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="/" element={<Home />} />
                <Route path="/empty" element={<Empty />} />
                {/* <Route path="/cadastroMaterial" element={<RegisterMaterial />} /> */}
                <Route path="/service" element={<Service />} />
                <Route path="/servico/novo" element={<Service reg={{}} />} />
                <Route path="/almoxarifado/baixa/entrada" element={<Baixa tipoMovimentacao='entrada' />} />
                <Route path="/almoxarifado/baixa/saida" element={<Baixa tipoMovimentacao='saida' />} />
                <Route path="/cadastro-base/servico/tipo-servico" element={<TipoServico />} />
                <Route path="/cadastro-base/almoxarifado/unidade" element={<Unidade />} />
                <Route path="/cadastro-base/almoxarifado/material" element={<Material />} />
                <Route path="/cadastro-base/almoxarifado/estoque" element={<Estoque />} />
                <Route path="/cadastro-base/financeiro/metodo-pagamento" element={<MetodoPagamento />} />
                <Route path="/cadastro-base/financeiro/instituicao-pagamento" element={<InstituicaoPagamento />} />
                <Route path="/cadastro-base/perfil/centro-custo" element={<CentroCusto />} />
                <Route path="/cadastro-base/perfil/cargo" element={<Cargo />} />
                <Route path="/cadastro-base/perfil/funcionario" element={<Funcionario />} />
                <Route path="/cadastro-base/perfil/cliente" element={<Cliente />} />
                <Route path="/listicons" element={<ListIcons />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/agendamento" >
                <Route path="/agendamento/:empresa" element={<Agendamento />} />
                <Route path="/agendamento/:empresa/calendario" element={<AgendamentoCalendario />} />
                
                <Route path="/agendamento" element={<Page404 />} />
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    )
}

export default RoutesApp;