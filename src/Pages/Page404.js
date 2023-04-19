import { Link } from 'react-router-dom';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';

const Page404 = () => (
  <>
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Under development"
              src={require('assets/error-404.png')}
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            404: La pagina que estas buscando no se encuentra aqui.
          </Typography>
          <Button
            component={Link}
            to="/"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            )}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Volver al Panel de Control
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page404;