import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import { searchProducts } from '../services/api';
import Products from '../components/Products';

export default class HomePage extends Component {
  state = {
    products: [],
    search: '',
    hasProduct: false,
    cartSize: 0,
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cartSize'));
    this.setState({ cartSize: cart });
  }

  // componentDidUpdate() {
  //   const cart = JSON.parse(localStorage.getItem('cartSize'));
  //   const atualizaRender = () => this.setState({ cartSize: cart });
  //   atualizaRender();
  // }

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSearch = async () => {
    const { search } = this.state;
    const products = await searchProducts(search);
    this.setState({ hasProduct: true, products: products.results });
  };

  setProducts = async (products) => {
    this.setState({ hasProduct: true, products });
  };

  render() {
    const { search, hasProduct, products, cartSize } = this.state;
    return (
      <div className="pai">
        <input onInput={ this.handleChange } data-testid="query-input" />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleSearch }
        >
          Pesquisar

        </button>
        <button type="button" className="botao">
          <Link
            to="/Cart"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>
        </button>
        <p data-testid="shopping-cart-size" className="botao">{cartSize}</p>
        { !search
        && (
          <div className="products">
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma
              categoria.
            </p>
          </div>
        ) }
        <Category onCategorySet={ this.setProducts } />
        {hasProduct ? products.map(({ title, thumbnail, price, id }) => (
          <div key={ id }>
            <Products
              id={ id }
              title={ title }
              thumbnail={ thumbnail }
              price={ price }
            />
          </div>
        )) : 'Nenhum produto foi encontrado'}
      </div>
    );
  }
}
