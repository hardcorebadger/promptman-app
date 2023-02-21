import { styled} from "@mui/material/styles";
// icons
import { Icon } from '@iconify/react';
// @mui
import {Box, Button} from '@mui/material';
import ChannelIcon from "./ChannelIcon";

// ----------------------------------------------------------------------

const FBButton = styled(Button)(({ theme }) => ({

    backgroundColor: "#1877F2",
    color: "white",
    paddingLeft: "40px",
    fontWeight: "bold",
    paddingRight:"40px",
    paddingTop: "8px",
    paddingBottom: "8px",
    textTransform: "none"

}));

const GoogleButton = styled(Button)(({ theme }) => ({

    backgroundColor: "#c4402f",
    color: "white",
    paddingLeft: "40px",
    fontWeight: "bold",
    paddingRight:"40px",
    paddingTop: "8px",
    paddingBottom: "8px",
    textTransform: "none"

}));

export default function IntegrationButton({ channel_id, auth_url }) {

    if (channel_id == 1) {
        return <FBButton component={"a"} href={auth_url}>Login With Facebook</FBButton>

    } else if (channel_id == 2) {
        return <GoogleButton component={"a"} href={auth_url}>Login With Google</GoogleButton>

    }
    return <Button variant={"contained"} component={"a"} href={auth_url} >Login With Platform</Button>
}
//<a style={{ textDecoration: 'none'}} href={authUrl}>
//><Button sx={{backgroundColor: "#1877F2", color: "white", paddingLeft: "40px", fontWeight: "bold", paddingRight:"40px", paddingTop: "8px", paddingBottom: "8px", textTransform: "none"}} size={"large"} variant={"contained"}