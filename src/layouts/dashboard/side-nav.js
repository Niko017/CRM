import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cog8ToothIcon from '@heroicons/react/24/solid/Cog8ToothIcon';
import 'simplebar-react/dist/simplebar.min.css';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Modal,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import sending from 'assets/sending.png'

//import { Logo } from 'src/components/logo';
import { Scrollbar } from 'components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import LogoCreditoYCaucion from 'components/svg/LogoCreditoYCaucion';
import LogoFrancesYGarcia from 'components/svg/LogoFrancesYGarcia';

function SideNav(props) {

  const caja = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const { open, onClose } = props;
  const pathname = useLocation();
  const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'));
  const [modal, setModal] = useState(false);

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        },
      }}
    >
      <Box

        sx={{

          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'inline-flex',
              height: 60,
              width: 400
            }}
          >
            <LogoFrancesYGarcia />

          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname.pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
          <div style={{ position: 'absolute', left: '32px', bottom: '20px' }}>
            <Divider sx={{ borderColor: 'neutral.700', marginTop: 4 }} />
            <Typography
              sx={{ marginTop: 2, display: 'block' }}
              color='#ded9da'
              textAlign='center'
              fontSize={12}
            > Gestycyc versión 1.0.0
            </Typography>
            <Typography
              sx={{ marginTop: 2, display: 'block' }}
              color='#ded9da'
              textAlign='center'
              fontSize={12}
            >Nº compilación: 270
            </Typography>
            <Typography
              sx={{ marginTop: 2, display: 'block' }}
              color='#ded9da'
              textAlign='center'
              fontSize={12}
            >Ultima actualización: 07/08/2023
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={() => setModal(true)} sx={{ padding: 0 }}>
                <Typography
                  sx={{ marginTop: 2, display: 'block' }}
                  color='#ded9da'
                  textAlign='center'
                  fontSize={12}

                >Acerca de
                  <PriorityHighIcon color='error' fontSize='small' />
                </Typography>
              </Button>
            </div>
          </div>
        </Box>
      </Box>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
      >
        <Box sx={caja}>
          <Typography sx={{ marginTop: 2 }} textAlign='center' variant='h5'>Framework React</Typography>
          <Divider sx={{ borderColor: 'neutral.700', marginTop: 1, marginBottom: 1 }} />
          <Typography color='#a39e9f' textAlign='center' fontSize={20}>Versión 18.2.0</Typography>
          <Link style={{ textDecoration: 'none' }} to="https://es.react.dev/"><Typography color='#a39e9f' textAlign='center' fontSize={20}>Web Site: https://es.react.dev/</Typography></Link>

          <Typography sx={{ marginTop: 2 }} textAlign='center' variant='h5'>Información de version</Typography>
          <Divider sx={{ borderColor: 'neutral.700', marginTop: 1, marginBottom: 2 }} />
          <Typography color='#a39e9f' textAlign='center' fontSize={20}>Gesticyc Versión 1.0.0</Typography>
          <Typography color='#a39e9f' textAlign='center' fontSize={20}>Numero de compilación: 270</Typography>
          <Typography color='#a39e9f' textAlign='center' fontSize={20}>Ultima actualización: 07/08/2023</Typography>
          <Typography sx={{ marginTop: 2 }} textAlign='center' variant='h5'>Servicios conectados</Typography>
          <Divider sx={{ borderColor: 'neutral.700', marginTop: 1, marginBottom: 2 }} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <img src={sending} width={30} />
            <Typography color='#566ad1' textAlign='center' fontSize={18}>Sendin Blue (Email Marketing)</Typography>
          </div>

        </Box>
      </Modal>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#868889',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#868889',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}; export default SideNav;

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
