/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React from 'react';

const Home = ({ products }) => {
    return (
        <main>
            <section className="super-deal-area pb-40" id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        {products &&
                            products.map((product, index) => (
                                <div className="col-xl-3 col-md-4 col-sm-6" key={product._id}>
                                    <div className="super-deals-item text-center mb-55">
                                        <div className="super-deal-thumb mb-25">
                                            {index % 2 === 0 && (
                                                <span className="sd-meta">New!</span>
                                            )}
                                            <a href="shop-details.html">
                                                <img src={product.picture} alt="" />
                                            </a>
                                        </div>
                                        <div className="super-deal-content">
                                            <h6>
                                                <a href="shop-details.html">{product.name}</a>
                                            </h6>
                                            <p>
                                                US $ {product.price}
                                                {index % 2 !== 0 && <span>{'50 % off'}</span>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

// Export out the React Component
module.exports = Home;
