import {installApp, uninstallApp} from "../lib/installed_apps";
import {useEffect, useState} from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Prism from 'prismjs';
import "prismjs/components/prism-python.min";
import "prismjs/plugins/line-numbers/prism-line-numbers.min";


export default function MitmApplication({onChangeInstalled, selected_application, onChangeSelected}) {
    const [error, setError] = useState(null);
    const [installing, setInstalling] = useState(false)

    useEffect(() => {
        const fetchInstalling = async () => {
            if (installing) {
                const func = selected_application.installed ? uninstallApp : installApp
                const [installedApps, rtnError] = await func(selected_application);
                let installed = false
                installedApps.forEach((application) => {
                    if (application.name === selected_application.name) {
                        installed = true
                    }
                })
                const new_application = selected_application;
                new_application.installed = installed;
                onChangeSelected(new_application);
                setError(rtnError)
                onChangeInstalled(installedApps)
                setInstalling(false)
            }
        }
        fetchInstalling();
    }, [installing])

    useEffect(() => {
        Prism.highlightAll();
    }, [])

    if (!selected_application) {
        return (
            <p>no app selected</p>
        )
    }
    return (
        <Box>
            <Box padding={1}>
            <Button><ArrowBackIcon onClick={() => {onChangeSelected(null)}}/></Button>
            </Box>
            <Card>
                <CardHeader title={selected_application.name} subheader={selected_application.author? selected_application.author.user_name: null} action={
                    <Button onClick={() => {
                        setInstalling(true)
                    }}>
                        {selected_application.installed ? 'uninstall' : 'install'} {selected_application.installed ? <DeleteIcon/> : <DownloadIcon/>}
                    </Button>
                }>
                </CardHeader>
                <CardContent>
                    <pre className="line-numbers"><code className="language-python">{selected_application.python}</code></pre>
                </CardContent>

            </Card>
        </Box>
    )
}
