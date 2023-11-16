const Title = ({ children, type = "h1" }) => {
    if (type === "h1") return <h1 className="text-3xl mb-8">{children}</h1>;
    if (type === "h2") return <h2 className="text-2xl mb-4">{children}</h2>;
    if (type === "h3") return <h3 className="text-xl mb-2">{children}</h3>;
}
export default Title;
