const AdminCardTag = ({ title, content }) => {
    return (
        <div className="flex flex-col h-full md:w-[300px] pl-2 border-l border-input-light">
            <h3 className="border-b pb-1 max-w-max border-input-light p-2 mb-2">{title}</h3>
            <p className="flex-1 flex items-center text-lg pl-2">{content}</p>
        </div>
    )
}

export default AdminCardTag;