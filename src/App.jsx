import React from "react";

import AuthProvider from "./contexts/auth";
import PaginationProvider from "./contexts/pagination";
import RoutesApp from "./routes";

import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Boundary from "./pages/ErrorPage/Boundary";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Boundary>
        <ToastContainer autoClose={3000} />

        <PaginationProvider>
          <AuthProvider>
            <RoutesApp />
          </AuthProvider>
        </PaginationProvider>
      </Boundary>
    </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App
