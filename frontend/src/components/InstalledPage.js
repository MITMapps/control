import React from 'react';
import ClickableApplication from "./ClickableApplication";
import {Box, Card, Stack, Typography} from "@mui/material";

export default function InstalledPage({installed_applications, onChangeSelected}) {
    if (!installed_applications) {
        return (
            <p>loading</p>
        )
    }
    return (
        <Box  maxWidth="sm">
            <Stack spacing={2}>
                {
                    installed_applications.map(({name, python}) => (
                        <ClickableApplication installed onChangeSelected={onChangeSelected} app_item={{python, name}}/>
                    ))
                }
            </Stack>
        </Box>

    )
}
