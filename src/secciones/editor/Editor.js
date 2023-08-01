import React, { useRef, useContext, useEffect } from 'react';
import ToolbarEditor from 'secciones/editor/ToolbarEditor';
import { emailsContexto } from 'contexts/ProvedorEmails';

function Editor({ quillRef, quill }) {

  const refContenido = useRef(null);
  const { setRefTexto, textoActual, setTextoActual } = useContext(emailsContexto);

  const actualizarDatos = () => {
    setRefTexto(refContenido.current.unprivilegedEditor.getHTML());
    setTextoActual(refContenido.current.unprivilegedEditor.getContents());
  }

  useEffect(() => {
    if (textoActual !== null) {
      refContenido.current.setEditorContents(refContenido.current.editor, textoActual);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="text-editor">
        <ToolbarEditor />
        <div
          ref={quillRef}
          onChange={actualizarDatos}
        />
      </div>
    </React.Fragment>
  )
} export default Editor;