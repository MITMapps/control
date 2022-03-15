import {installApp, uninstallApp} from "../lib/installed_apps";
import {useEffect, useState} from "react";
import {search_mitmapps} from "../lib/community_apps";


export default function MitmApplication({onChangeInstalled, selected_application, onChangeSelected}) {
    const [error, setError] = useState(null);
    const [installing, setInstalling] = useState(false)

    useEffect(() => {
        const fetchInstalling = async () => {
            if (installing) {
                const func = selected_application.installed ? uninstallApp: installApp
                const [installedApps, rtnError] = await func(selected_application);
                let installed = false
                installedApps.forEach((application) => {
                    if (application.name === selected_application.name) {
                        installed = true
                    }
                })
                const new_application = selected_application;
                new_application.installed=installed;
                onChangeSelected(new_application);
                setError(rtnError)
                onChangeInstalled(installedApps)
                setInstalling(false)
            }
        }
        fetchInstalling();
    }, [installing])

    if (!selected_application) {
        return (
            <p>no app selected</p>
        )
    }
    return (
        <div className="col">
            <div className="row">
                <div className="col">
                    {selected_application.name}
                </div>
                <div className="col" onClick={() => {
                    setInstalling(true)
                }}>
                    {selected_application.installed ? 'uninstall' : 'install'} application
                </div>
            </div>
            <div className="row"
                 style={{overflow: 'scroll', height: '800px', borderStyle: 'solid', whiteSpace: 'pre-wrap'}}>
                {selected_application.python}
            </div>
        </div>
    )
}
