import React, { useContext, useEffect, useRef, useState} from 'react';
import { emailsContexto } from 'contexts/ProvedorEmails';
import { generarUUID } from 'functions/Funciones.js';
import { useNavigate } from "react-router-dom";
import 'components/editor.css';
/////////////////////////////ICONOS DE MATERIAL///////////////////////////////////////
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ListIcon from '@mui/icons-material/List';
import LinkIcon from '@mui/icons-material/Link';
/////////////////////////FIN ICONOS DE MATERIAL///////////////////////////////////

///////////////////////COMPONENTES MATERIAL UI///////////////////////////////////
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Alerta from 'components/Alerta.js';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
///////////////////////COMPONENTES MATERIAL UI///////////////////////////////////


function Editor (){

    //varibles para controlar todo el texto.
    const { setRefTexto } = useContext(emailsContexto);
    const [listados,setListados] = useState([]);
    const [formato, setFormato] = useState([]);
    
    const [coordenadas,setCoordenadas] = useState({});

    const [linkImagen,setLinkImagen] = useState("");
    const [seleccion,setSeleccion] = useState("");
    const [mensaje,setMensaje] = useState("");
    const [alineo, setAlineo] = useState("");
    const [type, setType] = useState("p");
    const [font, setFont] = useState("");
    const [link,setLink] = useState("");
    const [list,setList] = useState("");

    const [eventTag,setEventTag] = useState(null);
    const cajaTexto = useRef(null);

    const [size, setSize] = useState(21);
    
    const [messageOpen,setMessageOpen] = useState(false);
    const [linkOpen,setLinkOpen] = useState(false);
    const [imgOpen,setImgOpen] = useState(false);
    const navigate = useNavigate();

    const [srcImg,setSrcImg] = useState('https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png');
    const [sizeImg,setSizeImg] = useState({
        marginRight:'30px',
        width:500,
        height:500,
        objectFit:'contain',
    })
    let activo = {
        bold:false,
        italic:false,
        underlined:false,
        stroke:false,
    };

    const handleImgOpen = ()=>{
        setImgOpen(true);
    }

    const handleLinkOpen = ()=>{
        setLinkOpen(true);
    }

    const handleLinkClose = ()=>{
        setLinkOpen(false);
    }

    const handleImgClose = ()=>{
        setImgOpen(false);
        setSrcImg('https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png');
    }
    
    const handleFormat = (event, nuevoFormato) => {
        setFormato(nuevoFormato);
        let formatosFaltantes = formato.filter( elemento => !nuevoFormato.includes(elemento));
        if(formatosFaltantes.length!==0 && eventTag!==null){
            switch (formatosFaltantes[0]){
                case "underlined":
                    limpiarTagHtml('u');
                    break;
                case "strike":
                    limpiarTagHtml('s');
                    break;
                case "bold":
                    limpiarTagHtml('b');
                    break;
                case "italic":
                    limpiarTagHtml('i')
                    break;
                default:
                    mensajeError("Error al quitar los estilos");
            }
        }
      }

    const handleAlign = (event, nuevaAlineacion)=>{
        setAlineo(nuevaAlineacion);
        cajaTexto.current.style=`text-align:${nuevaAlineacion};
        min-height: 400px; font-size:${size}px; padding: 20px;`;
    }

    const handleFont = (event)=>{
        setFont(event.target.value);
    }

    const handleSize = (event)=>{
        setSize(event.target.value);     
    }

    const handleType = (event)=>{
        if(event.target.value!==""){
            setType(event.target.value);
        }else{
            mensajeError("No hay ninguna opcion marcada");
        }
    }

    const handleList = (event)=>{
        let tipoLista = event.target.value;
        setList(tipoLista);
        if(tipoLista==="ordenada"){
            setListados([...listados,tipoLista]);
            setList(null);
        }else if(tipoLista==="desordenada"){
            setListados([...listados,tipoLista]);
            setList(null);
        }
    }

    const handleErrorClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
          setMessageOpen(false);
    }

    const anyadirTitulo = (tag)=>{
        cajaTexto.current.innerHTML+=`<${tag} style="display: inline-block">Titulo</${tag}>&nbsp;`;
        setRefTexto(cajaTexto);
    }

    const addTag = (event) => {
        anyadirTitulo(event.target.value);
    }

    const estilarTexto = (tag)=>{
        let fraseSeleccionada = window.getSelection().toString();
        let contenido  = cajaTexto.current.innerHTML;
        let regex = new RegExp(`${fraseSeleccionada}`,'g');
        let nuevoContenido = contenido.replace(regex,`<${tag}>${fraseSeleccionada}</${tag}>`);
        cajaTexto.current.innerHTML = nuevoContenido;
        setRefTexto(cajaTexto);
    }

    const editarTexto = ()=>{
        if(activo.bold && window.getSelection().toString()!==''){
            estilarTexto('b');
        }else if(activo.italic && window.getSelection().toString()!==''){
            estilarTexto('i');
        }else if(activo.underlined && window.getSelection().toString()!==''){
            estilarTexto('u');
        }else if(activo.stroke && window.getSelection().toString()!==''){
            estilarTexto('s');
        }
    }

    const editarImagen = (event)=>{
        const archivos = event.target.files;

        if (!archivos || !archivos.length) {
            return;
          }
          const primerArchivo = archivos[0];

          const objectURL = URL.createObjectURL(primerArchivo);

          setSrcImg(objectURL);
        }

    const insertarImagen = ()=>{
        if(linkImagen!==""){
            cajaTexto.current.innerHTML+=`<div style="overflow:hidden; resize:both; width:${sizeImg.width}px; height:${sizeImg.height}px; display:flex;justifi-content:center;"><a href="${linkImagen}"><img width="100%" src="${srcImg}" style="object-fit: contain;"/></a></div><br>`;
            setLinkImagen("");
        }else{
        cajaTexto.current.innerHTML+=`<div style="overflow:hidden; resize:both; width:auto; height:auto; display:flex;justifi-content:center;"><img width="100%" src="${srcImg}" style="object-fit: contain;"/></div><br>`;
        }
        handleImgClose();
        setRefTexto(cajaTexto);
    }

    const establecerParrafo = async (nodo, formatoActual) => {
        let tipoParrafo = nodo.nodeName;
        let nuevoFormato = [...formatoActual];
        if (tipoParrafo === "U" || tipoParrafo === "S" || tipoParrafo === "I" || tipoParrafo === "B") {
          switch (tipoParrafo) {
            case "U":
                activo = {...activo, underlined: true };
                nuevoFormato = [...nuevoFormato,"underlined"];
                break;
            case "S":
                activo = {...activo, stroke: true };
                nuevoFormato = [...nuevoFormato,"strike"];
                break;
            case "I":
                activo = {...activo, italic: true };
                nuevoFormato = [...nuevoFormato,"italic"];
                break;
            case "B":
                activo = {...activo, bold: true };
                nuevoFormato = [...nuevoFormato,"bold"];
                break;
            default:
                mensajeError('Error al estilar las letras.');
                return;
          }
          await establecerParrafo(nodo.parentElement, nuevoFormato);
        } else {
          await setFormato(nuevoFormato);
          return;
        }
    }

    const detector = (event)=>{
        activo = {...activo,
            bold:false,
            italic:false,
            stroke:false,
            underlined:false,
        }
        setFormato([]);
        let tipoParrafo = event.nativeEvent.target;
        //Filtro para actualizar estado en caso de no detectar nada.
        if(tipoParrafo.nodeName!=="DIV"){
            establecerParrafo(tipoParrafo,formato);
        }
        //Filtro para quitar formato de las letras.
        if(tipoParrafo.nodeName==="U" || tipoParrafo.nodeName==="S" || tipoParrafo.nodeName==="I" || tipoParrafo.nodeName==="B"){
            setEventTag(event);
        }else{
            setEventTag(null);
        }
    }

    const limpiarTagHtml = (elemento)=>{
        let evento = eventTag.nativeEvent.target;
        if(evento.nodeName!=="DIV" && evento!==undefined){
            let filtro = new RegExp(`(<[${elemento}]+>)|(<[/${elemento}]+>)`,'gi');
            let contenidoTotal = cajaTexto.current.innerHTML;
            let nuevoContenido = contenidoTotal.replace(filtro,``);
            cajaTexto.current.innerHTML = nuevoContenido;
            setEventTag(null);
            setRefTexto(cajaTexto);
        }
    }

    const linkear = ()=>{
        let contenido  = cajaTexto.current.innerHTML;
        let regex = new RegExp(`${seleccion}`,'g');
        let nuevoContenido = contenido.replace(regex,`<a href="http://${link}">${seleccion}</a>&nbsp;`);
        cajaTexto.current.innerHTML = nuevoContenido;
        handleLinkClose();
        setRefTexto(cajaTexto);
    }

    const mensajeError = (mensaje)=>{
        setMensaje(mensaje);
        setMessageOpen(true);
    }

    const colorLetra = (event)=>{
        if(seleccion!==''){
            let contenidoTotal = cajaTexto.current.innerHTML;
            let filtro = new RegExp(`${seleccion}`,'g');
            let nuevoTexto = contenidoTotal.replace(filtro,`<span style="color:${event.target.value}">${seleccion}</span>&nbsp;`);
            cajaTexto.current.innerHTML = nuevoTexto;
            setRefTexto(cajaTexto);
        }
    }

    /////////////////////////////////////Estilos para los modales//////////////////////////////////
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        display:'flex'
      };
    ///////////////////////////////////Fin Estilos para los modales//////////////////////////////////

    const { emailsDatos, motivo } = useContext(emailsContexto);

    const enviarDatos=()=>{

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': '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'
      },
      body: JSON.stringify({
        sender: {name: 'Pepe', email: 'pepe69@yopmail.com'},
        to: emailsDatos.map((correo)=>{
          return {
              email: correo,
              name: correo,
          }
        }),
        textContent: cajaTexto.current.outerHTML,
        subject: motivo,
      })
    }

    fetch('https://api.sendinblue.com/v3/smtp/email', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  }

  useEffect(()=>{
    if(emailsDatos.length===0){
        navigate("/");
    }
  },[emailsDatos])

  

    return(
        <React.Fragment>
            <Paper elevation={1}
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                }}>
                <ToggleButtonGroup aria-label="text formatting" value={formato} onChange={handleFormat}>
                    <ToggleButton onClick={(event)=>{
                       activo = {...activo,bold:!activo.bold};
                        editarTexto(event);
                    }} value="bold" aria-label="bold">
                        <FormatBoldIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={(event)=>{
                         activo = {...activo,italic:!activo.italic};
                        editarTexto(event);
                    }} value="italic" aria-label="italic">
                        <FormatItalicIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={(event)=>{
                        activo = {...activo,underlined:!activo.underlined};
                        editarTexto(event);
                    }} value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={(event)=>{
                        activo = {...activo,stroke:!activo.stroke};
                        editarTexto(event);
                    }} value="strike" aria-label="strike">
                        <StrikethroughSIcon/>
                    </ToggleButton>
                    </ToggleButtonGroup>
                    <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <ToggleButtonGroup exclusive value={alineo} onChange={handleAlign}>
                    <ToggleButton onClick={editarTexto} value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton onClick={editarTexto} value="center" aria-label="centered">
                        <FormatAlignCenterIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={editarTexto} value="right" aria-label="right aligned">
                        <FormatAlignRightIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={editarTexto} value="justify" aria-label="justified">
                        <FormatAlignJustifyIcon/>
                    </ToggleButton>
                </ToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <Box sx={{ minWidth: 110 }}>
                    <FormControl fullWidth>
                        <FormGroup>
                            <InputLabel id="fuenteID">Titulos</InputLabel>
                            <Select
                            labelId="fuenteID"
                            id="demo-simple-select"
                            value={type}
                            label="Fuente"
                            onChange={(event)=>{
                                handleType(event);
                                addTag(event);
                            }}
                            defaultValue={'p'}
                            >
                                <MenuItem value={'p'}>Normal</MenuItem>
                                <MenuItem value={'h1'}>Encabezado 1</MenuItem>
                                <MenuItem value={'h2'}>Encabezado 2</MenuItem>
                                <MenuItem value={'h3'}>Encabezado 3</MenuItem>
                                <MenuItem value={'h4'}>Encabezado 4</MenuItem>
                                <MenuItem value={'blockquote'}>'Cita'</MenuItem>
                            </Select>
                        </FormGroup>
                    </FormControl>
                </Box>
                <Box sx={{ width: 100 }}>
                    <TextField
                            fullWidth
                            type="number"
                            label="Tamaño"
                            value={size}
                            onChange={handleSize}
                    />
                </Box>
                <Box sx={{ minWidth: 110 }}>
                    <FormControl fullWidth>
                        <FormGroup>
                            <InputLabel id="fuenteID">Fuente</InputLabel>
                            <Select
                            labelId="fuenteID"
                            id="demo-simple-select"
                            value={font}
                            label="Fuente"
                            onChange={handleFont}
                            >
                                <MenuItem value={null}>None</MenuItem>
                                <MenuItem value={10}>Arail</MenuItem>
                                <MenuItem value={20}>Times</MenuItem>
                                <MenuItem value={30}>Robot</MenuItem>
                            </Select>
                        </FormGroup>
                    </FormControl>
                </Box>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <Box sx={{ minWidth: 90 }}>
                    <FormControl fullWidth>
                        <FormGroup>
                            <InputLabel id="fuenteID"><ListIcon/></InputLabel>
                            <Select
                            labelId="fuenteID"
                            id="demo-simple-select"
                            value={list}
                            label="Fuente"
                            onChange={handleList}
                            >
                                <MenuItem value={null}>None</MenuItem>
                                <MenuItem value={'desordenada'}><FormatListBulletedIcon/></MenuItem>
                                <MenuItem value={'ordenada'}><FormatListNumberedIcon/></MenuItem>
                            </Select>
                        </FormGroup>
                    </FormControl>
                </Box>
                <ButtonGroup color='aux' variant="outlined" aria-label="outlined button group">
                    <Button onClick={handleImgOpen}><InsertPhotoIcon/></Button>
                    <Button onClick={()=>{
                        if(window.getSelection().toString()!==''){
                            handleLinkOpen();
                            setSeleccion(window.getSelection().toString());
                        }
                    }}><LinkIcon/></Button>
                    <IconButton color="inherit" aria-label="Subir Imagen" component="label">
                        <input onChange={colorLetra} hidden type="color"/>
                        <FormatColorFillIcon />
                    </IconButton>
                </ButtonGroup>
            </Paper>
            <Modal
                open={linkOpen}
                onClose={handleLinkClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                >
                <Box sx={{ ...style, width: 'auto' }}>
                    <Stack spacing={2}>
                            <FormControl>
                                <TextField
                                    fullWidth
                                    label="URL"
                                    value={link}
                                    onInput={(event)=>{
                                        setLink(event.target.value);
                                    }}
                                    />
                            </FormControl>
                            <div>
                                <Button variant="contained" onClick={linkear}>Linkear</Button>
                                <Button onClick={handleLinkClose}>Cerrar</Button>
                            </div>
                    </Stack>
                </Box>
            </Modal>
            <Modal
                open={imgOpen}
                onClose={handleImgClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                >
        <Box sx={{ ...style, width: 'auto' }}>
            <img src={srcImg} style={sizeImg}  alt="Imagen para Insertar"/>
            <Stack spacing={2} justifyContent="center" alignItems="center">
                <h2 style={{margin:'10px 0px'}}>Tamaño Imagen</h2>
                <div style={{margin:'10px 0px'}}>
                    <FormControl>
                        <TextField
                            fullWidth
                            type="number"
                            label="Ancho"
                            onChange={(event)=>{
                                setSizeImg({...sizeImg,width:`${event.target.value}px`});
                            }}/>
                        <TextField
                            fullWidth
                            type="number"
                            label="Alto"
                            onChange={(event)=>{
                                setSizeImg({...sizeImg,height:`${event.target.value}px`});
                            }}/>
                        <TextField
                        fullWidth
                        label="Enlace de la Imagen"
                        onChange={(event)=>{
                            setSrcImg(event.target.value);
                        }}/>
                        <TextField
                        fullWidth
                        label="Link para vincular"
                        onChange={(event)=>{
                            setLinkImagen(event.target.value);
                        }}/>
                    </FormControl>
                </div>
                <div style={{margin:'10px 0px'}}>
                    <Button variant="contained" onClick={insertarImagen}>Insertar Imagen</Button>
                    {/* <IconButton color="primary" aria-label="Subir Imagen" component="label">
                        <input onChange={editarImagen} hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton> */}
                    <Button onClick={handleImgClose}>Cerrar</Button>
                </div>
            </Stack>
        </Box>
      </Modal>
        <Snackbar open={messageOpen} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
            <Alerta onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                {mensaje}
            </Alerta>
        </Snackbar>

        <div className='textCustom' ref={cajaTexto}
            onClick={detector}
            id='pruebas'
            contentEditable={true}
            suppressContentEditableWarning={true}
            onDragEnter={(event)=>{
                event.target.classList.add("marcoDrop");
                }}
            onDragLeave={(event)=>{
                event.target.classList.remove("marcoDrop");
            }}
            onDrop={(event)=>{
                event.preventDefault();
                if(event.target.id==='pruebas'){
                event.target.classList.remove("marcoDrop");
                let reader = new FileReader();
                let archivo = event.dataTransfer.files[0];
                let terminacion = archivo.name.substring(archivo.name.length, archivo.name.length-5);
                if(terminacion===".html"){
                    reader.readAsText(archivo);
                reader.onload = ()=>{
                    cajaTexto.current.innerHTML+= reader.result;
                  };
                }
                reader.onerror = function() {
                    console.log(reader.error);
                    mensajeError("Error al leer el archivo, Intentalo de nuevo");
                  }
                }else{
                    return;
                }
                
               event.target.classList.remove("marcoDrop")
            }}
            onMouseOver={(event)=>{
                if(event.target.nodeName==="IMG"){
                    event.target.style='cursor: pointer;';
                }
            }}
            onSelectCapture={(event)=>{
                console.log("Evento de seleccion.");
                console.log(event);
                const selectedNode = event.nativeEvent.target;
            if(selectedNode.id !== 'pruebas'){
                // Obtener la posición y dimensiones del nodo en relación con su elemento padre
                const left = selectedNode.offsetLeft;
                const top = selectedNode.offsetTop;
                const right = selectedNode.offsetLeft + selectedNode.offsetWidth;
                const bottom = selectedNode.offsetHeight + selectedNode.offsetTop;

                // Obtener la posición del nodo en relación con el documento
                let currentElement = selectedNode;
                let totalOffsetLeft = left;
                let totalOffsetRight = right;
                let totalOffsetTop = top;
                let totalOffsetBot = bottom;
                while (currentElement && currentElement.offsetParent) {
                totalOffsetLeft += currentElement.offsetLeft;
                totalOffsetTop += currentElement.offsetTop;
                totalOffsetRight += currentElement.offsetLeft + currentElement.offsetWidth;
                totalOffsetBot += currentElement.offsetHeight + currentElement.offsetTop;
                currentElement = currentElement.offsetParent;
                }

                // Esquina superior izquierda del nodo.
                const topLeft = {
                    x: totalOffsetLeft,
                    y: totalOffsetTop
                };
                // Esquina superior derecha del nodo.
                const topRight = {
                    x:totalOffsetRight,
                    y:totalOffsetTop
                };
                //Esquina inferior izquierda del nodo.
                const botLeft = {
                    x:totalOffsetLeft,
                    y:totalOffsetBot
                };
                //Esquina inferior derecha del nodo.
                const botRight = {
                    x:totalOffsetRight,
                    y:totalOffsetBot
                };

                setCoordenadas({ topLeft, topRight, botLeft, botRight,});
                console.log('La esquina superior izquierda del nodo es:', topLeft);
                console.log('La esquina superior derecha del nodo es:', topRight);
                console.log('La esquina inferior izquierda del nodo es:', botLeft);
                console.log('La esquina inferior derecha del nodo es:', botRight);
                }
            }}
            style={{
                minHeight:'400px',
                fontSize:`${size}px`,
                padding:'20px',
            }}
            onSelect={()=>{
                setSeleccion(window.getSelection().toString());
            }}
            >
            {listados.map(lista=> lista==="desordenada" ? <ul><li></li></ul> : <ol><li></li></ol>)}
            
        </div>
            <Box sx={{
                margin:'auto',
                marginTop:'30px',
            }}>
                <Button variant="contained" onClick={enviarDatos}>Enviar</Button>
            </Box>
        </React.Fragment>
    );
}
export default Editor;