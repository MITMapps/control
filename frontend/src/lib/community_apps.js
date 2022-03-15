

export async function search_mitmapps(searchText) {
    let query;
    if (searchText) {
        query = 'https://mitmapps.ca/api/app/' + searchText
    } else {
        query = 'https://mitmapps.ca/api/top/apps'
    }

    const resp = await fetch(query, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    if (resp.status == 200) {
        let result = await resp.json();
        if (searchText){
            result = [result]
        }
        return [await result, null]
    } else {
        return [null, await resp.text()]
    }
}
