import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import BreadCrumb from '../../common/BreadCrumb';
import ButtonViewMore from '../../common/ButtonViewMore';
import CardRelatedProject from '../../common/CardRelatedProject';
import MainBlogMobile from '../../common/MobileItemList';
import Layout from '../../components/layout';
import ProductsList from '../../components/products/products-list';
import ProjectDetailBanner from '../../components/project-detail/ProjectDetailBanner';
import ProjectGallery from '../../components/project-detail/ProjectGallery';
import ProjectInfo from '../../components/project-detail/ProjectInfo';
import SEO from '../../components/seo';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getOgImage } from '../../utils/functions';
import './style.scss';

ProjectDetailPage.propTypes = {
  props: PropTypes.object,
};

function ProjectDetailPage(props) {
  const { project } = props.pageContext;
  const { width } = useWindowDimensions();

  const project1 = props.data.allWpProject.nodes.find((pj) => {
    return pj.id === project.id;
  });

  const allProject = props.data.allWpProject.nodes;
  let listRelatedProjects = [];

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  allProject.forEach((pj, i) => {
    pj.acfProject.industry.some((r) =>
      project.acfProject.industry.includes(r)
    ) &&
      pj.acfProject.location.some((r) =>
        project.acfProject.location.includes(r)
      ) &&
      allProject[i].id !== project.id &&
      listRelatedProjects.push(pj);
    if (listRelatedProjects.length === 3) return;
  });

  if (listRelatedProjects.length < 3) {
    for (let i = 0; i < allProject.length; i++) {
      listRelatedProjects = getUniqueListBy(listRelatedProjects, 'title');

      if (listRelatedProjects.length > 2) break;

      allProject[i].acfProject.industry.some((r) =>
        project.acfProject.industry.includes(r)
      ) &&
        allProject[i].id !== project.id &&
        listRelatedProjects.push(allProject[i]);
    }
  }

  const breadcrumbData = [
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Project',
      slug: '/projects',
    },
    {
      title: project1.title,
      slug: `/projects/${project1.slug}`,
    },
  ];

  //remove duplicates key ListGroupedProducts
  const getListGroupedProducts = project.listGroupedProducts.filter(
    (v, i, a) => a.findIndex((t) => t.node.id === v.node.id) === i
  );

  //SEO DATA

  const title = project1?.title;
  const des =
    project1?.acfProject?.theClient &&
    project1?.acfProject?.theClient.slice(0, 150);
  const img = project1?.featuredImage?.node?.mediaItemUrl;

  const seoInfo = {
    opengraphTitle: title,
    twitterTitle: title,
    metaDesc: des,
    opengraphDescription: des,
    twitterDescription: des,
    opengraphImage: {
      sourceUrl: img,
    },
    twitterImage: {
      sourceUrl: img,
    },
  };

  return (
    <Layout>
      <SEO
        title={title}
        description={des}
        seoData={seoInfo}
        uri={props.location.href}
        openGraphImage={getOgImage(seoInfo)}
      />
      <div className='detail-project'>
        <div className='header-blog-detail'>
          <div className='container bread-crumb-blog-detail'>
            <div className='row'>
              <BreadCrumb inputBreadCrumb={breadcrumbData} textWhite mrt30 />
            </div>
          </div>
          <ProjectDetailBanner project={project1} width={width} />
        </div>
        <ProjectInfo project={project1} width={width} />

        {project.listGroupedProducts.length > 0 ? (
          <div className='product-user'>
            <div className='container related-products'>
              <div className='title d-flex align-items-center'>
                <h2 className='big-title'>Products Used</h2>
                <div className='d-flex align-items-center justify-content-end'>
                  <ButtonViewMore text='See all products' slug='products' />
                </div>
              </div>
              <div className='row list-product-user'>
                <ProductsList
                  isSlider={true}
                  width={width}
                  products={getListGroupedProducts.slice(0, 4)}
                  colStyles='col-12 col-md-6 col-sm-6 col-xs-6 col-lg-6 col-xl-3 mb-3 mt-2'
                  {...props}
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <ProjectGallery project={project1?.acfProject?.projectGallery} />
        {listRelatedProjects.length >= 3 ? (
          <div className='related-project'>
            <div className='container'>
              {width > 575 ? (
                <h2 className='big-title text-center'>Related Projects</h2>
              ) : (
                ''
              )}
              <div className=' row list-related'>
                {width > 575 ? (
                  listRelatedProjects.slice(0, 3).map((project, index) => {
                    return (
                      <CardRelatedProject
                        key={index}
                        {...project}
                        listTitle='Related Projects'
                      />
                    );
                  })
                ) : (
                  <MainBlogMobile
                    listItem={listRelatedProjects.slice(0, 3)}
                    listTitle='Related Projects'
                    dir='projects'
                  />
                )}
              </div>
              {width > 575 && listRelatedProjects.length >= 3 && (
                <ButtonViewMore slug='projects' />
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </Layout>
  );
}

export default ProjectDetailPage;

export const project = graphql`
  query project {
    allWpProject {
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
        acfProject {
          subHeading
          productRelated
          theClient
          clientImage {
            altText
            mediaItemUrl
          }
          theSuburb
          suburbImage {
            altText
            mediaItemUrl
          }
          whatWeDid
          whatWeDidImage {
            mediaItemUrl
            altText
          }
          location
          industry
          fieldGroupName
          projectGallery {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`;
