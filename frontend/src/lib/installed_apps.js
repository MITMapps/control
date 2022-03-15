const url = window.location.protocol + '//' + window.location.hostname + ':90/installed/apps';

export async function getInstalledApps() {
    const resp = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
    if (resp.status == 200) {
        return [await resp.json(), null]
    } else {
        return [null, await resp.text()]
    }
}

export async function installApp(desired_application) {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(desired_application),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (resp.status ==200) {
        return [await resp.json(), null]
    } else {
        return [null, await resp.text()]
    }
}

export async function uninstallApp(desired_application) {
    const resp = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(desired_application),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (resp.status ==200) {
        return [await resp.json(), null]
    } else {
        return [null, await resp.text()]
    }
}
