import PropTypes from 'prop-types';
import { useState } from 'react';
import {Box, Tabs, Tab, Typography, Container} from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ pt:3 }}>
            {children}
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabController.propTypes = {
    tabs: PropTypes.array
};

export default function TabController({tabs, controlledValue = 0, controller}) {
    const [value, setValue] = useState(controlledValue);
  
    const handleChange = (event, newValue) => {

      if (controller) {
          controller(newValue);
      } else {
          setValue(newValue);
      }
    };

    const v = controller != null ? controlledValue : value;

    return (
      <Box sx={{ width: '100%', p:0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Container>
          <Tabs value={v} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab, index)=> <Tab key={tab.key} label={tab.display} {...a11yProps(index)} /> )}
          </Tabs>
            </Container>
        </Box>
          <Container sx={{pt:3}}>
        {tabs.map((tab, index)=>
            <TabPanel key={tab.key} value={v} index={index}>
                {tab.element}
            </TabPanel>
        )}
          </Container>
      </Box>
    );
  }
