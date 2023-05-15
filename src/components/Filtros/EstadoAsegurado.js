import { useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { filtrosContexto } from 'contexts/ProvedorFiltros';

function EstadoAsegurado() {
    const { estadoAsegurado, setEstadoAsegurado } = useContext(filtrosContexto);
    const handleChange = event => setEstadoAsegurado(Number(event.target.value));
  return (
    <FormControl sx={{ flexShrink:2}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Estado</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={2} control={<Radio checked={ estadoAsegurado === 2 } onChange={handleChange} />} label="Activos" />
        <FormControlLabel value={1} control={<Radio checked={ estadoAsegurado === 1 } onChange={handleChange} />} label="Captacion" />
      </RadioGroup>
    </FormControl>
  );
}export default EstadoAsegurado;