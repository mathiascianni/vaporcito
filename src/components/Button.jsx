const Button = ({ action, children, type }) => {
    return (
        <button
            onClick={action}
            className="border border-primary border-2 px-4 py-2 rounded-full hover:bg-primary text-primary hover:text-white transition"
            type={type}>
                {children}
        </button>
    );
}

export default Button;
