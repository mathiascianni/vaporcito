import { Loader } from "./_index";

const LoaderOrContent = ({ loading, Component, iterable }) => {
    return (
        <>
            {
                loading ? <div className="flex items-center justify-center w-full col-span-2 md:col-span-4 lg:col-span-6"><Loader /></div> :
                    iterable.length > 0 ? iterable.map(item => (
                        <Component key={item.id} data={item} />
                    )) :
                        <p>No hay elementos</p>
            }
        </>
    );
}

export default LoaderOrContent;
