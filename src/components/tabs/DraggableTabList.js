import { useState, useEffect} from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableTab from "./DraggableTab";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import { styled, Tabs } from "@mui/material";
import Iconify from "../Iconify";
import { IconButton } from "@mui/material";
import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
    useNavigate,
    useParams
  } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import eventBus from "../../hooks/eventBus";

// function useRouteMatch(patterns) {
//     const { pathname } = useLocation();

//     for (let i = 0; i < patterns.length; i += 1) {
//         const pattern = patterns[i];
//         const possibleMatch = matchPath(pattern, pathname);
//         if (possibleMatch !== null) {
//         return possibleMatch;
//         }
//     }

//     return null;
// }

const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-scrollableX': {
        cursor:"pointer",        
    },
    
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicator': {
        bottom:"auto",
        top:0
      },
    '& .MuiTabs-indicatorSpan': {
      width: '100%',
      backgroundColor: '#635ee7',
    },
  });

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        height: "64px",
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      borderRight: "1px solid #17293a",
      color: 'rgba(255, 255, 255, 0.7)',
      minHeight: "unset",
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor: "#072239",
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
        
      },
      '& .close-icon': {
        display: "none"
      },
      '&.Mui-selected .close-icon': {
        display: "inline-flex"
      }
    }),
  );

export default function DraggableTabsList(props) {
    const [navOnRefresh, setNavOnRefresh] = useState(null);
    const [tabs, setTabs] = useState([]);
    const [newTab, setNewTab] = useState(null);
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    // when we are about to reroute after clsing a tab, use the nw route
    let value = navOnRefresh != null ? navOnRefresh : pathname;
    let found = false;
    tabs.forEach(function(tab) {
        if (tab.value == pathname) {
            found = true;
        }
    });
    if (!found) {
        value = false;
    }
    
    if (newTab != null) {
        
        found = false;
        tabs.forEach(function(tab) {
            if (tab.id == newTab.id) {
                found = true;
            }
        });
        if (!found) {
            console.log("adding tab" + tabs.length);
            const newTabs = Array.from(tabs);
            newTabs.splice(0,0,newTab);
            console.log(newTabs.length);
            setNewTab(null);
            setTabs(newTabs);
            
        }
    }

    // listen to routing, if we route to a prompt not in the tabs, make a tab for it
    // useEffect(() => {
    //     const possibleMatch = matchPath('/dashboard/prompt/:id', pathname);
    //     if (possibleMatch !== null) {
    //         let found = false;
    //         tabs.forEach(function(tab) {
    //             if (tab.value == pathname) {
    //                 found = true;
    //             }
    //         });
    //         if (!found) {
    //             const newTabs = Array.from(tabs);
    //             newTabs.splice(0, 0, 
    //                 {id: id, label: "Prompt "+id , value:pathname, to:pathname}
    //             );
    //             setTabs(newTabs);
    //         }
    //     }
 
    // }, [pathname]);

    // when a tab is closed, set a state variable to navigate to another tab and re-mount
    useEffect(() => {
        if (navOnRefresh != null) {
            navigate(navOnRefresh, {replace:true});
            setNavOnRefresh(null);
        }
    }, [tabs]);
//fileRename
    useEffect(() => {
        eventBus.on("promptOpened", (prompt) => {
            setNewTab({id: prompt.id, label: prompt.name , value:"/dashboard/prompt/"+prompt.id, to:"/dashboard/prompt/"+prompt.id});
        });
        return () => {
            eventBus.remove("promptOpened");
        }
      }, []);

  const onDragEnd = (result) => {
    const newTabs = Array.from(tabs);
    const draggedTab = newTabs.splice(result.source.index, 1)[0];
    newTabs.splice(result.destination.index, 0, draggedTab);
    setTabs(newTabs);
  };

  const closeTab = (index) => {
    const newTabs = Array.from(tabs);
    newTabs.splice(index,1);
    setTabs(newTabs);
    // console.log("close tab: " + (newTab == null));
    setNewTab(null);
    if (newTabs.length > index)
        setNavOnRefresh(newTabs[index].value);
    else if (newTabs.length > 0) 
        setNavOnRefresh(newTabs[newTabs.length-1].value);
    else
    setNavOnRefresh('/');
  }

  const _renderTabList = (droppableProvided) => (
    <StyledTabs
      aria-label="Draggable Tabs"
      variant="scrollable"
      scrollButtons={false}
      value={value}
    >
      {tabs.map((tab, index) => {
        const child = <StyledTab 
        component={Link}
        to={tab.to}
        wrapped={false} label={tab.label} 
        value={tab.value} key={index} 
        icon={<IconButton
            className="close-icon"
            id="demo-positioned-button"
            size="small"
            onClick={() => closeTab(index)}
          >
            <Iconify  icon="material-symbols:close-sharp" />
          </IconButton>} 
        iconPosition="end" />;

        return (
          <DraggableTab
            label={tab.label}
            value={tab.value}
            index={index}
            key={index}
            child={child}
          />
        );
      })}
      {droppableProvided ? droppableProvided.placeholder : null}
    </StyledTabs>
  );

  const _renderTabListWrappedInDroppable = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", overflow: "auto" }}>
        <Droppable droppableId="1" direction="horizontal">
          {(droppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {_renderTabList(droppableProvided)}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );

   
  return (
    <Stack direction="column">{_renderTabListWrappedInDroppable()}</Stack>
  );
}
