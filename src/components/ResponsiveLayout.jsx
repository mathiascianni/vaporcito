const ResponsiveLayout = ({ children }) => {
    return (
        <div className="md:container mx-auto md:px-8 px-2">
            {children}
        </div>
    )
}

export default ResponsiveLayout;