import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import {LicenseInfo} from "@mui/x-data-grid-pro";
import mixpanel from 'mixpanel-browser';
mixpanel.init('5acfcd5a37cfe3c4a6af78b0fcae4352', {debug: false});
LicenseInfo.setLicenseKey(
    '4bb4e0380ced9f6000f7f44b17a7f071T1JERVI6NDI5NjIsRVhQSVJZPTE2ODMxNTUwNjMwMDAsS0VZVkVSU0lPTj0x',
);
ReactDOM.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
        <App />
    </ThemeProvider>
  </AuthProvider>,
  document.querySelector('#root'),
);
