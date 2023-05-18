import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CreateTheme from 'theme/index';
import { ThemeProvider } from '@mui/material/styles';
import SideNav from './side-nav';
import TopNav from './top-nav';

const SIDE_NAV_WIDTH = 280;
const tema = CreateTheme();

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

const Layout = ((props) => {
  const { children } = props;
  const pathname = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    [pathname]
  );

  return (
    <>
    <ThemeProvider theme={tema}>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      </ThemeProvider>
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
      
    </>
  );
});  export default Layout;