const Notification = ({notif}) => {
    if(notif == null){
        return null
    }
    else{
        return (
            <div className={notif.type}>
                {notif.message}
            </div>
        )
    }
}

export default Notification