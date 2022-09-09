import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Products extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <Link to={ `/DetailedProduct/${id}` } data-testid="product-detail-link">
        <div data-testid="product">
          <p>
            { id }
          </p>
          <p>
            { title }
          </p>
          <p>
            { price }
          </p>

          <img src={ thumbnail } alt={ title } />
          <p>
            Valor
            {' '}
            {price}
          </p>
        </div>
      </Link>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
