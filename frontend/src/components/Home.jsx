import React, { useEffect, useState } from 'react';
import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../actions/productActions'
import Product from './product/Product';
import { useParams } from 'react-router'
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);

    /**
     * Search Functionality is pending , I will Complete it after complete this tutorial
     */
    const match = '';
    const keyword = useParams().keyword;

    // const keyword = match ? match.params.keyword : '';
    useEffect(() => {
        dispatch(getProducts(keyword, currentPage))

        if (error) {
            dispatch(clearErrors);
        }
    }, [dispatch, error, currentPage, keyword]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    return (
        <>
            <div className='container container-fluid'>
                {loading ? <Loader /> : (
                    <>
                        <MetaData title={'Buy Good Products Online '} />
                        <h1 id="products_heading">Latest Products</h1>

                        <section id="products" className="container mt-5">
                            <div className="row">
                                {products && products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))}

                            </div>
                        </section>
                        {resPerPage <= productsCount && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass='page-item'
                                    linkClass='page-link'
                                />
                            </div>
                        )}

                    </>
                )}
            </div>
        </>
    )
}

export default Home