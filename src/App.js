import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Table from 'tables/Table.js';
import PageClientes from 'Pages/PageClientes.js';
import PageEditor from 'Pages/PageEditor.js';
import ProvedorEmails from 'contexts/ProvedorEmails.js'
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageClientes/>,
    },
    {
      path: "/editor",
      element: <PageEditor/>
    },
    {
      path: "/table",
      element: <Table/>
    }
  ]);
  
  return (
    <ProvedorEmails>
      <RouterProvider router={router} />
    </ProvedorEmails>
  );
}

export default App;
