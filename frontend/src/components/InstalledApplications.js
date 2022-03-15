import React from 'react';
import ClickableApplication from "./ClickableApplication";

export default function InstalledApplications({installed_applications, onChangeSelected}) {
    if (!installed_applications) {
        return (
            <p>loading</p>
        )
    }
    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    installed applications
                </div>
                <div className="row" style={{overflow: 'scroll', height: '340px'}}>
                    <ul>
                        {installed_applications.map(({name, python}) => (
                            <ClickableApplication installed onChangeSelected={onChangeSelected} app_item={{name, python}}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
