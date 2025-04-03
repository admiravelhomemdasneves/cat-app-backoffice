import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ContactsPage from './pages/ContactsPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrderStatusPage from './pages/OrderStatusPage';
import OrderPriorityPage from './pages/OrderPriorityPage';
import PrintingServicePage from './pages/PrintingServicePage';
import OrderDetailsPage from './pages/OrderDetailsPage';
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
                  <Route path="/orders/:idOrder" element={<OrderDetailsPage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path='/products' element={<ProductsPage />} />
                  <Route path='/orderStatus' element={<OrderStatusPage />} />
                  <Route path='/orderPriority' element={<OrderPriorityPage />} />
                  <Route path='/printingService' element={<PrintingServicePage />} />
                </Routes>
            </main>        
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;