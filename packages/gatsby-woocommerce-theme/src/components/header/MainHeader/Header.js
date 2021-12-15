import { graphql, Link, StaticQuery } from 'gatsby';
import React, { memo, useContext, useEffect } from 'react';
import {
	GlobalDispatchContext,
	GlobalStateContext,
} from '../../contexts/AppContext';
import Search from '../../search-container';
import MainMenu from '../MainMenu';
import MenuIcons from '../MenuIcons';
import TopHeader from '../TopHeader';
import Image from './Image';
import './style.scss';

function MyHeader(props) {
	const { width } = props;
	const textInput = React.useRef();
	const dispatchActionHandler = useContext(GlobalDispatchContext);
	const { showSearchBox, showRequestQuote, showSideBar, showMobileMegaMenu } =
		useContext(GlobalStateContext);

	useEffect(() => {
		var timer = setTimeout(() => {
			textInput.current.refs.textInput &&
				textInput.current.refs.textInput.focus();
		}, 0);
		return () => {
			clearTimeout(timer);
		};
	}, [showSearchBox]);

	return (
		<div className='header-wrapper'>
			<TopHeader
				width={width}
				onHandleModal={dispatchActionHandler}
				showRequestAQuote={showRequestQuote}
			/>
			<div className='container-fluid header__bottom'>
				<div className='container'>
					<div className='row justify-content-between align-items-center'>
						<div className='logo-col'>
							<Link to='/'>
								<div className='logo'>
									<Image />
								</div>
							</Link>
						</div>
						<MainMenu
							showSideBarMenu={showSideBar}
							onHandleModal={dispatchActionHandler}
							showMobileMegaMenu={showMobileMegaMenu}
							width={width}
						/>
						<MenuIcons width={width} />

						{width > 768 && (
							<Search
								dispatchActionHandler={dispatchActionHandler}
								showSearchBox={showSearchBox}
								products={props.data.groupedProductsCustom.edges}
								ref={textInput}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

function Header(props) {
	return (
		<StaticQuery
			query={productsQuery}
			render={(data) => <MyHeader data={data} {...props} />}
		/>
	);
}

export default memo(Header);

export const productsQuery = graphql`
	query GET_PRODUCTS {
		groupedProductsCustom: allGoogleNextrendproductSheet(
			filter: { groupedProducts: { ne: null } }
		) {
			totalCount
			edges {
				node {
					id
					images
					sku
					name
					slug
					categories
					groupedProducts
					shortDescription
					description
					inStock_
					customValue1Name
					customValue1Value
					customValue2Name
					customValue2Value
					customValue3Name
					customValue3Value
					customValue4Name
					customValue4Value
					customValue5Name
					customValue5Value
				}
			}
		}
	}
`;
