import React from 'react';
import "./LoadingNeeded.css"

const LoadingNeeded = ({ children, isComponentLoading, overlay }) => {
    return (
        !overlay ?
            (isComponentLoading ?
                <div className="replaceWithLoading">
                    <img src="https://images-na.ssl-images-amazon.com/images/G/01/amazonui/loading/loading-4x._V391853216_.gif" />
                </div>
                :
                <>{children}</>)
            :
            (isComponentLoading ?
                <>
                    <div className="overlayLoading">
                        <img src="https://images-na.ssl-images-amazon.com/images/G/01/amazonui/loading/loading-4x._V391853216_.gif" />
                    </div>
                    {children}
                </>
                :
                <>
                    {children}
                </>)
    )
};

export default LoadingNeeded;