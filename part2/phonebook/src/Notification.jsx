export const Notification = ({ message, type }) => {
    if (message.success === null && message.error === null) {
        return null;
    }
    return message.success ? (
        <div className={type}>{message.success}</div>
    ) : (
        <div className={type}>{message.error}</div>
    );
};
