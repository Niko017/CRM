import { Link, useLocation } from 'react-router-dom'
import Cog8ToothIcon from '@heroicons/react/24/solid/Cog8ToothIcon';
import 'simplebar-react/dist/simplebar.min.css';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';

//import { Logo } from 'src/components/logo';
import { Scrollbar } from 'components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import LogoCreditoYCaucion from 'components/svg/LogoCreditoYCaucion';
import LogoFrancesYGarcia from 'components/svg/LogoFrancesYGarcia';

function SideNav(props){
  const { open, onClose } = props;
  const pathname = useLocation();
  const lgUp = useMediaQuery( theme => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
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
        </Box>
      </Box>
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
