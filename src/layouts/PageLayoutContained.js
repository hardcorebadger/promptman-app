import * as React from 'react';
import Container from '@mui/material/Container';
import {
    Box, Divider,
} from '@mui/material';

import PageHeaderStack from '../sections/PageHeaderStack';
import Footer from '../components/PageFooter';

export default function PageLayoutContained({loading, path, title, subtitle, tabbed, children}) {

    return (
        <Box sx={{width:'100%', p:0}}>
            <Container>

                <PageHeaderStack
                    loading={loading}
                    path={path}
                    title={title}
                    subtitle={subtitle}
                    nopad={true}
                />
            </Container>

            {tabbed ?
                <Box sx={{pt: 3, pb: 3}}>
                    {children}
                </Box>
                :
                <Box sx={{pt: 3, pb: 3}}>
                    <Divider/>
                    <Container sx={{pt:3}}>
                        {children}
                    </Container>
                </Box>
            }

            <Box sx={{ p:3 }}>
                <Footer/>
            </Box>

        </Box>


    );
}