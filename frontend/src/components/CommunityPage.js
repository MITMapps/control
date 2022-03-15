import React, {useEffect, useState} from "react";
import {search_mitmapps} from "../lib/community_apps";
import ClickableApplication from "./ClickableApplication";
import {getInstalledApps} from "../lib/installed_apps";
import {Alert, Box, Button, CircularProgress, Divider, LinearProgress, Paper, Stack, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function CommunityPage({onChangeSelected}) {
    const [search_query, set_search_query] = useState(null);
    const [search_apps, set_search_apps] = useState(null);
    const [searching, setSearching] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchSearchApps = async () => {
            if (searching) {
                const [result, error] = await search_mitmapps(search_query);
                set_search_apps(result);
                setError(error)
                setSearching(false)
            }
        }
        fetchSearchApps();
    }, [searching])

    return (
        <Box maxWidth="sm">
            <Stack direction="row">
                <TextField id="search" label="search" autoFocus="True" fullWidth
                           placeholder="search by app name" onChange={e => set_search_query(e.target.value)}/>
                <Button onClick={() => {
                    setSearching(true)
                }}><SearchIcon/></Button>
            </Stack>
            <br/>
            {searching &&
                <LinearProgress />
            }
            {(!searching && search_apps) &&
                <Box maxWidth="sm">
                    <Stack spacing={2}>
                        {
                            search_apps.map(({author, name, python}) => (
                                <ClickableApplication onChangeSelected={onChangeSelected}
                                                      app_item={{author, python, name}}/>
                            ))
                        }
                    </Stack>
                </Box>
            }
            {error &&
                <Alert severity="info">{error}</Alert>
            }
        </Box>
    )
}
