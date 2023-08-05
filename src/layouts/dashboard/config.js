import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import HomeModernIcon from '@heroicons/react/24/solid/HomeModernIcon';
import ChatBubbleBottomCenterIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Square3Stack3DIcon from '@heroicons/react/24/solid/Square3Stack3DIcon'
import DocumentChartBarIcon from '@heroicons/react/24/solid/DocumentChartBarIcon'
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
        <Square3Stack3DIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Notificación de ventas',
    path: '/emailPerso',
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleBottomCenterIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: (
      <SvgIcon>
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Logs',
    path: '/logs',
    icon: (
      <SvgIcon>
        <DocumentChartBarIcon />
      </SvgIcon>
    )
  }
];
