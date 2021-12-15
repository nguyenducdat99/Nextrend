import { Link, navigate } from 'gatsby';
import parse from 'html-react-parser';
import * as JsSearch from 'js-search';
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import CloseButton from '../../common/CloseButton';
import './styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: this.props.products.map((item) => item.node),
      search: [],
      searchResults: [],
      isLoading: true,
      isError: false,
      searchQuery: '',
    };
  }

  async componentDidMount() {
    const productData = [];
    this.setState({ productList: productData });
    this.rebuildIndex();
  }

  rebuildIndex = () => {
    const { productList } = this.state;
    const dataToSearch = new JsSearch.Search('id');
    /**
     *  defines a indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('id');
    dataToSearch.addIndex('name'); // sets the index attribute for the data
    dataToSearch.addDocuments(productList); // adds the data to be searched

    this.setState({ search: dataToSearch, isLoading: false });
  };

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = (e) => {
    const { search } = this.state;
    const queryResult = search.search(e.target.value);

    this.setState({
      searchQuery: e.target.value,
      searchResults: queryResult,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.onHandleCloseModal();
    navigate('/products', {
      state: {
        // searchResults: this.state.searchResults,
        searchQuery: this.state.searchQuery,
        isSearching: true,
      },
    });
  };

  getListAttributes = (product) => {
    let listAtr = [];
    // for (let i = 1; i <= 5; i++) {
    //   if (eval(`product.customValue${i}Name`)) {
    //     listAtr.push({
    //       name: eval(`product.customValue${i}Name`),
    //       visible: true,
    //       variation: false,
    //       options: [eval(`product.customValue${i}Value`).split(',')[0]],
    //     });
    //   }
    // }
    return listAtr;
  };

  onAddToCart = (product) => {
    const addedItem = {
      id: product.id,
      name: product.name,
      image: product.images.split(',')[0],
      'product-type': 'grouped',
      attributes: this.getListAttributes(product),
      slug: `/${product.slug}`,
    };
    this.onHandleCloseModal();
    this.props.dispatchActionHandler({
      type: 'ADD_TOO_CART',
      payload: addedItem,
    });
  };

  onHandleCloseModal = () => {
    this.props.dispatchActionHandler({ type: 'CLOSE_MODAL' });
    this.onClearSearchBox();
  };

  onClearSearchBox = () => {
    this.setState({ searchQuery: '' });
  };
  onClickProduct = () => {
    this.onHandleCloseModal();
  };

  render() {
    const { searchResults, searchQuery } = this.state;
    const queryResults = searchQuery === '' ? [] : searchResults.slice(0, 20);

    return (
      <ReactModal
        isOpen={this.props.showSearchBox}
        onRequestClose={this.onHandleCloseModal}
        shouldCloseOnOverlayClick={true}
        className='search-modal'
        overlayClassName='Overlay'
        ariaHideApp={false}
      >
        <div className='search-modal-content'>
          <form
            className='search-form d-flex align-items-center'
            onSubmit={this.onFormSubmit}
          >
            <input
              type='text'
              value={searchQuery}
              placeholder='Start your search here'
              onChange={this.searchData}
              className='search-input'
              ref='textInput'
            />
            <button type='submit' className='btn btn-submit'>
              Add
            </button>
            <CloseButton
              mt={'20px'}
              mr={'25px'}
              clearSearch={true}
              handleClearSearch={this.onClearSearchBox}
            />
          </form>
          <div className='search-result'>
            {queryResults.map((item, index) => {
              const isPackages =
                item.categories && item.categories.includes('Packages');
              return (
                <div
                  className='result-product-container'
                  key={`${item.id}-${index}`}
                >
                  <Link
                    to={`/${item.slug}`}
                    className='result-product'
                    onClick={this.onClickProduct}
                  >
                    <div className='product-image'>
                      <img src={item.images.split(',')[0]} alt='' />
                    </div>
                    <div className='product-info'>
                      <h3 className='product-name'>{item.name}</h3>
                      <div className='body-text'>
                        {item.shortDescription
                          ? parse(`${item.shortDescription}`.slice(0, 100))
                          : ''}
                      </div>
                      {!isPackages && (
                        <button className='view-product btn btn-primary'>
                          View Product
                        </button>
                      )}
                    </div>
                  </Link>
                  {isPackages && (
                    <button
                      className='add-to-cart-btn btn btn-primary'
                      onClick={() => this.onAddToCart(item)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div
            className={`${
              queryResults.length < 1 ? 'un-active' : 'active'
            } search-all-container`}
          >
            {queryResults.length > 1 && (
              <Link to='/products'>
                <button className='btn search-all'>
                  Search in All Products
                </button>
              </Link>
            )}
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default Search;
