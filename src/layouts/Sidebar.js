import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoBlock from '../components/LogoBlock';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Iconify from '../components/Iconify';
import { Link as RouterLink, useLocation } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, Paper, ListSubheader } from '@mui/material';
import {useAuth }  from '../contexts/AuthContext';
import { textTransform } from '@mui/system';

const NavConfig = [
    { 'display' : 'Analytics', 'accessLevel':1 },
    { 'display': 'Overview', 'icon': 'ri:bar-chart-2-fill', 'path': '/dashboard/home', 'accessLevel':1  },
    { 'display': 'Performance', 'icon': 'ri:line-chart-line', 'path': '/dashboard/performance', 'accessLevel':1  },
    { 'display' : 'Admin', 'accessLevel':2 },
    { 'display': 'Settings', 'icon': 'ri:settings-3-line', 'path': '/dashboard/settings', 'accessLevel':2 },
    { 'display': 'Superadmin', 'icon': 'dashicons:admin-network', 'path': '/dashboard/superadmin', 'accessLevel':3  },

];

const StyledList = styled(List)(({ theme }) => ({
    padding: 12,

  }));

  const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    background: "none",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: theme.typography.caption.fontSize
  }));

  const NoOverflowItemText = styled(ListItemText)(({ theme }) => ({
      '& .MuiTypography-root': {
        whiteSpace: `nowrap`,
        textOverflow: `ellipsis`,
        width:'100%',
        overflow: 'hidden'
      }
  }));

  const NoOverflowTypography = styled(Typography)(({ theme }) => ({
      whiteSpace: `nowrap`,
      textOverflow: `ellipsis`,
      width:135,
      overflow: 'hidden'
}));
  
  const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 7,
    marginBottom: 7,
    '&:hover': {
        backgroundColor: theme.palette.background.light,
        color: theme.palette.text.primary,
        transition: '0.1s'
    },
  }));

  const StyledAccordion = styled(Accordion)(({ theme }) => ({
      '&.MuiPaper-root' : {
    backgroundColor: theme.palette.background.default,
      },
    '&.Mui-expanded': {
        margin: 0,
        backgroundColor: theme.palette.background.default,
        '& .MuiAccordionSummary-content': {
        }
    }
  }));

export default function Sidebar() {
    const location = useLocation();
    const { user } = useAuth();
    const isSuperadmin = (user.staff_role == "developer");
    return (
        <div>
            <Toolbar >
            <Box sx={{ width:"100%", display: { xs: 'none', sm: 'block' }}} >
                <LogoBlock oreintation="sidebar" />
            </Box>

            </Toolbar>
            <Divider />
            <StyledAccordion elevation={0}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Stack direction="row" spacing={2} sx={{pt:1, pb:1}}>
                    <Paper sx={{width:42, height:42, lineHeight:'42px', textAlign:'center'}}>
                    P
                    </Paper>
                    <Stack direction="column" spacing={0}>
                    <Typography variant="body" component="div" sx={{mb:0, pb:0}}>User Name</Typography>
                    <NoOverflowTypography variant="caption" color="text.secondary" component="div" sx={{mt:0, pt:0}}>Property Name</NoOverflowTypography>
                    </Stack>
                </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{marginTop:"-20px"}}>
                <List dense={true}>
                {/* {user.properties.map((item, index) => (
                <StyledListItem button  onClick={() => switchProperty(item.id)} key={item.id} selected={item.id == property.id}>
                    <ListItemIcon>
                    {item.domain.charAt(0).toUpperCase()}
                    </ListItemIcon>
                    <NoOverflowItemText primary={item.domain} />
                </StyledListItem>
                ))} */}

            </List>
                </AccordionDetails>
            </StyledAccordion>
            <Divider />
            {/* {property &&
                <StyledList dense={true}>
                    {NavConfig.map((item, index) => {
                        if (item.accessLevel <= user.accessLevel ) {
                            if (item.path == null) {
                                return (
                                    <StyledListSubheader key={index} component="div">
                                        {item.display}
                                    </StyledListSubheader>
                                );
                            } else {
                                return (
                                    <StyledListItem button component={RouterLink} to={item.path} key={index}
                                                    selected={location.pathname.startsWith(item.path)}>
                                        <ListItemIcon>
                                            <Iconify icon={item.icon} width={20} height={20}/>
                                        </ListItemIcon>
                                        <ListItemText primary={item.display}/>
                                    </StyledListItem>
                                );
                            }
                        }
                    })}
                </StyledList>
            } */}
        </div>
      );
}
