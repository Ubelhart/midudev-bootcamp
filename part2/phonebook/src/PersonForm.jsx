export const PersonForm = ({
    onSubmit,
    onChangeName,
    onChangeNumber,
    value
}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <div>
                    name: <input onChange={onChangeName} value={value.name} />
                </div>
                <div>
                    number:{" "}
                    <input onChange={onChangeNumber} value={value.number} />
                </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};
