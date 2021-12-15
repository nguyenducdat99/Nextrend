import { graphql, Link } from 'gatsby';
import Parser from 'html-react-parser';
import React, { useState } from 'react';
import BreadCrumb from '../../common/BreadCrumb';
import ButtonViewMore from '../../common/ButtonViewMore';
import CardRelatedProject from '../../common/CardRelatedProject';
import ArrowRight from '../../components/icons/ArrowRight';
import Layout from '../../components/layout';
import ProductFeatures from '../../components/product-detail/product-features';
import ProductInfo from '../../components/product-detail/product-info';
import ProductMoreInfo from '../../components/product-detail/product-more-info';
import ProductsList from '../../components/products/products-list';
import SEO from '../../components/seo';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getOgImage } from '../../utils/functions';
import './styles.scss';

const getValues = (arr, field) => {
  return arr && arr.map((item) => item.node[`${field}`]);
};

function DetailProduct(props) {
  const { listProductsRelated, parentProduct, product } = props.pageContext;
  const {
    images,
    name,
    id,
    type,
    stock_quantity,
    categories,
    listSimpleProduct,
    shortDescription,
    stocked,
    videoLink,
    videoTitle,
    videoDescription,
    slug,
    customValue1Name,
    customValue1Value,
    customValue2Name,
    customValue2Value,
    customValue3Name,
    customValue3Value,
    customValue4Name,
    customValue4Value,
    customValue5Name,
    customValue5Value,
    groupedProducts,
  } = product;

  const {
    meta_Features,
    meta_NextrendIconsWarranty,
    meta_NextrendIconsWaterResistant,
    meta_NextrendIconsUv,
    meta_FurnIconsIndoorOutdoor,
    meta_NextrendIconsCatas,
    meta_NextrendIconsAfrdi,
    meta_NextrendIconsFastDispatch,
    weight__kg_,
    meta_Dimensions,
    meta_Swl,
    meta_AssemblyRequired,
    meta_NextrendIconsStackable,
    meta_Madein,
    meta_Prodhighlights,
  } = parentProduct ? parentProduct : product;

  const listRelatedProjects = props.data.allWpProject.nodes;
  const { width } = useWindowDimensions();
  const getListSimpleProductMatchColor =
    Array.isArray(listSimpleProduct) &&
    listSimpleProduct.filter((el) => el.node.meta_ProductColour !== null);

  const getCustom = (custom) => {
    let result = [];
    if (custom !== null && custom !== 'Colour' && custom !== 'Table Colour') {
      return (result = Parser(`${custom}`).split(','));
    }
    return result;
  };

  const custom1Name = getCustom(customValue1Name);
  const custom1Value = getCustom(customValue1Value);
  const custom2Name = getCustom(customValue2Name);
  const custom2Value = getCustom(customValue2Value);
  const custom3Name = getCustom(customValue3Name);
  const custom3Value = getCustom(customValue3Value);
  const custom4Name = getCustom(customValue4Name);
  const custom4Value = getCustom(customValue4Value);
  const custom5Name = getCustom(customValue5Name);
  const custom5Value = getCustom(customValue5Value);

  const colors = getValues(
    getListSimpleProductMatchColor,
    'meta_ProductColour'
  );

  const simpleProductImages = getValues(
    getListSimpleProductMatchColor,
    'images'
  );
  const [displayImage, setDisplayImage] = useState(
    (images && images.split(',')[0]) || ''
  );
  const [selectedSimpleProduct, setSelectedSimpleProduct] = useState(null);

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const arrPath = props.location.state?.prevPath
    ? props.location.state?.prevPath
        .replace('/projects', '')
        .replace('/products', '')
        .split('/')
        .filter((el) => el !== '')
    : [];
  let deepBreadCrumb = [];
  if (arrPath.length <= 1) {
    deepBreadCrumb = {
      title: name,
      slug: `/${slug}`,
    };
  } else {
    let prevPath =
      props.location.state?.prevPath &&
      props.location.state?.prevPath.replace('/product-category/', '') +
        `/${name}`;
    deepBreadCrumb = Object.values(
      Object.fromEntries(
        prevPath.split('/').map((el, index) => [
          index,
          {
            title: el.includes('-')
              ? el
                  .split('-')
                  .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
                  .join(' ')
              : el.charAt(0).toUpperCase() + el.slice(1),
            slug: `/product-category/${prevPath.substring(
              0,
              prevPath.indexOf(el)
            )}${el}`,
          },
        ])
      )
    );
  }

  const inputBreadCrumb = [
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Products',
      slug: '/products',
    },
  ].concat(deepBreadCrumb);

  const handleSelectProductVariant = (e) => {
    let variantColorImages = e.target.dataset.image_src.split(', ');
    const selectedSimpleProduct = listSimpleProduct[e.target.dataset.index];
    setDisplayImage(variantColorImages[0]);
    setActiveColorIndex(e.target.dataset.index);
    setSelectedSimpleProduct(selectedSimpleProduct.node);
  };

  //SEO DATA

  const des = shortDescription
    ? Parser(`${shortDescription}`)
    : Parser(`${parentProduct?.shortDescription}`);

  const seoInfo = {
    opengraphTitle: name,
    twitterTitle: name,
    metaDesc: des,
    opengraphDescription: des,
    twitterDescription: des,
    opengraphImage: {
      sourceUrl: displayImage,
    },
    twitterImage: {
      sourceUrl: displayImage,
    },
  };

  return (
    <Layout>
      <SEO
        title={name}
        description={des}
        seoData={seoInfo}
        uri={props.location.href}
        openGraphImage={getOgImage(seoInfo)}
      />
      <div className='container product-detail-page'>
        <BreadCrumb inputBreadCrumb={inputBreadCrumb} />
        <div className='row parts'>
          <div className='col-lg-6 log-md-6 col-ms-6'>
            <img src={displayImage} alt='' />
          </div>
          <div className='col-lg-6 log-md-6 col-ms-6'>
            <ProductInfo
              isProductDetail={true}
              id={id}
              stocked={stocked}
              name={name}
              stock_quantity={stock_quantity}
              shortDescription={
                shortDescription
                  ? shortDescription
                  : parentProduct?.shortDescription
              }
              categories={categories ? categories : parentProduct?.categories}
              colors={colors}
              type={type}
              customName1={custom1Name[0]}
              customValue1={custom1Value}
              customName2={custom2Name[0]}
              customValue2={custom2Value}
              customName3={custom3Name[0]}
              customValue3={custom3Value}
              customName4={custom4Name[0]}
              customValue4={custom4Value}
              customName5={custom5Name[0]}
              customValue5={custom5Value}
              activeColorIndex={activeColorIndex}
              images={
                simpleProductImages ? simpleProductImages : product.images
              }
              handleSelectProductVariant={handleSelectProductVariant}
              listSimpleProduct={listSimpleProduct}
              meta_NextrendIconsUv={meta_NextrendIconsUv}
              meta_NextrendIconsWarranty={meta_NextrendIconsWarranty}
              meta_NextrendIconsWaterResistant={
                meta_NextrendIconsWaterResistant
              }
              meta_NextrendIconsStackable={meta_NextrendIconsStackable}
              selectedSimpleProduct={selectedSimpleProduct}
              parentProduct={parentProduct}
              slug={slug}
            />
          </div>
        </div>
        <ProductFeatures
          meta_Features={meta_Features}
          meta_NextrendIconsWarranty={meta_NextrendIconsWarranty}
          meta_NextrendIconsWaterResistant={meta_NextrendIconsWaterResistant}
          meta_NextrendIconsUv={meta_NextrendIconsUv}
          meta_FurnIconsIndoorOutdoor={meta_FurnIconsIndoorOutdoor}
          meta_NextrendIconsCatas={meta_NextrendIconsCatas}
          meta_NextrendIconsAfrdi={meta_NextrendIconsAfrdi}
          meta_NextrendIconsFastDispatch={meta_NextrendIconsFastDispatch}
          weight__kg_={weight__kg_}
          meta_Dimensions={meta_Dimensions}
          meta_Swl={meta_Swl}
          meta_AssemblyRequired={meta_AssemblyRequired}
          meta_NextrendIconsStackable={meta_NextrendIconsStackable}
          images={images}
          displayImage={displayImage}
          width={width}
          meta_Madein={meta_Madein}
          meta_Prodhighlights={meta_Prodhighlights}
          groupedProducts={groupedProducts}
        />

        {videoLink && (
          <ProductMoreInfo
            videoLink={videoLink}
            videoTitle={videoTitle}
            videoDescription={videoDescription}
          />
        )}
        {groupedProducts !== null && (
          <>
            {listRelatedProjects.length >= 3 ? (
              <div className='related-project'>
                <div className='container'>
                  <h2 className='big-title text-center'>Related Projects</h2>
                  <div className=' row list-related'>
                    {width > 575
                      ? listRelatedProjects
                          .slice(0, 3)
                          .map((project, index) => {
                            return (
                              <CardRelatedProject
                                key={index}
                                {...project}
                                listTitle='Related Projects'
                              />
                            );
                          })
                      : // <MobileItemList listItem={listRelatedProjects.slice(0, 3)} />
                        ''}
                  </div>
                  {width > 575 && listRelatedProjects.length > 3 && (
                    <ButtonViewMore slug='projects' />
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        )}
        {groupedProducts !== null && (
          <div className='product-relatives-container'>
            <div className='d-flex justify-content-between align-items-center product-relatives-container-top'>
              <div className='product-relatives-title'>you may also like</div>
              <Link to='/products'>
                <span className='see-all-btn'>See all products</span>
                <ArrowRight />
              </Link>
            </div>
            <hr />
            <div className='row'>
              <ProductsList
                isSlider={true}
                width={width}
                products={listProductsRelated?.slice(0, 4)}
                colStyles='col-12 col-md-6 col-sm-6 col-xs-6 col-lg-6 col-xl-3 mb-3 mt-2'
                {...props}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default DetailProduct;

export const listRelatedProjects = graphql`
  query LIST_PROJECT_RELATED($test: String) {
    allWpProject(
      filter: { acfProject: { productRelated: { glob: $test } } }
      sort: { fields: date, order: DESC }
    ) {
      totalCount
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
