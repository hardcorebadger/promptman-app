import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Footer from '../components/PageFooter';
import {useTitle} from "../routing/Routes";

export default function Page404() {
    useTitle("Not Found")

    return (
    <Container maxWidth="sm">
        <Typography variant="h1" component="h1" align="center" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          Well, That went better in my head.
        </Typography>
        <Typography variant="body" component="p" align="center" gutterBottom>
          Try going to another page, cause this page was not found.
        </Typography>
        <Footer />
    </Container>
  );
}
