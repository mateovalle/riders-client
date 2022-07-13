import './MessageBox.css'

const MessageBox = ({text, own})  => {

    const getClassname = () => {
        return own ? 'message-box-container you' : 'message-box-container rider'
    }

    return (
        <div className={getClassname()}>
            <div className="box-message">
                <div className="username">
                    {own ? 'Me' : 'Rider'}
                </div>
                <div className="message">
                    {text}
                </div>
            </div>
        </div>
    )
}

export default MessageBox
