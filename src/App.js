import PageClientes from 'Pages/PageClientes.js';
import PageEditor from 'Pages/PageEditor.js';
import PageLogin from 'Pages/auth/PageLogin';
import PageHome from 'Pages/PageHome';
import ProvedorEmails from 'contexts/ProvedorEmails.js';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Page404 from 'Pages/Page404';
import PageRegister from 'Pages/auth/PageRegister';



function App({children}) {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Page404 />,
    },
    {
      path: "/email",
      element: <PageClientes/>,
    },
    {
      path: "/editor",
      element: <PageEditor/>,
    },
    {
      path: "/login",
      element : <PageLogin />
    },
    {
      path: '/register',
      element : <PageRegister />
    }
  ]);
  
  return (
    <ProvedorEmails>
      <RouterProvider router={router}/>
    </ProvedorEmails>
  );
}

export default App;
