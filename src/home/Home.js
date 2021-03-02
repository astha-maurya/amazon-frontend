import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import Carousel from "./Carousel"
import CategoryCard from './CategoryCard';
import { useUserContext } from '../contexts/UserContext';
import { logout } from '../actions/session';

function Home() {
    const [{ user }, dispatchUser] = useUserContext();

    return (
        <div className="home">
            <Carousel />
            <div className="homeRow">
                <div className="homeOrder1">
                    <CategoryCard
                        title={"Electronics, Appliances and more"}
                        image={"https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/GW/Dashboard/WFH_GW_DC_379x304._SY304_CB417122473_.jpg"}
                        categoryName="Electronics Appliances"
                    />
                </div>
                <div className="homeOrder2">
                    <CategoryCard
                        title={"Fashion and Clothing"}
                        image={"https://images-eu.ssl-images-amazon.com/images/G/31/img20/Fashion/WRS_PC_June16/WRC_CC/Flexible_Desktop__Cat_Card_2X._SY304_CB429564537_.jpg"}
                        categoryName="Fashion Clothing"
                    />

                </div>
                <div className="homeOrder3">
                    <CategoryCard
                        title={"Home essentials | Amazon Brands & more"}
                        image={"https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_HomeBedding_Single_Cat_1x._SY304_CB418596953_.jpg"}
                        categoryName="Home Essentials"
                    />
                </div>
                <div className="homeRowAuthCardWrapper homeOrder4">
                    <div className="homeRowAuthCard">
                        {user ?
                            <>
                                <div>
                                    <div>Welcome to Amazon</div>
                                    <div>Shop now for some amazing deals on a wide range of products.</div>
                                    <Link to="/login" onClick={() => { if (user) logout()(dispatchUser) }}>Sign Out</Link>
                                </div>
                                <div>
                                    <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_D2_45M_en_US_1x._CB418309979_.jpg" />
                                </div>
                            </>
                            :
                            <>
                                <div>
                                    <div>Sign in for your best experience</div>
                                    <Link to="/login" onClick={() => { if (user) logout()(dispatchUser) }}>Sign In</Link>
                                </div>
                                <div>
                                    <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_D2_45M_en_US_1x._CB418309979_.jpg" />
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="homeOrder5">
                    <CategoryCard
                        title={"Stationery & office supplies"}
                        image={"https://images-eu.ssl-images-amazon.com/images/G/31/img20/OP/GW/Dashboard/D14264916_IN_Printers_OP_GW_revamp_nov19_dashbord_Card_1x_5._SY304_CB412970424_.jpg"}
                        categoryName="Stationery Office-supplies"
                    />
                </div>
                <div className="homeOrder6">
                    <CategoryCard
                        title={"Beauty and Grooming"}
                        image={"https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"}
                        categoryName="Beauty Grooming"
                    />
                </div>
                <div className="homeOrder7">
                    <CategoryCard
                        title={"Chocolates, sweets & more"}
                        image={"https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"}
                        categoryName="Chocolates Sweets"
                    />
                </div>
                <div className="homeOrder8">
                    <CategoryCard
                        title={"Get fit at home"}
                        image={"https://images-na.ssl-images-amazon.com/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x._SY304_CB434924743_.jpg"}
                        categoryName="Fitness Sports"
                    />
                </div>
                <div className="homeOrder9 homeOrderLast">
                    <CategoryCard
                        title={"Amazon Pantry"}
                        image={"https://images-eu.ssl-images-amazon.com/images/G/31/img17/Pantry/January2021/GW_MSO/CC_379x304._SY304_CB411921708_.jpg"}
                        categoryName="Amazon Pantry"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;

// <div className="homeRow">
//                 <Product
//                     _id="5fce35c8dea8269518148151"
//                     id="1"
//                     title="Amazon Brand - Solimo Paisley Preen 144 TC 100% Cotton Double Bedsheet with 2 Pillow Covers, Green and Orange"
//                     image="https://images-na.ssl-images-amazon.com/images/I/915OxtyTSIL._SL1500_.jpg"
//                     price={750}
//                     rating={4}
//                     brand="Amazon Brand - Solimo"
//                 />
//                 <Product
//                     id="2"
//                     _id="5fce3636dea8269518148152"
//                     title="Bosch 7 kg Fully-Automatic Front Loading Washing Machine (WAK24268IN, silver/grey, Inbuilt Heater)"
//                     image="https://m.media-amazon.com/images/I/61f6grHkHRL._AC_UY327_FMwebp_QL65_.jpg"
//                     price={28000}
//                     rating={4}
//                     brand="Bosch"
//                 />
//             </div>
//             <div className="homeRow">
//                 <Product
//                     id="3"
//                     _id="5fce3678dea8269518148153"
//                     title="KENT Supreme 2020 (11111), Wall Mountable, RO + UF + TDS Control + UV in Tank, 8 L Tank, White, 20 LPH Water Purifier"
//                     image="https://images-eu.ssl-images-amazon.com/images/G/31/img20/AmazonBrands/GW/2-1_186x116._SY116_CB430773131_.jpg"
//                     price={11999}
//                     rating={4}
//                     brand="Kent"
//                 />
//                 <Product
//                     id="4"
//                     _id="5fce36c9dea8269518148154"
//                     title="Wesley Milestone 15.6 inch 25 L Casual Waterproof Laptop Backpack/Office Bag/School Bag/College Bag/Business Bag/Unisex Travel Backpack"
//                     image="https://images-na.ssl-images-amazon.com/images/I/81cB0YABm3L._SL1500_.jpg"
//                     price={999.5}
//                     rating={4}
//                     brand="Wesley"
//                 />
//                 <Product
//                     id="5"
//                     _id="5fce3734dea8269518148156"
//                     title="Pigeon by Stovekraft Large Handy and Compact Chopper with 3 blades for effortlessly chopping vegetables and fruits for your kitchen"
//                     image="https://images-na.ssl-images-amazon.com/images/I/516UOQ-FqVL._SL1080_.jpg"
//                     price={369}
//                     rating={3}
//                     brand="Pigeon"
//                 />
//             </div>
//             <div className="homeRow">
//                 <Product
//                     id="6"
//                     _id="5fce3777dea8269518148157"
//                     title="Samsung 163 cm (65 Inches) Wondertainment Series Ultra HD LED Smart TV UA65TUE60AKXXL (Titan Gray) (2020 model)"
//                     image="https://images-na.ssl-images-amazon.com/images/I/71tt%2BZeOw%2BL._SL1500_.jpg"
//                     price={94999}
//                     rating={5}
//                     brand="Samsung"
//                 />
//             </div>