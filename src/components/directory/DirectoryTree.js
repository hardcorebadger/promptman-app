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

export default function DirectoryTree() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);
  const [draggingNode, setDraggingNode] = useState();
  const [nodeList, setNodeList] = useState([]);

  function updateNode(node, depth, hasChild) {
    let checkExist = false;
    nodeList.map((value) => {
      if (value.id == node.id) {
        value.depth = depth;
        value.hasChild = hasChild;
        value.parent = node.parent;
        checkExist = true;
      }
    });
    if (checkExist) {
      setNodeList(nodeList);
    } else {
      node.depth = depth;
      node.hasChild = hasChild;
      nodeList.push(node);
      setNodeList(nodeList);
    }
  }

  function checkChildIsFolder(parentID) {
    let fileExist = false;

    nodeList.map((value) => {
      if (value.parent == parentID) {
        if (value.data.fileType != "text") {
          fileExist = true;
        }
      }
    });
    return fileExist;
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

  useEffect(() => {
    console.log(nodeList);
    // console.log(treeData);
  }, [nodeList]);

  return (
    
          <Tree
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
                  if (dropT.data.fileType != "text") {
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
     
  );
}

// ref: https://codesandbox.io/s/custom-drag-preview-js-forked-otupwe?file=/src/theme.js:293-336