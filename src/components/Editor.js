import React, { useRef, useState} from 'react';
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
import Contenido from 'components/Contenido'
import Fuentes from 'components/Fuentes';

function Editor (){

    const [formato, setFormato] = useState([]);
    const [alineo, setAlineo] = useState("");
    const [font, setFont] = useState("");
    const [type, setType] = useState("");
    const [list,setList] = useState("");
    const [contenido,setContenido] = useState("");
    const [size, setSize] = useState(8);

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
        setType(event.target.value);
    }

    const handleList = (event)=>{
        setList(event.target.value);
    }

    const editarTexto = (event)=>{
        let inicioSelect = cajaTexto.current.selectionStart;
        let finSelect = cajaTexto.current.selectionEnd;
        let texto = cajaTexto.current.value;
        let textoFinal  = texto.substring(inicioSelect,finSelect);
        let principio = texto.substring(0,inicioSelect);
        let final = texto.substring(finSelect, texto.lenght-1);
        console.log(cajaTexto);
        cajaTexto.current.innerHTML=`${principio}<strong>${textoFinal}</strong> ${final}`;
    }

    const insertarFoto = ()=>{
        
    }
    console.log(contenido);

    return(
        <React.Fragment>
            <Paper elevation={1}
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                }}>
                <ToggleButtonGroup aria-label="text formatting" value={formato} onChange={handleFormat}>
                    <ToggleButton onClick={editarTexto} value="bold" aria-label="bold">
                        <FormatBoldIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={editarTexto} value="italic" aria-label="italic">
                        <FormatItalicIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={editarTexto} value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon/>
                    </ToggleButton>
                    <ToggleButton onClick={editarTexto} value="strike" aria-label="strike">
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
                            onChange={handleType}
                            defaultValue={'normal'}
                            >
                                <MenuItem value={10}>Normal</MenuItem>
                                <MenuItem value={20}>H1</MenuItem>
                                <MenuItem value={30}>H2</MenuItem>
                                <MenuItem value={30}>H3</MenuItem>
                                <MenuItem value={30}>H4</MenuItem>
                                <MenuItem value={30}>Blockquote</MenuItem>
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
                    <Button onClick={insertarFoto} value="bold" aria-label="bold"><InsertPhotoIcon/></Button>
                    <Button value="bold" aria-label="bold"><LinkIcon/></Button>
                    <Button value="bold" aria-label="bold"><AddReactionIcon/></Button>
                    </ButtonGroup>
            </Paper>
            <TextareaAutosize color='aux' value={contenido} className='textCustom' ref={cajaTexto} id="idCaja" onChange={(event)=>setContenido(event.target.value)}></TextareaAutosize>
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