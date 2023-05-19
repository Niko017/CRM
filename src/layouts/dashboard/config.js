import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Panel',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Email Masivo',
    path: '/clientes',
    icon: (
      <SvgIcon fontSize="small">
        <EnvelopeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    path: '/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  }
];
