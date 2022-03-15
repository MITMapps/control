import React, {useEffect, useState} from "react";
import {search_mitmapps} from "../lib/community_apps";
import ClickableApplication from "./ClickableApplication";
import {getInstalledApps} from "../lib/installed_apps";

export default function SearchApplications({onChangeSelected}) {
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
        <div className="row">
            <div className="col">
                <div className="row">
                    <br/>
                    community applications
                </div>
                <div className="row">
                    <input id="search" name="search" autoFocus="True" size="40"
                           placeholder="search by app name" onChange={e => set_search_query(e.target.value)}/>
                    <button onClick={() => {
                        setSearching(true)
                    }}>search </button>
                </div>
                <div className="row">
                    {searching &&
                        <p>searching</p>
                    }
                    {(!searching && search_apps)&&
                        <ul>
                            {search_apps.map(({author, python, name}) => (
                                <ClickableApplication onChangeSelected={onChangeSelected} app_item={{author, python, name}}/>
                            ))}
                        </ul>
                    }
                    {error &&
                        <p>{error}</p>
                    }
                </div>
            </div>
        </div>
    )
}
