import React from 'react';

const LoaderOrContent = ({ loading, Component, iterable }) => {
    return (
        <>
            {
                loading ? <p>Cargando...</p> :
                    iterable ? iterable.map(item => (
                        <Component key={item.id} data={item} />
                    )) :
                        <p>No hay elementos</p>
            }
        </>
    );
}

export default LoaderOrContent;
