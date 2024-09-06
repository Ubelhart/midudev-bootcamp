export const Filter = ({ handler }) => {
    return (
        <>
            <div>
                filter shown with <input onChange={handler} />
            </div>
        </>
    );
};
