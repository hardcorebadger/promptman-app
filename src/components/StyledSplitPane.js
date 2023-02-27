import SplitPane from "react-split-pane";
import { styled, alpha } from "@mui/material/styles";

const StyledSplitPaneC = styled(SplitPane)(({ theme })  => ({
    "& .Resizer": {
        background: theme.palette.text.secondary,
        opacity: 0.2,
        zIndex: 1,
        MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box",
        boxSizing: "border-box",
        MozBackgroundClip: "padding",
        WebkitBackgroundClip: "padding",
        backgroundClip: "padding-box"
      },
      "& .Resizer:hover": {
        WebkitTransition: "all 1s ease",
        transition: "all 1s ease"
      },
      "& .Resizer.horizontal": {
        height: "11px",
        margin: "-5px 0",
        borderTop: "5px solid",
        borderTopColor: alpha(theme.palette.text.secondary, 0.1),
        borderBottom: "5px solid",
        borderBottomColor: alpha(theme.palette.text.secondary, 0.1),
        cursor: "row-resize",
        width: "100%"
      },
      "& .Resizer.horizontal:hover": {
        borderTop: "5px solid",
        borderTopColor: alpha(theme.palette.text.secondary, 0.3),
        borderBottom: "5px solid",
        borderBottomColor: alpha(theme.palette.text.secondary, 0.3),
      },
      "& .Resizer.vertical": {
        width: "11px",
        margin: "0 -5px",
        borderLeft: "5px solid rgba(255, 255, 255, 0)",
        borderRight: "5px solid rgba(255, 255, 255, 0)",
        cursor: "col-resize"
      },
      "& .Resizer.vertical:hover": {
        borderLeft: "5px solid rgba(0, 0, 0, 0.5)",
        borderRight: "5px solid rgba(0, 0, 0, 0.5)"
      },
      "& .Resizer.disabled": { cursor: "not-allowed" },
      "& .Resizer.disabled:hover": { borderColor: "transparent" }
  }));

  export default function StyledSplitPane(props) {
    return (<StyledSplitPaneC {...props}/>);
  }