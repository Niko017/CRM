import React, { useState } from 'react'
import ImageResize from 'quill-image-resize-module-react';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import FormControl from '@mui/material/FormControl';
import { ImageDrop } from 'quill-image-drop-module';
import ImageIcon from '@mui/icons-material/Image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import 'editor/editor.css';
import Quill from 'quill';

// Registrar los módulos antes de renderizar el componente.
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);


  const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
      <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
      <path
        className="ql-stroke"
        d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
      />
    </svg>
  );
  
  // Redo button icon component for Quill editor
  const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
      <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
      <path
        className="ql-stroke"
        d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
      />
    </svg>
  );

  function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  function insertRemoteImage(){
    //console.log(evento);
    console.log(this.quill);
    const range = this.quill.getSelection();
    let url = prompt("Introduce una url");
    console.log(url);
    if(url===null || url!==""){
      this.quill.insertEmbed(range.index, 'image', url, Quill.sources.USER_PASTE);
    }else{
      return;
    }
}

  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
  ];
  Quill.register(Font, true);


// Modules object for setting up the Quill editor
  export const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        undo: undoChange,
        redo: redoChange,
        imagenremota: insertRemoteImage,
      },
    },
    imageDrop: true,
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
      handleStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: '#4040ff'
      },
      displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: '#FFF'
      },
      toolbarStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: '#FFF'
      },
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
      },
  };

// Formats objects for setting up the Quill editor
export const formats = [
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "header",
  "font",
  "size",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block"
];


function ToolbarEditor(){

  const [imgModal,setImgModal] = useState(false);
  const [imgUrl,setImgUrl] = useState("https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png");

  const imagenEstilos = {
    marginRight:'30px',
    width:300,
    height:300,
    objectFit:'contain',
  }

  const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
      display:'flex',
      width: 'auto'
  }

    return(
<React.Fragment>
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
          <option value="large">Tamaño 1</option>
          <option value="medium">Tamaño 2</option>
          <option value="small">Tamaño 3</option>
          <option value="extra-small">Tamaño 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
          <option value="1">Titulo</option>
          <option value="2">Subtitulo</option>
          <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-imagenremota"> <WallpaperIcon/></button>
      <button className='ql-image'><ImageIcon/></button>
      <button className="ql-video" />
    </span>
      <span className="ql-formats">
      <button className="ql-formula"/>
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
          <CustomUndo />
      </button>
      <button className="ql-redo">
          <CustomRedo />
      </button>
    </span>
  
  <Modal
    open={imgModal}
    onClose={()=>{setImgModal(false)}}>
    <Box sx={modalStyle}>
        <img src={imgUrl} style={imagenEstilos}  alt="Imagen para Insertar"/>
        <Stack spacing={2} justifyContent="center" alignItems="center">
            <h2 style={{margin:'10px 0px'}}>Imagen</h2>
            <div style={{margin:'10px 0px'}}>
              <FormControl>
                  <TextField
                  fullWidth
                  label="Enlace de la Imagen"
                  onChange={(event)=>{
                  setImgUrl(event.target.value);
                  }}/>
              </FormControl>
            </div>
            <div style={{margin:'10px 0px'}}>
                <button  type='button'>Insertar Imagen</button>
                <Button onClick={()=>{
                  setImgModal(false);
                  setImgUrl('https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png');
                  }}>Cerrar</Button>
            </div>
        </Stack>
      </Box>
   </Modal>
   </div>
</React.Fragment>)
}export default ToolbarEditor;