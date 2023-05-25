import React, { useRef, useContext, useEffect } from 'react';
import ToolbarEditor, { modules, formats } from 'secciones/editor/ToolbarEditor';
import { emailsContexto } from 'contexts/ProvedorEmails';
import ReactQuill from 'react-quill';
import 'secciones/editor/editor.css'

function Editor(){

    const refContenido = useRef(null);

    const { setRefTexto, textoActual, setTextoActual } = useContext(emailsContexto);

    const actualizarDatos = ()=>{
        setRefTexto(refContenido.current.editor.container.firstElementChild.outerHTML);
        setTextoActual(refContenido.current.unprivilegedEditor.getContents())
    }
    useEffect(()=>{
      if(textoActual !== null){
        refContenido.current.setEditorContents(refContenido.current.editor, textoActual);
      }
    },[]);

    return(
    <React.Fragment>
    <div className="text-editor">
      <ToolbarEditor/>
      <ReactQuill
      ref={refContenido}
        theme="snow"
        onChange={actualizarDatos}
        placeholder={"Haz el mejor Newsleter...."}
        modules={modules}
        formats={formats}
      />
    </div>

    </React.Fragment>
    )
} export default Editor;