import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";

export const CustomNode = (props) => {
  const { droppable, data } = props.node;
  const indent = 20+ props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    props.onSelect(props.node.id);
  };

  useEffect(() => {
    props.updateNode(props.node);
  }, [props.parent]);

  useEffect(() => {
    props.updateNode(props.node);
  }, [props.hasChild]);

  // useEffect(() => {
  //   console.log("Dragging", props.node.text);

  //   props.setDraggingNode(props.node);
  // }, [props.isDragging]);

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
    >
      
      <div>
      <div onClick={handleToggle}>
      <TypeIcon droppable={droppable} fileType={data?.fileType} isOpen={props.isOpen} />
        </div>
      </div>
      <div className={styles.labelGridItem} onClick={handleSelect}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
