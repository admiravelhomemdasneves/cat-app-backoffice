import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ContactsPage from './domains/ContactsPage';
import DashboardPage from './domains/DashboardPage';
import ProductsPage from './domains/ProductsPage';
import OrderStatusPage from './domains/OrderStatusPage';
import OrderPriorityPage from './domains/OrderPriorityPage';
import PrintingServicePage from './domains/PrintingServicePage';
import OrdersPage from './domains/OrdersPage';
import OrderDetailsPage from './domains/OrderDetailsPage';
import LoginPage from './domains/LoginPage';

function App() {
  const [theme, colorMode] = useMode();
  const queryClient = new QueryClient();

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