import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ContactsPage from './pages/contacts/ContactsPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/products/ProductsPage';
import StatusesPage from './pages/statuses/StatusesPage';
import PrioritiesPage from './pages/priorities/PrioritiesPage';
import PrintingServicesPage from './pages/printingServices/PrintingServicesPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/orders/OrdersPage';

function App() {
  const queryClient = new QueryClient();
  const [theme, colorMode] = useMode();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path='/products' element={<ProductsPage />} />
                  <Route path='/orderStatus' element={<StatusesPage />} />
                  <Route path='/orderPriority' element={<PrioritiesPage />} />
                  <Route path='/printingService' element={<PrintingServicesPage />} />
                </Routes>
            </main>        
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;