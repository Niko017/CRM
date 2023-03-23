import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Table from './tables/Table.js';
import PageClientes from './Pages/PageClientes.js';
import PageEditor from 'Pages/PageEditor.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Table/>
        <PageClientes/>
        <PageEditor/>
      </header>
    </div>
  );
}

export default App;
