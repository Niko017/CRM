import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'hooks/use-popover';
import { AccountPopover } from './account-popover';

const SIDE_NAV_WIDTH = 680;
const TOP_NAV_HEIGHT = 64;

const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const { nombreEnvio, correo } = JSON.parse(sessionStorage.getItem('user'));

  const barra = lgUp ? {
    marginLeft: 33,
    minHeight: TOP_NAV_HEIGHT,
    px: 2
  } : {
    minHeight: TOP_NAV_HEIGHT,
    px: 2
  }


  return (
    <>
      <Box
        component="header"

        sx={{
          backdropFilter: 'blur(5px)',
          backgroundColor: '#DC0B2A',
          position: 'static',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `100%`
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent={"space-between"}
          spacing={2}
          sx={barra}
        >
          {!lgUp && <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >

            <IconButton onClick={onNavOpen}>
              <SvgIcon fontSize="small">
                <Bars3Icon color='#FFF' />
              </SvgIcon>
            </IconButton>

          </Stack>}
          <Typography
            sx={{ marginLeft: 5 }}
            color='#ded9da'
            variant="h3"
            fontSize={lgUp ? 18 : 18}
          >Bienvenid@ a Gesticyc
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >

            <Typography
              sx={{ marginRight: 10 }}
              color='#ded9da'
              variant="h4"
              fontSize={lgUp ? 30 : 18}
            >{nombreEnvio}
            </Typography>
            {
              lgUp &&
              <Typography
                style={{ display: 'block', marginRight: 20 }}
                color='#ded9da'
                variant="body1"
              >{correo}
              </Typography>
            }

            {/* WIDGETS PARA NAVEGAR */}
            {/* <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
            {/*  <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip> */}
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src={require('assets/avatar.png')}
            />
          </Stack>
        </Stack>
        <AccountPopover
          anchorEl={accountPopover.anchorRef.current}
          open={accountPopover.open}
          onClose={accountPopover.handleClose}
        />
      </Box>
    </>
  );
}; export default TopNav;

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
