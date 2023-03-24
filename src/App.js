import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Table from 'tables/Table.js';
import PageClientes from 'Pages/PageClientes.js';
import PageEditor from 'Pages/PageEditor.js';
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
    <RouterProvider router={router} />
  );
}

export default App;
