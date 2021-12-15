import { graphql } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import PaginationCustom from "../../common/PaginationCustom";
import BreadCrumb from "../../common/BreadCrumb";
import Layout from "../../components/layout";
import ProjectBanner from "../../components/projects/ProjectBanner";
import ProjectFilter from "../../components/projects/ProjectFilter";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./styles.scss";

function ProjectPage(props) {
	const { width } = useWindowDimensions();
	const pagination = useRef();
	const currentPage = props.pageContext.currentPage;
	const [projects, setProjects] = useState(
		props.pageContext.projectsDueCategory || props.data?.projectsDuePage?.nodes
	);
	const { listOfIndustry, listOfLocation } = props.pageContext;

	useEffect(() => {
		pagination.current &&
			pagination.current.setState({ selected: currentPage - 1 });
	}, [currentPage]);

	const filterProjectsHandler = (indus, locate) => {
		if (!indus && !locate) {
			setProjects(props.data.projectsDuePage.nodes);
		} else if (indus && !locate) {
			const newProjects = [...props.data.allProjects.nodes].filter((pj) => {
				return pj.acfProject.industry.includes(indus);
			});
			setProjects(newProjects);
		} else if (!indus && locate) {
			const newProjects = [...props.data.allProjects.nodes].filter((pj) => {
				return pj.acfProject.location.includes(locate);
			});
			setProjects(newProjects);
		} else {
			const newProjects = [...props.data.allProjects.nodes].filter((pj) => {
				return (
					pj.acfProject.industry.includes(indus) &&
					pj.acfProject.location.includes(locate)
				);
			});
			setProjects(newProjects);
		}
	};

	const inputBreadCrumb = [
		{
			id: 1,
			title: "Home",
			slug: "/",
		},
		{
			id: 2,
			title: "Projects",
			slug: "/projects",
		},
	];

	return (
		<Layout>
			<ProjectBanner />
			<div className='container project-page-container'>
				<div className='project-page container'>
					{width > 575 && (
						<div className='row'>
							<BreadCrumb inputBreadCrumb={inputBreadCrumb} />
						</div>
					)}

					{!props.pageContext.projectsDueCategory && (
						<ProjectFilter
							listOfIndustry={listOfIndustry}
							listOfLocation={listOfLocation}
							onFilterProjects={filterProjectsHandler}
						/>
					)}
				</div>

				<div className='container pagination-container'>
					<div className='row'>
						<div className='col-12 col-md-12 col-sm-12 col-lg-12 d-flex align-items-center justify-content-center'>
							<PaginationCustom
								products={projects}
								productsPerPage={9}
								pageRange={5}
								isProject={true}
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default ProjectPage;

export const blogListQuery = graphql`
	query LIST_PROJECT($skip: Int!) {
		projectsDuePage: allWpProject(
			sort: { order: DESC, fields: date }
			skip: $skip
		) {
			totalCount
			nodes {
				content
				title
				slug
				status
				uri
				id
				date(formatString: "MMMM DD, YYYY")
				featuredImage {
					node {
						altText
						mediaItemUrl
					}
				}
				acfProject {
					location
					industry
				}
			}
		}
		allProjects: allWpProject {
			nodes {
				content
				title
				slug
				status
				uri
				id
				date(formatString: "MMMM DD, YYYY")
				featuredImage {
					node {
						altText
						mediaItemUrl
					}
				}
				acfProject {
					location
					industry
				}
			}
		}
	}
`;
