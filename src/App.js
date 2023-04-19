import PageClientes from 'Pages/PageClientes.js';
import PageEditor from 'Pages/PageEditor.js';
import PageLoginRegister from 'Pages/auth/PageLoginRegister';
import PageHome from 'Pages/PageHome';
import ProvedorEmails from 'contexts/ProvedorEmails.js';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Page404 from 'Pages/Page404';



function App({children}) {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Page404 />,
    },
    {
      path: "/",
      element:<PageHome />
    },
    {
      path: "/clientes",
      element: <PageClientes/>,
    },
    {
      path: "/editor",
      element: <PageEditor/>,
    },
    {
      path: "/login",
      element : <PageLoginRegister />
    },
  ]);
  
  return (
    <ProvedorEmails>
      <RouterProvider router={router}/>
    </ProvedorEmails>
  );
}

export default App;
