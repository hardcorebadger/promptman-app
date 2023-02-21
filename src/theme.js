import { createTheme } from '@mui/material/styles';
// A custom theme for this app
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#4D88E1',
    },
    background: {
      default: '#0a1929',
      paper: '#0f2843',
      error: "#230F21",
      success: "#123a41",
      well: "#0e2237",
      highlight: "#0F2843"
    },
    text: {
      primary: '#e7ebf0',
      secondary: 'rgba(231,235,240,0.7)',
      disabled: 'rgba(231,235,240,0.4)',
      hint: 'rgba(231,235,240,0.5)',
    },
    error: {
      main: '#E5575B',
    },
    warning: {
      main: '#CEC95C',
    },
    info: {
      main: '#90caf9',
    },
    success: {
      main: '#59EAC6',
    },
    chart: {
      orange: '#fd947a',
      purple: '#cd97fa',
      yellow: '#cec95c',
      green: '#7aeed1',
      blue: "#a6d4fa",
      red: "#ea787b",
    },
    divider: '#18293a',
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#0a1929',
        color: '#fff',
      },
    },
  },

  components: {
   
    // Name of the component ⚛️
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderWidth: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
          fontSize: "1em",
          '&.Mui-selected': {
            color: '#90caf9',
            '& .MuiListItemIcon-root': {
              color: '#90caf9',
            }  
          }     
       },
      },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: 10,     
       },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          '&.MuiPaper-outlined': {
            backgroundColor: '#0a1929'
          }   
       },
      },
    },
    MuiInputBase: {

      styleOverrides: {

        input: {
          fontSize: "0.875rem",
          fontWeight: "bold",
          paddingTop: "12px !important",
          paddingBottom: "12px !important",
        },
        fieldset: {
          fontSize: "0.875rem",
          fontWeight: "bold",
        }
      }
    },


    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: "bold",
          transform: "translate(14px, 12px) scale(1)",
          "&.Mui-focused, &.MuiFormLabel-filled": {
            fontSize: "1rem",
            fontWeight: "normal",
            transform: "translate(14px, -9px) scale(0.75)",

          }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          '&.MuiButton-containedPrimary': {
            backgroundColor: "#0F2843",
            color: "#90caf9",
            '&:hover': {
              backgroundColor: "#1A3756",
            },
            '&.Mui-disabled': {
              boxShadow: "none",
              backgroundColor: "rgba(100,100,100,0.2)",
              color: "rgba(255,255,255,0.4)"
            }
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: "#4d88e1",
            color: "#ffffff",
            '&:hover': {
              backgroundColor: "#355f9d",
            },
            '&.Mui-disabled': {
              boxShadow: "none",
              backgroundColor: "rgba(100,100,100,0.2)",
              color: "rgba(255,255,255,0.4)"
            }
          },
          '&.MuiButton-containedError': {
            backgroundColor: "#2e1e2d",
            color: "#e3565a",
            '&:hover': {
              backgroundColor: "#362435",
            },
            '&.Mui-disabled': {
              boxShadow: "none",
              backgroundColor: "rgba(100,100,100,0.2)",
              color: "rgba(255,255,255,0.4)"
            }
          },
          '&.MuiButton-containedWarning': {
            backgroundColor: "#283739",
            color: "#cec95c",
            '&:hover': {
              backgroundColor: "#293C3E",
            },
            '&.Mui-disabled': {
              boxShadow: "none",
              backgroundColor: "rgba(100,100,100,0.2)",
              color: "rgba(255,255,255,0.4)"
            }
          },
          '&.MuiButton-containedSuccess': {
            backgroundColor: "#123a41",
            color: "#59eac6",
            '&:hover': {
              backgroundColor: "#16434B",
            },
            '&.Mui-disabled': {
              boxShadow: "none",
              backgroundColor: "rgba(100,100,100,0.2)",
              color: "rgba(255,255,255,0.4)"
            }
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.outlined': {
            border: '1px solid #18293a',
            borderRadius: 7,
            color: '#90caf9',
            padding: 3
          }
        },
      },
    },
  },
  customShadows: {
    z1: `0 1px 2px 0 rgba(0,0,0,0.16)`,
    z8: `0 8px 16px 0 rgba(0,0,0,0.16)`,
    z12: `0 12px 24px -4px rgba(0,0,0,0.16)`,
    z16: `0 16px 32px -4px rgba(0,0,0,0.16)`,
    z20: `0 20px 40px -4px rgba(0,0,0,0.16)`,
    z24: `0 24px 48px 0 rgba(0,0,0,0.16)`,
  },
  typography: {
    overline: {
      fontWeight:"bold",
    },
    h6: {
      fontSize:"1rem",
      fontWeight:"bold"
    },

  },
});

export default theme;
