import './App.css';
import React from 'react';

export default App;


class MITMApplicationSelector extends React.Component {
    render() {
        return (
            <div className="col">
                {/*<InstalledApplications installed_apps={this.props.installed_apps}*/}
                {/*                       onChangeSelected={this.props.onChangeSelected}/>*/}
                <SearchApplications onChangeSelected={this.props.onChangeSelected}/>
            </div>
        )
    }
}

class InstalledApplications extends React.Component {
    render() {
        const rows = [];
        this.props.installed_apps.forEach((application) => {
            rows.push(
                <ClickableApplication app_item={application} onChangeSelected={this.props.onChangeSelected}/>
            )
        })
        return (
            <div className="row">
                <div className="col">
                    <div className="row">
                        installed applications
                    </div>
                    <div className="row" style={{overflow: 'scroll', height: '340px'}}>
                        <ul>
                            {rows}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

class SearchApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_apps: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.handleSearch('')
    }

    handleSearch(searchText) {
        let query = ''
        if (searchText.length > 0) {
            query = '/' + searchText
        }

        fetch('https://mitmapps.ca/apps' + query, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            if (result.length > 1) {
                this.setState({search_apps: result});
            } else {
                this.setState({search_apps: [result]});
            }
        })
    }

    render() {
        const rows = [];
        this.state.search_apps.forEach((application) => {
            rows.push(
                <ClickableApplication onChangeSelected={this.props.onChangeSelected} app_item={application}/>
            )
        })
        return (
            <div className="row">
                <div className="col">
                    <div className="row">
                        <br/>
                        community applications
                    </div>
                    <div className="row">
                        <input id="search" name="search" autoFocus="True" size="40"
                               placeholder="search by app name" onChange={e => this.handleSearch(e.target.value)}/>
                    </div>
                    <div className="row">
                        <ul>
                            {rows}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

class MITMApplication extends React.Component {
    handleInstallApplication() {
        let new_app_list = []
        if (this.props.selected_application.installed) {
            /// uninstall
            for (let application in this.props.installed_applications) {
                if (!(application.name === this.props.selected_application.name)) {
                    // intentionally excluding the installed status
                    new_app_list.push({'name': application.name, 'python': application.python})
                }
            }
        } else {
            /// install
            for (let application in this.props.installed_applications) {
                // intentionally excluding the installed status
                new_app_list.push({'name': application.name, 'python': application.python})
            }
            new_app_list.push(this.props.selected_application)
        }

        fetch('https://192.168.2.128/installed/apps', {
            method: 'POST',
            body: JSON.stringify(new_app_list)
        })
            .then(res => res.json())
            .then((result) => {
                /// we search the response for the selected application to make sure it was actually installed.
                for (let application in result) {
                    if (application.name === this.props.selected_application.name) {
                        this.props.onChangeSelected(
                            {
                                'name': this.props.selected_application.name,
                                'python': this.props.selected_application.python,
                                'installed': true
                            })
                    }
                }
                this.props.onInstallApp(result)
            }
            )
    }

    render() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col">
                        {this.props.selected_application.name}
                    </div>
                    <div className="col" onClick={this.handleInstallApplication}>
                        {this.props.selected_application.installed ? 'install' : 'uninstall'} application
                    </div>
                </div>
                <div className="row" style={{overflow: 'scroll', height: '800px', borderStyle: 'solid'}}>
                    {this.props.selected_application.python}
                </div>
            </div>
        )
    }
}


class ClickableApplication extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSelected = this.handleChangeSelected.bind(this);
    }
    handleChangeSelected() {
        this.props.onChangeSelected(this.props.app_item)
    }
    render() {
        return (
            <li onClick={this.handleChangeSelected}>{this.props.app_item.name}</li>
        )
    }
}

class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_application: {
                'name': 'none',
                'python': 'none',
                'installed': true
            },
            installed_applications: []
        };
        this.handleInstallApplication = this.handleInstallApplication.bind(this);
        this.handleSelectApplication = this.handleSelectApplication.bind(this)
    }

    componentDidMount() {
        fetch('https://localhost:8080/installed/apps')
            .then(res => res.json())
            .then((result) => {
                this.handleInstallApplication(result)
                if (result.length > 0) {
                    this.handleSelectApplication(result[0])
                }
            }, (error) => {
                this.handleInstallApplication([])
                this.handleSelectApplication({
                    'name': 'could not load installed apps',
                    'python': 'none',
                    'installed': true
                })
            })
    }

    handleInstallApplication(installed_applications) {
        for (let installed_app in installed_applications) {
            installed_app['installed'] = true
        }
        this.setState({installed_applications: {installed_applications}})
    }

    handleSelectApplication(select_application) {
        this.setState({selected_application: select_application})
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{height: '100px'}}>
                    <br/>
                    Control Man-In-The-Middle Applications
                </div>
                <div className="row">
                    <div className="col-lg">
                        <div className="row">
                            <MITMApplicationSelector installed_apps={this.state.installed_applications}
                                                     onChangeSelected={this.handleSelectApplication}/>
                            <MITMApplication onInstallApp={this.handleInstallApplication}
                                             onChangeSelected={this.handleSelectApplication}
                                             selected_application={this.state.selected_application}
                                             installed_applications={this.state.installed_applications}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function App() {
    return React.createElement(Control, {});
}
