import PageClientes from 'Pages/PageClientes.js'
import PageEditor from 'Pages/PageEditor.js'
import PageLogin from 'Pages/auth/PageLogin'
import PageHome from 'Pages/PageHome'
import ProvedorEmails from 'contexts/ProvedorEmails.js'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Page404 from 'Pages/Page404'
import PageRegister from 'Pages/auth/PageRegister'
import ProvedorFiltros from 'contexts/ProvedorFiltros'
import PagePlantillasEmail from 'Pages/PagePlantillasEmail'
import PageEmailPerso from 'Pages/PageEmailPerso'

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Page404 />,
    },
    {
      path: "/email",
      element: <PageClientes />,
    },
    {
      path: '/tipoEmail',
      element: <PagePlantillasEmail />,
    },
    {
      path: "/editor",
      element: <PageEditor />,
    },
    {
      path: "/",
      element: <PageLogin />
    },
    {
      path: "/emailPerso",
      element: <PageEmailPerso />
    },
  ]);

  return (
    <ProvedorFiltros>
      <ProvedorEmails>
        <RouterProvider router={router} />
      </ProvedorEmails>
    </ProvedorFiltros>
  );
}
export default App;