import PropTypes from 'prop-types'
import * as React from 'react';
import { useState, useCallback } from 'react';
// @mui
import { Typography, Button, Card, CardContent, Paper, Stack } from '@mui/material';
//
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Iconify from './Iconify';
import {useTheme} from "@mui/material/styles";

// ----------------------------------------------------------------------

SortWell.propTypes = {
  items: PropTypes.array,
  onSort: PropTypes.func,
  element: PropTypes.func,
  addLabel: PropTypes.string,
  addItem: PropTypes.func,
  maxItems: PropTypes.number,
};

export default function SortWell({items, onSort, element, addLabel, addItem, maxItems}) {
  const theme = useTheme();
  const order = new Array(items.length).fill(null).map((n, i) => i);

  const onReorder = ({ oldIndex, newIndex, collection, isKeySorting }, e) => {
    const newOrder = [...order];
    const moved = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved[0]);
    let newItems = [];
    for (var i = 0; i < newOrder.length; i++) {
      newItems.push(items[newOrder[i]]);
    }
    onSort(newItems);
  };

  const canAdd = () => {
    if (!addItem)
      return false;
    if (!maxItems)
      return true;
    return items.length < maxItems;
  }

  return (
    <Paper
          variant="outlined"
          sx={{ px: 1, py: 1,
            userSelect:"none",
            background: "none",
            border: `1px solid ${theme.palette.divider}`
          }}
        >
     <SortableStack axis="y" onSortEnd={onReorder} distance={5}>
			  {order.map((index, i) => (
				  <SortableItem
              index={i}
              key={index}            
              value={
                element(items[index], index)
              }
            />
				))}
          
        </SortableStack> 
        { canAdd() &&
        <Stack spacing={2} sx={{ pt: 1.5 }}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
            onClick={addItem}
            sx={{ fontSize: 14 }}
          >
            { addLabel != null ? addLabel : "Add Item" }
          </Button>
        </Stack>
        }
    </Paper>
  );
}

const SortableStack = SortableContainer(({ children }) => {

  return (
    <Stack spacing={1}>
      {children}
    </Stack>
  );
});

const SortableItem = SortableElement(({ value }) => {
  return <>{value}</>;
});