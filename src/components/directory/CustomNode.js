import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";
import { Stack } from "@mui/material";
import ActionMenu from "./ActionMenu";
import {EditableTypographyControlled} from "../EditableTypography";
import { useLocation, useParams } from "react-router-dom";

export const CustomNode = (props) => {
  const { droppable, data } = props.node;
  const indent = 20+ props.depth * 24;
  const [isEditingName, setIsEditingName] = useState(false);
  const [curName, setCurName] = useState(props.node.text);
  const { pathname } = useLocation();
  const { id } = useParams();

  const getActions = () => {
    let actions = [
        {name:"Delete", shouldClose:true, callback:() => {props.onDelete(props.node.id)}},
        {name:"Rename", shouldClose:true, callback:() => setIsEditingName(true)}
        ];
    if (props.node.data.fileType == "group") {
        actions.push({
            name:"New Prompt", 
            shouldClose:true, 
            callback:() => {props.createChild(props.node.id, "prompt", "New Prompt")}
        });
        actions.push({
            name:"New Collection", 
            shouldClose:true, 
            callback:() => {props.createChild(props.node.id, "group", "New Collection")}
        });
    }
    return actions;
  }
  

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelection = (e) => {
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


const actions = getActions();
const isActive = (data && id && id == parseInt(data.content));
return (
    <Stack className={`tree-node ${styles.root} ${(isActive && styles.selected)}`}
     style={{ paddingInlineStart: indent, paddingInlineEnd:10 }} 
     direction="row"  justifyContent="space-between" alignItems="center"
     onClick={handleSelection}
     >
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <div onClick={handleToggle}>
                <TypeIcon droppable={droppable} fileType={data?.fileType} isOpen={props.isOpen} />
            </div>
            <EditableTypographyControlled variant="body2" isEditing={isEditingName} onEsc={() => {setIsEditingName(false);props.updateName(props.node.id,curName)}} onChange={setCurName} value={curName} />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <ActionMenu className={styles.actionMenu}
            actions= {actions}
            />
          
        </Stack>
    </Stack>
);
};
