
import Icon, { list } from '../../components/Icons';

export default function ListIcons() {
    const iconsList = Object.keys(list);
    // console.log(iconsList)
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                iconsList.map((icon) => {

                    return (<div key={icon} style={style.box}>
                        <Icon icon={icon} />
                        <span style={style.label}>{icon}</span>
                    </div>)
                })
            }
        </div>
    )
}

const style = {
    box: { minWidth: 160, height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, border: '1px solid #CCC', margin: 16, padding: 8, borderRadius: 8 },
    label: {
        fontSize: 12
    }
}