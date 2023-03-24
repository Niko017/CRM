import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mdi/react';
import { mdiAccountMultiple } from '@mdi/js';
import { mdiViewDashboard } from '@mdi/js';
import { Link } from 'react-router-dom';

function SideNav(){
    return(
    <React.Fragment>
    <nav aria-label="main mailbox folders">
    <List>
    <ListItem disablePadding>
        <Link to="/">
        <ListItemButton>
        <ListItemIcon>
        <Icon path={mdiViewDashboard} size={1} />
        </ListItemIcon>
        <ListItemText primary="" />
        </ListItemButton>
        </Link>
    </ListItem>
    <ListItem disablePadding>
        <Link to="/editor">
        <ListItemButton>
        <ListItemIcon>
<Icon path={mdiAccountMultiple} size={1} />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
        </ListItemButton>
        </Link>
    </ListItem>
    </List>
    </nav>
    </React.Fragment>
    )
}
export default SideNav;