import React, {useEffect, useState} from "react";
import MitmApplication from "./MitmApplication";
import SearchApplications from "./SearchApplications";
import InstalledApplications from "./InstalledApplications";
import {getInstalledApps} from "../lib/installed_apps";


export default function Control() {
    const [installed_applications, setInstalledApplications] = useState(null);
    const [selected_application, set_selected_application] = useState(null);

    useEffect(() => {
        const fetchInstalledApps = async () => {
            const [installed_apps, error] = await getInstalledApps();
            setInstalledApplications(installed_apps)
        }
        fetchInstalledApps();
    }, [])

    return (
        <div className="container">
            <div className="row" style={{height: '100px'}}>
                <br/>
                Control Man-In-The-Middle Applications
            </div>
            <div className="row">
                <div className="col-lg">
                    <div className="row">
                        <div className="col">
                            <InstalledApplications installed_applications={installed_applications}
                                                   onChangeSelected={set_selected_application}/>
                            <SearchApplications onChangeSelected={set_selected_application}/>
                        </div>
                        <MitmApplication onChangeInstalled={setInstalledApplications}
                                         selected_application={selected_application}
                                         onChangeSelected={set_selected_application}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
