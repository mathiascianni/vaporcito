const InputErrorNotification = ({ errors, field }) => {
    return (
        <>
            {errors?.[field]?.length > 0 ? (
                <ul className="mb-4">
                    {errors[field].map((error, i) => (
                        <li className="text-error mb-1" key={i}>{error}</li>
                    ))}
                </ul>

            ) : ""}
        </>
    );
}

export default InputErrorNotification;
