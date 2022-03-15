import {Card, CardContent, CardHeader, Typography} from "@mui/material";

export default function ClickableApplication({onChangeSelected, app_item, installed}) {
    const sub_header = app_item.author ? app_item.author.user_name: null;
    return (
        <Card sx={{ display: 'inline'}} key={app_item.name} onClick={() => {
            onChangeSelected(app_item)
        }
        }>
            <CardHeader title={app_item.name} subheader={sub_header}/>
        </Card>
    )
}
