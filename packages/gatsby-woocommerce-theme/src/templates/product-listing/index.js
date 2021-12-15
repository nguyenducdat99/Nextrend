import { graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import BreadCrumb from '../../common/BreadCrumb';
import DescriptionCategory from '../../common/DescriptionCategory';
import Layout from '../../components/layout';
import ProductsBanner from '../../components/products/products-banner';
import ProductsFilters from '../../components/products/products-filters';
import ProductsList from '../../components/products/products-list';
import ProductsTabs from '../../components/products/products-tabs';
import SEO from '../../components/seo';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getOgImage } from '../../utils/functions';
import { BASE_BREADCRUMB, TABS, homePage } from './data';
import './styles.scss';

/* eslint-disable */
function ProductByCate(props) {
  const { width } = useWindowDimensions();
  const pageRange = 5;
  const productsPerPage = 15;
  const { pageContext } = props;
  const { groupedProductsCustom, filteredProducts } = pageContext;
  const currentProductList = groupedProductsCustom || filteredProducts;
  const [products, setProducts] = useState(currentProductList);
  const [activePage, setActivePage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState(null);
  const [subCategories, setSubCategories] = useState(pageContext.subCategories);
  const [loadMore, setLoadMore] = useState(false);
  const [mobileProductList, setMobileProductList] = useState([
    ...currentProductList.slice(0, 10),
  ]);
  const [hasMore, setHasMore] = useState(currentProductList.length > 10);

  const categoryDes = props?.data?.categoryDescription?.nodes[0];
  const desCategory = categoryDes?.content;
  const categoryReference = categoryDes?.productCategories?.categoryReference;
  const imgCategory =
    categoryDes?.productCategories?.descriptionImage?.sourceUrl;

  useEffect(() => {
    /* SEARCHING */
    if (props.location.state?.searchQuery) {
      const searchQuery = props.location.state.searchQuery;
      const productsResult = groupedProductsCustom.filter((product) => {
        return product.node.name.toLowerCase().includes(searchQuery);
      });
      setProducts(productsResult);
    }

    if (pageContext?.slug === 'All') {
      setProducts(groupedProductsCustom);
      setSubCategories(pageContext.hierarchyCategories);
    }
    if (pageContext.slug && pageContext.slug !== 'All') {
      setProducts(filteredProducts);
      setSubCategories(pageContext.subCategories);
    }
  }, [pageContext.slug, props.location.state, activePage]);

  /* Handle loading more products */
  useEffect(() => {
    if (width > 575) return;
    if (loadMore && hasMore) {
      const currentLength = mobileProductList.length;
      const isMore = currentLength < currentProductList.length;
      const nextResults = isMore
        ? currentProductList.slice(currentLength, currentLength + 10)
        : [];
      setMobileProductList([...mobileProductList, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]);

  /* Check if there is more */
  useEffect(() => {
    if (width > 575) return;
    const isMore = mobileProductList.length < currentProductList.length;
    setHasMore(isMore);
  }, [mobileProductList]);

  /**
   * Whenever the products length changes,
   * which means the Product component is re-rendered because
   * its parent changed the 'products' value ( because search was done, by user, so new product results ),
   * then do the following :
   * 1. Set the active page to 1 ( refresh current page to 1 ),
   * 2. Update the products to be displayed
   *
   */
  useEffect(() => {
    const activePage = 1;
    setActivePage(activePage);

    /* eslint-disable */
    setProductsToBeDisplayed(activePage * productsPerPage);
  }, [products.length]);

  useEffect(() => {
    /* eslint-disable */
    setProductsToBeDisplayed(activePage * productsPerPage);
  }, [activePage]);

  /**
   * @param lastProductIndex Last product index.
   */
  const setProductsToBeDisplayed = (lastProductIndex) => {
    const indexOfLastProduct = lastProductIndex;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    /*     // Get all the products from index of first product, to index of last product
     */ const currentProductsData = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setCurrentProducts(currentProductsData);
  };

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(pageNumber);
  };

  const handleLoadMore = () => {
    setLoadMore(true);
  };

  const deepBreadcrumb = pageContext.hasOwnProperty('slug')
    ? Object.values(
        Object.fromEntries(
          pageContext.slug.split('/').map((el, index) => [
            index,
            {
              title: el.includes('-')
                ? el
                    .split('-')
                    .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
                    .join(' ')
                : el.charAt(0).toUpperCase() + el.slice(1),
              slug: `/product-category/${pageContext.slug.substring(
                0,
                pageContext.slug.indexOf(el)
              )}${el}`,
            },
          ])
        )
      )
    : [];

  const breadcrumbData =
    deepBreadcrumb.length > 0
      ? BASE_BREADCRUMB.concat(deepBreadcrumb)
      : BASE_BREADCRUMB.concat([]);

  //SEO DATA

  const seoInfo = {
    opengraphTitle: homePage.title,
    twitterTitle: homePage.title,
    metaDesc: homePage.des,
    opengraphDescription: homePage.des,
    twitterDescription: homePage.des,
  };

  return (
    <Layout>
      <SEO
        title='Products'
        description={homePage.des}
        seoData={seoInfo}
        uri={props?.location?.href}
        openGraphImage={getOgImage(seoInfo)}
      />
      <div className='product-listing-banner'>
        <ProductsBanner
          textBannerRight='true'
          allWpProductCategory={props.data.allWpProductCategory.nodes}
          slug={pageContext.slug}
        />
      </div>
      <div className='container'>
        <div className='row ml-0'>
          <BreadCrumb inputBreadCrumb={breadcrumbData} />
        </div>
      </div>
      <ProductsTabs listTabs={TABS} />
      <div className='products-containers'>
        <div className='products-container container'>
          <div className='row'>
            <div className='col-sm-3 col-xs-3 col-md-3 col-lg-3'>
              <ProductsFilters
                categories={subCategories}
                slug={pageContext.slug}
              />
            </div>
            <div className='col-sm-9 col-xs-9 col-md-9 col-lg-9'>
              <ProductsList
                products={width > 575 ? currentProducts : mobileProductList}
                prevPath={props?.path}
                {...props}
              />
            </div>
          </div>

          <div className='row justify-content-center load-more-btn'>
            {hasMore ? (
              <button
                className='load-more btn btn-primary'
                onClick={handleLoadMore}
              >
                Load More
              </button>
            ) : (
              <p>No more results</p>
            )}
          </div>

          <div className='row product-list-pagination'>
            <div className='col-sm-9 offset-sm-3 col-xs-9 offset-xs-3 col-md-9 offset-md-3 col-lg-9 offset-lg-3'>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={productsPerPage}
                totalItemsCount={products.length}
                pageRangeDisplayed={pageRange}
                onChange={handlePageChange}
                itemClass={'page-item'}
                linkClass={'page-link'}
                prevPageText='&lsaquo;'
                nextPageText='&rsaquo;'
              />
            </div>
          </div>
        </div>
        {categoryDes && (
          <DescriptionCategory
            desCategory={desCategory}
            categoryReference={categoryReference}
            imgCategory={imgCategory}
          />
        )}
      </div>
    </Layout>
  );
}

export default ProductByCate;

export const productListQuery = graphql`
  query LIST_PRODUCT_CATE($des: String) {
    groupedProductsList: allGoogleNextrendproductSheet(
      filter: { groupedProducts: { ne: null } }
    ) {
      totalCount
    }
    categoryDescription: allWpProductCategory(
      filter: { productCategories: { categoryReference: { eq: $des } } }
    ) {
      nodes {
        content
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        productCategories {
          categoryReference
          descriptionImage {
            sourceUrl
          }
        }
      }
    }
    allWpProductCategory {
      nodes {
        slug
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;
