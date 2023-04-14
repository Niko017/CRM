import React, { useRef, useContext } from 'react';
import { emailsContexto } from 'contexts/ProvedorEmails';
import ToolbarEditor, { modules, formats } from 'editor/ToolbarEditor';
import ReactQuill from 'react-quill';
import 'editor/editor.css'

function Editor(){

    const refContenido = useRef(null);

    const { setRefTexto } = useContext(emailsContexto);

    const actualizarDatos = ()=>{
        setRefTexto(refContenido.current.editor.container.outerHTML);
    }

    return(
    <React.Fragment>
    <div className="text-editor">
      <ToolbarEditor/>
      <ReactQuill
      ref={refContenido}
        theme="snow"
        // value={contenido}
        onChange={actualizarDatos}
        placeholder={"Haz el mejor Newsleter...."}
        modules={modules}
        formats={formats}
      />
    </div>
    
    </React.Fragment>
    )
} export default Editor;