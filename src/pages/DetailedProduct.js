import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class DetailedProduct extends Component {
  state = {
    produto: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const produto = await getProductById(id);
    console.log(produto);
    this.setState({ produto: [produto] });
  }

  render() {
    const { produto } = this.state;

    return (
      <div>
        {produto.map((elemento) => (
          <div key={ elemento.id }>
            <p data-testid="product-detail-name">{elemento.title}</p>
            <img
              data-testid="product-detail-image"
              src={ elemento.thumbnail }
              alt={ elemento.title }
            />
            <p data-testid="product-detail-price">{elemento.price}</p>
          </div>
        ))}
        <button type="button" className="botao">
          <Link to="/Cart" data-testid="shopping-cart-button">Carrinho</Link>
        </button>
      </div>
    );
  }
}

DetailedProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
