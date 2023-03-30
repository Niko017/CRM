import React, { useEffect, useRef, useState} from 'react';
import 'components/editor.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ListIcon from '@mui/icons-material/List';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LinkIcon from '@mui/icons-material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Modal from '@mui/material/Modal';
import Contenido from 'components/Contenido'
import Fuentes from 'components/Fuentes';
import { generarUUID } from 'functions/GenerarUUID';
import { getPosition } from 'functions/GenerarUUID';

function Editor (){

    const [formato, setFormato] = useState([]);
    const [alineo, setAlineo] = useState("");
    const [font, setFont] = useState("");
    const [type, setType] = useState("p");
    const [list,setList] = useState("");
    const [contenido,setContenido] = useState("");
    const [size, setSize] = useState(21);
    const [cajas, setCaja] = useState([]);
    const [imgOpen,setImgOpen] = useState(false);
    const [srcImg,setSrcImg] = useState('https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png');
    const [sizeImg,setSizeImg] = useState({
        width:500,
        height:500,
        objectFit:'contain',
    })
    const [activo,setActivo] = useState({
        bold:false,
        italic:false,
        underlined:false,
        stroke:false,
    });
    const[estilo,setEstilo] = useState([<div>{contenido}</div>]);

    const handleImgOpen = ()=>{
        setImgOpen(true);
    }

    const handleImgClose = ()=>{
        setImgOpen(false)
    }

    const addTag = (event) => {
        let tagDinamico = document.createElement(`${event.target.value}`);
        tagDinamico.setAttribute('key',`${generarUUID()}`);
        setCaja([...cajas,event.target.value]);
    }

    const removeTag = ()=>{
        setCaja([...cajas, <></>])
    }

    const cajaTexto = useRef(null);

    const handleFormat = (event, nuevoFormato) => {
        setFormato(nuevoFormato);
      };

    const handleAlign = (event, nuevaAlineacion)=>{
        setAlineo(nuevaAlineacion);
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
            alert("No hay ninguna opcion marcada");
        }
    }

    const handleList = (event)=>{
        setList(event.target.value);
    }

    const editarTexto = (event)=>{
        if(!activo.bold && window.getSelection().toString()!==''){
            let fraseSeleccionada = window.getSelection().toString();
            for(let letra of fraseSeleccionada){
                console.log(letra);
                if(letra === '\\'){
                    console.log("\\");
                    console.log(letra);
                }
            }
            let estructura = cajaTexto.current.outerHTML;
        }
    }

    const editarImagen = (event)=>{
        const archivos = event.target.files;

        if (!archivos || !archivos.length) {
            event.target.src = "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png";
            return;
          }
          const primerArchivo = archivos[0];

          const objectURL = URL.createObjectURL(primerArchivo);

          setSrcImg(objectURL);
    }

    const borrarParrafo = (event)=>{
        if((event.key === 'Backspace' || event.key === 'Delete') && event.target.textContent=== '' && cajas.length>1){
            event.target.remove();
        }else{ return }    
    }

    ///////////////////////////////////Estilos para los modales//////////////////////////////////
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
      };
    ///////////////////////////////////Fin Estilos para los modales//////////////////////////////////    

    return(
        <React.Fragment>
            <Paper elevation={1}
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                }}>
                <ToggleButtonGroup aria-label="text formatting" value={formato} onChange={handleFormat}>
                    <ToggleButton onClick={(event)=>{
                        setActivo({...activo,bold:!activo.bold});
                        editarTexto(event);
                    }} selected={activo.bold} value="bold" aria-label="bold">
                        <FormatBoldIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={(event)=>{
                        editarTexto(event);
                        setActivo({...activo,italic:!activo.italic});
                    }} value="italic" aria-label="italic">
                        <FormatItalicIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={(event)=>{
                        editarTexto(event);
                        setActivo({...activo,underlined:!activo.underlined});
                    }} value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={(event)=>{
                        editarTexto(event);
                        setActivo({...activo,stroke:!activo.stroke})
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
                            <InputLabel id="fuenteID">Tipo</InputLabel>
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
                    <Button onClick={handleImgOpen} value="bold" aria-label="bold"><InsertPhotoIcon/></Button>
                    <Button value="bold" aria-label="bold"><LinkIcon/></Button>
                    <Button value="bold" aria-label="bold"><AddReactionIcon/></Button>
                    </ButtonGroup>
            </Paper>

            <Modal
                open={imgOpen}
                onClose={handleImgClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                >
        <Box sx={{ ...style, width: 'auto' }}>
            <img src={srcImg} style={sizeImg}  alt="Imagen para Insertar"/>
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
        </FormControl>
        <Button variant="contained" component="label">Subir Imagen
            <input onChange={editarImagen} type="file" hidden/>
        </Button>
          <Button onClick={handleImgClose}>Cerrar Modal</Button>
        </Box>
      </Modal>

        <div className='textCustom' ref={cajaTexto} onChange={(event)=>{
                setContenido(event.target.value);
            }}
            id='pruebas'
            contentEditable={true}
            suppressContentEditableWarning={true}
            style={{
                minHeight:'400px',
                fontSize:`${size}px`,
                padding:'20px',
            }}>
            {}
            {cajas.map(tag =>{
                switch(tag){
                    case 'h1':
                        return(<h1 key={generarUUID()}>Tutulo 1</h1>);
                    case 'h2':
                        return(<h2 key={generarUUID()}>Tutulo 2</h2>);
                    case 'h3':
                        return(<h3 key={generarUUID()}>Titulo 3</h3>);
                    case 'h4':
                        return(<h4 key={generarUUID()}>Titulo 4</h4>);
                    case 'blockquote':
                        return (<blockquote key={generarUUID()}>Cita Ejemplo</blockquote>)
                }
            })}
        </div>
            <Box sx={{
                margin:'auto',
                marginTop:'30px',
            }}>
                
                <Button variant="contained">Enviar</Button>
            </Box>
        </React.Fragment>
    );
}
export default Editor;