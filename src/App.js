import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ContactsPage from './pages/contacts/ContactsPage';
import DashboardPage from './pages/DashboardPage';
import StatusesPage from './pages/statuses/StatusesPage';
import PrioritiesPage from './pages/priorities/PrioritiesPage';
import PrintingServicesPage from './pages/printingServices/PrintingServicesPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/orders/OrdersPage';
import UserSettingsPage from './pages/userSettings/UserSettingsPage';
import OrderDetailPage from './pages/orders/OrderDetailPage';
import ContactDetailPage from './pages/contacts/ContactDetailPage';
import CompanySettingsPage from './pages/companySettings/CompanySettingsPage';
import ColaboratorsPage from './pages/colaborators/ColaboratorsPage';
import RolesPage from './pages/roles/RolesPage';
import MaterialsPage from './pages/materials/MaterialsPage';
import MaterialDetailPage from './pages/materials/MaterialDetailPage';
import PrivateRoute from './routes/PrivateRoute';
import PermissionRoute from './routes/PermissionRoute';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
  const [theme, colorMode] = useMode();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/*" element={
                <div className="app">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/orders" element={<PermissionRoute path="/orders" element={<OrdersPage />} />} />
                      <Route path="/orders/:id" element={<PermissionRoute path="/orders" element={<OrderDetailPage />} />} />
                      <Route path="/contacts" element={<PermissionRoute path="/contacts" element={<ContactsPage />} />} />
                      <Route path="/contacts/:id" element={<PermissionRoute path="/contacts" element={<ContactDetailPage />} />} />
                      <Route path="/orderStatus" element={<PermissionRoute path="/orderStatus" element={<StatusesPage />} />} />
                      <Route path="/orderPriority" element={<PermissionRoute path="/orderPriority" element={<PrioritiesPage />} />} />
                      <Route path="/printingService" element={<PermissionRoute path="/printingService" element={<PrintingServicesPage />} />} />
                      <Route path="/colaborators" element={<PermissionRoute path="/colaborators" element={<ColaboratorsPage />} />} />
                      <Route path="/roles" element={<PermissionRoute path="/roles" element={<RolesPage />} />} />
                      <Route path="/material" element={<PermissionRoute path="/material" element={<MaterialsPage />} />} />
                      <Route path="/material/:id" element={<PermissionRoute path="/material" element={<MaterialDetailPage />} />} />
                      <Route path="/settings" element={<UserSettingsPage />} />
                      <Route path="/company-settings" element={<CompanySettingsPage />} />
                    </Routes>
                  </main>
                </div>
              } />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;