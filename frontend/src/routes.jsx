import { AuthPage } from "./Pages/Auth/AuthPage.jsx";
import { Dashboard } from "./Pages/Dashboard/Dashboard.jsx";
import DashboardUser from "./Pages/Dashboard/DashboardUser.jsx";
import { OfferForm } from "./components/Offer/OfferForm.jsx";
import { Offers } from "./components/Offer/Offers.jsx";
import { AccountForm } from "./components/Account/AccountForm.jsx";
import { Accounts } from './components/Account/Accounts.jsx'
import { Register }from "./components/Register.jsx";
import { Historial } from "./components/Transfer/Historial.jsx"
import { NotFoundPage } from "./Pages/NotFoundPage/NotFoundPage.jsx";
import { Deposit } from "./components/deposit/Deposit.jsx"
import { OffersAdmin } from "./components/Offer/OffersAdmin.jsx";
import Settings from "./components/SideBarClient/Settings/Settings.jsx";
import { Transfer } from "./components/Transfer/Transfer.jsx";
import { Grafica } from "./components/Grafica/Grafica.jsx";



export const routes = [
    { path: '/', element: <AuthPage />}, 
    { path: '/Transfer', element: <Transfer />},
    { path: '/dashboardClient', element: <DashboardUser />},
    { path: '/depositoClient', element: <Deposit />},
    { path: '/accounts', element: <Accounts />},
    { path: '/dashboard', element: <Dashboard />},  
    { path: '/offers', element: <Offers />},  
    { path: '/offersAdmin', element: <OffersAdmin />},
    { path: '/account', element: <AccountForm />},  
    { path: '/offer', element: <OfferForm />},  
    { path: '/registerClient', element: <Register />} ,
    { path: '/settings', element: <Settings />},
    { path: '/grafica', element: <Grafica />},
    { path: '/historial', element: <Historial />},
    { path: '*', element: <NotFoundPage />}
  
]   
