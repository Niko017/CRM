import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import HomeModernIcon from '@heroicons/react/24/solid/HomeModernIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Email Masivo',
    path: '/email',
    icon: (
      <SvgIcon fontSize="small">
        <EnvelopeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tipos Email',
    path: '/tipoEmail',
    icon: (
      <SvgIcon fontSize="small">
        <HomeModernIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Email personalizado',
    path: '/emailPerso',
    icon: (
      <SvgIcon fontSize="small">
        <HomeModernIcon />
      </SvgIcon>
    )
  }
];
