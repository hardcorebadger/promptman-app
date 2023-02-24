import * as React from "react";
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
  const [value, setValue] = React.useState("1");
  const [tabs, setTabs] = React.useState(
    [...Array(20)].map((_, index) => ({
      id: `tab${index + 1}`,
      label: `Tab Name ${index + 1}`,
      value: `${index + 1}`,
      content: `Content ${index + 1}`
    }))
  );

  const onDragEnd = (result) => {
    const newTabs = Array.from(tabs);
    const draggedTab = newTabs.splice(result.source.index, 1)[0];
    newTabs.splice(result.destination.index, 0, draggedTab);
    setTabs(newTabs);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeTab = (index) => {
    const newTabs = Array.from(tabs);
    newTabs.splice(index,1);
    setTabs(newTabs);
    if (newTabs.length > index)
        setValue(newTabs[index].value);
    else if (newTabs.length > 0) 
        setValue(newTabs[newTabs.length-1].value);
  }

  const _renderTabList = (droppableProvided) => (
    <StyledTabs
      onChange={handleChange}
      aria-label="Draggable Tabs"
      variant="scrollable"
      scrollButtons={false}
      value={value}
    >
      {tabs.map((tab, index) => {
        const child = <StyledTab 
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
