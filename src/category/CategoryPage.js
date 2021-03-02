import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import "./CategoryPage.css";
import { getCategoryResult } from '../actions/category';
import SearchedProduct from '../search/SearchedProduct';
import LoadingNeeded from '../utilComponents/LoadingNeeded';

function CategoryPage() {
    const history = useHistory();
    const [productList, setProductList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { categoryKeyword } = useParams();

    useEffect(() => {
        setLoading(true);
        if (!categoryKeyword) return history.push('/redirect');

        getCategoryResult('?k=' + categoryKeyword)
            .then((result) => {
                setProductList(result.res);
                setLoading(false);
            });
    }, [categoryKeyword]);

    return (
        <div className="searchCategoryWrapper">
            <div className="searchCategory">
                <LoadingNeeded isComponentLoading={isLoading}>
                    {
                        productList.length
                            ?
                            <>
                                <div>Showing Results for category <span>"{categoryKeyword}"</span></div>
                                <div className="searchCategoryFlex">
                                    {productList.map(p =>
                                        <SearchedProduct info={p} />
                                    )}
                                </div>
                            </>
                            :
                            <>
                                <div className="searchCategoryEmpty">No category found for  <span>"{categoryKeyword}"</span></div>
                                <div className="searchCategoryTryAgain">Try checking your spelling or use more general terms</div>
                            </>
                    }
                </LoadingNeeded>
            </div>
        </div>
    );
}

export default CategoryPage;