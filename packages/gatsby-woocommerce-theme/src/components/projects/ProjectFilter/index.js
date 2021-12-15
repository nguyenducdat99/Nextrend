import { Form, Formik } from "formik";
import React from "react";
import MySelect from "../../../common/MySelect";
import "./styles.scss";

/* eslint-disable */
function ProjectFilter({ listOfIndustry, listOfLocation, onFilterProjects }) {
	const handleSubmit = (values) => {
		const { industry, location } = values;
		onFilterProjects(industry, location);
	};

	return (
		<div className='row project-filter justify-content-center'>
			<Formik
				initialValues={{
					industry: "",
					location: "",
				}}
				onSubmit={handleSubmit}
			>
				<Form className='d-flex align-items-center project-filter-form'>
					<MySelect label='Industry' name='industry' className='select-item'>
						<option value=''>Select a industry</option>

						{listOfIndustry?.map((industry, index) => (
							<option className='industry-option' value={industry} key={index}>
								{industry?.split("-").join(" ")}
							</option>
						))}
					</MySelect>

					<MySelect label='Location' name='location' className='select-item'>
						<option value=''>Select a location</option>
						{listOfLocation?.map((location, index) => (
							<option className='industry-option' value={location} key={index}>
								{location?.split("-").join(" ")}
							</option>
						))}
					</MySelect>
					<button
						type='submit'
						value='Search'
						className='btn-filter-project btn btn-primary'
					>
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
}

export default ProjectFilter;
