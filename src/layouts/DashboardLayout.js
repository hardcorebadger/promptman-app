import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';


const drawerWidth = 250;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.well
  }
}));


export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          // ModalProps={{
          //   keepMounted: true, // Better open performance on mobile. (but it also makes everything mount 2 times)
          // }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Sidebar/>
        </StyledDrawer>
        <StyledDrawer
          variant="permanent"
          
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Sidebar/>
        </StyledDrawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
