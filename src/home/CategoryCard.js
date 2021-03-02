import React from 'react';
import { Link } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({ title, image, categoryName }) {
    let categoryKeyword = categoryName.toLowerCase().replace(/\W+/g, "-");
    return (
        <div className="categoryCard">
            <div className="categoryCardTitle">
                {title}
            </div>
            <div className="categoryCardImage">
                <img src={image} />
            </div>
            <Link to={`/category/${categoryKeyword}`}>See more</Link>
        </div>
    );
}

export default CategoryCard;