export default function ClickableApplication({onChangeSelected, app_item, installed}) {
    return (
        <li key={app_item.name} onClick={() => {
            onChangeSelected({name: app_item.name, python: app_item.python, installed: installed})
        }
        }>
            {app_item.name}
        </li>
    )
}
