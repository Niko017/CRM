import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const navigate = useNavigate();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      navigate('/');
      sessionStorage.clear();
    },
    [onClose, navigate]
  );

  const { nombreEnvio } = JSON.parse(sessionStorage.getItem('user')) ?? 'User';

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          User
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          { nombreEnvio ?? 'User' }
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Salir 
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
