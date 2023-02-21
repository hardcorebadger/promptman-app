import * as React from 'react';
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import {TextField, Button, Popover, Box, List, ListItemButton, ListItemIcon, ListItemText, Stack} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';
import { endOfDay, isBefore, format, startOfToday, endOfToday, startOfWeek, endOfWeek, isSameDay, startOfMonth, isWithinInterval, subDays } from 'date-fns';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

DateRangePickerLiteStatic.propTypes = {
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
};

export function DateRangePickerLiteStatic({start, end, onChange}) {
    const [stage, setStage] = React.useState(0);

    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        const dayIsBetween = isWithinInterval(date, { start, end });
        const isFirstDay = isSameDay(date, start);
        const isLastDay = isSameDay(date, end);

        return (
        <CustomPickersDay
            {...pickersDayProps}
            disableMargin
            dayIsBetween={dayIsBetween}
            isFirstDay={isFirstDay}
            isLastDay={isLastDay}
        />
        );
    };

    const onSelection = (newValue) => {
        if (stage === 0) {
            onChange(newValue, newValue);
            setStage(1);
        } else  {
            if (isBefore(newValue, start)) {
                onChange(newValue, newValue);
            } else {
                onChange(start, newValue, true);
                setStage(0);
            }
        } 
    };

    const curVal = stage == 0 ? start : end;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
            displayStaticWrapperAs="desktop"
            label="Week picker"
            value={curVal}
            onChange={onSelection}
            renderDay={renderWeekPickerDay}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="'Week of' MMM d"
        />
        </LocalizationProvider>
    );
}




const DateRangeButton = styled(Button)(({ theme }) => ({
  
    maxWidth: 700,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    height: '100%',
    borderBottom: 'none',
    borderTop: 'none',
    borderRadius: 0,
    borderColor: theme.palette.divider,
    textTransform: "none",
    letterSpacing: "normal",
    fontSize: "0.875rem",
    fontWeight: "bold",
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
    },
    '&.true': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.primary.main,
    }
    
  }));

DateRangePickerLite.propTypes = {
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    onChange: PropTypes.func
};

export default function DateRangePickerLite({start, end, onChange}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectionStart, setSelectionStart] = React.useState(start);
    const [selectionEnd, setSelectionEnd] = React.useState(end);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setSelectionStart(start);
        setSelectionEnd(end);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      onChange(selectionStart, endOfDay(selectionEnd));
    };

    const onChangeSelection = (s,e, complete) => {
        setSelectionStart(s);
        setSelectionEnd(e);
        if (complete) {
            setAnchorEl(null);
            onChange(s, endOfDay(e));
        }
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div style={{ height: "60px" }}>
        <DateRangeButton aria-describedby={id} variant="outlined" color="inherit" size="large" className={open} onClick={handleClick}>
        {format(start, 'MM/dd/yy') + " - " + format(end, 'MM/dd/yy')}
        </DateRangeButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        ><Stack direction="row">
          <DateRangePickerLiteStatic start={selectionStart} end={selectionEnd} onChange={onChangeSelection}  />
          <DateRangePresetList start={selectionStart} end={selectionEnd} onChange={onChangeSelection} />
          </Stack></Popover>
      </div>
    );
  }

const presets = [
    {"label":"Today", "start":startOfToday(), "end":endOfToday()},
    {"label":"This Week", "start":startOfWeek(startOfToday()), "end":endOfToday()},
    {"label":"This Month", "start":startOfMonth(startOfToday()), "end":endOfToday()},
    {"label":"Last 7 Days", "start":subDays(startOfToday(), 7), "end":startOfToday()},
    {"label":"Last 30 Days", "start":subDays(startOfToday(), 30), "end":startOfToday()},
];

DateRangePresetList.propTypes = {
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    onChange: PropTypes.func
};

function DateRangePresetList({start, end, onChange}) {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = (event, index, startDate, endDate) => {
        setSelectedIndex(index);
        onChange(startDate, endDate, true);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
        {presets.map((item, i) => (
            <ListItemButton
            key={i}
            selected={selectedIndex === i}
            onClick={(event) => handleListItemClick(event, i, item.start, item.end)}
            >
            <ListItemText primary={item.label} />
            </ListItemButton>
        ))}
        </List>
        </Box>
    );
}