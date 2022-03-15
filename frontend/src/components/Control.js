import React, {useEffect, useState} from "react";
import MitmApplication from "./MitmApplication";
import CommunityPage from "./CommunityPage";
import InstalledPage from "./InstalledPage";
import {getInstalledApps} from "../lib/installed_apps";
import {
    AppBar, Box,
    Container, Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import GetAppIcon from '@mui/icons-material/GetApp';

const drawerWidth = 240;

export default function Control() {
    const [installed_applications, setInstalledApplications] = useState(null);
    const [selected_application, setSelectedApp] = useState(null);
    const [source, setSource] = useState("Installed");

    useEffect(() => {
        const fetchInstalledApps = async () => {
            const [installed_apps, error] = await getInstalledApps();
            setInstalledApplications(installed_apps)
        }
        fetchInstalledApps();
    }, [])

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        MITMapps Control
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        <ListItem selected={source == 'Community'} button key="Community" onClick={() => {
                            setSource("Community");
                            setSelectedApp(null);
                        }}>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Community"/>
                        </ListItem>
                        <ListItem selected={source == 'Installed'} button key="Installed" onClick={() => {
                            setSource("Installed");
                            setSelectedApp(null);
                        }}>
                            <ListItemIcon>
                                <GetAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Installed"/>
                        </ListItem>

                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                {selected_application &&
                    <MitmApplication onChangeInstalled={setInstalledApplications}
                                     selected_application={selected_application}
                                     onChangeSelected={setSelectedApp}/>
                }
                {(source == 'Community' && !selected_application) &&
                    <CommunityPage onChangeSelected={setSelectedApp}/>
                }
                {(source == 'Installed' && !selected_application) &&
                    <InstalledPage installed_applications={installed_applications}
                                   onChangeSelected={setSelectedApp}/>
                }

            </Box>
        </Box>
    )
}
