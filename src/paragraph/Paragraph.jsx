import './styles.css'

function Paragraph({text='', data}) {
    if (!text) {
        return (
            <p className={'film-info'}>{data}</p>
        )
    }

    return (
        <p className={'film-info'}><span>{text}</span>: {data}</p>
    )
}

export default Paragraph;