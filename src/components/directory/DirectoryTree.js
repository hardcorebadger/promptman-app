import React, { useState, useEffect } from "react";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import styles from "./DirectoryTree.module.css";
import SampleData from "./sample_data.json";
import { useAuth, GET, PUT, POST, DELETE } from "../../contexts/AuthContext"
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import eventBus from "../../hooks/eventBus";
import Iconify from "../Iconify";
import {useTheme} from '@mui/material';


export default function DirectoryTree() {
  const [treeData, setTreeData] = useState(null);
  const handleDrop = (newTree) => setTreeData(newTree);
  const [draggingNode, setDraggingNode] = useState();
  const [nodeList, setNodeList] = useState([]);
  const { user } = useAuth();
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [isAddingPrompt, setIsAddingPrompt] = useState(false);

  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  function updateNode(node, depth, hasChild) {
    let checkExist = false;
    let foundNode = null;
    nodeList.map((value) => {
      if (value.id == node.id) {
        foundNode = value;
        value.depth = depth;
        value.hasChild = hasChild;
        value.parent = node.parent;
        checkExist = true;
      }
    });
    if (checkExist) {
      // send req to update node foundNode
      updateFileParent(node.id, node.parent);
      setNodeList(nodeList);
    } else {
      node.depth = depth;
      node.hasChild = hasChild;
      nodeList.push(node);
      // send req to add a node
      setNodeList(nodeList);
    }
  }

  function isRerootValid(dragID, dropID) {
    // cant re-root into yourself
    if (dragID == dropID) {
        return false;
    }
    
    let found = false;
    let issue = false;

    // find the drop node
    nodeList.map((value) => {
      if (value.id == dropID) {
        found = true;
        // look for parent in ancestry
        let n = value.id;
        while (n > 0) {
            let curNode = getNode(n);
            // found parent in ancestry, nope
            if (curNode.id == dragID) {
                issue = true;
            }
            n = curNode.parent;
        }
        // traversed to root without seeing parent, fine
      }
    });

    if (!found || issue)
        return false;

    return true;

  }

  function getNode(nodeID) {
    let nodeTarget;

    nodeList.map((value) => {
      if (value.id == nodeID) {
        nodeTarget = value;
      }
    });
    return nodeTarget;
  }

  function getDropTarget(dropTargetId) {
    let dropTarget;

    nodeList.map((value) => {
      if (value.id == dropTargetId) {
        dropTarget = value;
      }
    });
    return dropTarget;
  }

  function getDragTarget(dragTargetId) {
    let dragTarget;

    nodeList.map((value) => {
      if (value.id == dragTargetId) {
        dragTarget = value;
      }
    });
    return dragTarget;
  }

  async function addGroup() {
    setIsAddingGroup(true);
    let resp = await POST("/api/file/", {
        "project":user.project.id,
        "parent":null,
        "name":"New Collection",
        "type":"group"
    });
    setIsAddingGroup(false);
    setRefresh(refresh+1);
  }

  async function loadFiles() {
    let resp = await GET("/api/project/"+user.project.id+"/files");
    setTreeData(transformFileTree(resp.response.files));
  }

  async function updateFileParent(id, parent) {
    let resp = await PUT("/api/file/"+id, {"parent":parent});
  }

  async function updateFileName(id, name) {
    let n = getNode(id);
    n.text = name;
    let resp = await PUT("/api/file/"+id, {"name":name});
    setRefresh(refresh+1);
    eventBus.dispatch("fileRenamed", n);
  }

  async function onDelete(id) {
    let n = getNode(id);
    let resp = await DELETE("/api/file/"+id);
    setRefresh(refresh+1);
    eventBus.dispatch("fileDeleted", n);
  }

 function onSelect(id) {
    let node = getNode(id);
    if (node.data.fileType == "group")
        return;
    let path = '/dashboard/' + node.data.fileType + '/' + node.data.content
    navigate(path);
  }

  async function createChild(parentId, type, name) {
    let resp = await POST("/api/file/", {
        parent:parentId,
        type:type,
        name:name,
        project:user.project.id
    });
    setRefresh(refresh+1);
  }

  async function createRootNode(type, name) {
    setIsAddingPrompt(true);
    let resp = await POST("/api/file/", {
        type:type,
        name:name,
        project:user.project.id
    });
    setRefresh(refresh+1);
    setIsAddingPrompt(false);
  }

  useEffect(() => {
    loadFiles();
  }, [refresh]);

  useEffect(() => {
    eventBus.on("refreshFiles", (nothing) => {
        setRefresh(refresh+1);
    });
    return () => {
        eventBus.remove("refreshFiles");
    }
  }, []);

  if (treeData) {

  return (
    <div style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.well
    }}>
        <Stack direction="row" spacing={0} sx={{p:1, position:'absolute', bottom:0}}>
        <LoadingButton fullWidth startIcon={<Iconify icon="material-symbols:add"/>} sx={{m:1}} variant="outlined" loading={isAddingGroup} onClick={() => addGroup()} >Group</LoadingButton>
        <LoadingButton fullWidth startIcon={<Iconify icon="material-symbols:add"/>} sx={{m:1}} variant="outlined" loading={isAddingPrompt} onClick={() => createRootNode('prompt', 'New Prompt')} >Prompt</LoadingButton>

        </Stack>
          <Tree
          style={{flexGrow:1}}
            tree={treeData}
            rootId={0}
            initialOpen={true}
            render={(
              node,
              { depth, isOpen, onToggle, isDragging, isDropTarget, hasChild }
            ) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                isDragging={isDragging}
                isDropTarget={isDropTarget}
                draggingNode={draggingNode}
                hasChild={hasChild}
                onDelete={onDelete}
                onSelect={onSelect}
                createChild={createChild}
                updateName={updateFileName}
                updateNode={(value) => {
                  updateNode(value, depth, hasChild);
                }}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            canDrop={(
              treeData,
              { dragSource, dropTarget, dropTargetId, dragSourceId }
            ) => {
              if (dragSource != dropTarget) {
                let dropT = getDropTarget(dropTargetId);
                let dragT = getDragTarget(dragSourceId);

                if (dropT != null) {
                  if (dropT.data.fileType == "group") {
                    return isRerootValid(dragSourceId, dropTargetId);
                    // if (dropT.depth >= 1) {
                    //   if (dragSource.data.fileType == "text") {
                    //     return true;
                    //   } else {
                    //     return false;
                    //   }
                    //   //return false;
                    // } else {
                    //   if (dragT.hasChild) {
                    //     if (checkChildIsFolder(dragSourceId)) {
                    //       return false;
                    //     } else {
                    //       return true;
                    //     }
                    //   } else {
                    //     return true;
                    //   }
                    // }
                  }
                }
              }
            }}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget
            }}
          />
     </div>
  );

    } else {
        return (<span/>);
    }
}

function transformFileTree(files) {
    let tree = [];
    files.forEach(function (f) {
        let node = {
            "id": f.id,
            "parent": f.parent_id == null ? 0 : f.parent_id,
            "droppable": f.type == "group",
            "text": f.name,
            "data": {
                "fileType": f.type,
                "content":f.content_id
            } 
        }
        tree.push(node);
    });
    return tree;
}

// ref: https://codesandbox.io/s/custom-drag-preview-js-forked-otupwe?file=/src/theme.js:293-336

// {
//     "id": 2,
//     "parent": 1,
//     "droppable": false,
//     "text": "File 1-1",
//     "data": {
//       "fileType": "text",
//       "fileSize": "0.5MB"
//     }
//   },