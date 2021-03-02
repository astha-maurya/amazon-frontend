import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import "./SearchResult.css";
import * as queryString from 'query-string';
import { getSearchResult } from '../actions/search';
import SearchedProduct from './SearchedProduct';
import LoadingNeeded from '../utilComponents/LoadingNeeded';

function SearchResult() {
    const history = useHistory();
    const location = useLocation();
    const [productList, setProductList] = useState([]);
    const query = queryString.parse(location.search);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (!query.k) return history.push('/redirect');

        getSearchResult(location.search)
            .then((result) => {
                setProductList(result.res);
                setLoading(false);
            });
    }, [location.search])

    return (
        <div className="searchResultWrapper">
            <div className="searchResult">
                <LoadingNeeded isComponentLoading={isLoading}>
                    {
                        productList.length
                            ?
                            <>
                                <div>Showing Results for <span>"{query.k}"</span></div>
                                <div className="searchResultFlex">
                                    {productList.map(p =>
                                        <SearchedProduct info={p} />
                                    )}
                                </div>
                            </>
                            :
                            <>
                                <div className="searchResultEmpty">No results found for <span>"{query.k}"</span></div>
                                <div className="searchResultTryAgain">Try checking your spelling or use more general terms</div>
                            </>
                    }
                </LoadingNeeded>
            </div>
        </div>
    );
}

export default SearchResult;