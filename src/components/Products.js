import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Products extends Component {
  atualizaStorage = async (item) => {
    const { handleCartSize } = this.props;
    const produtosAntigos = JSON.parse(localStorage.getItem('produtosSalvos'));
    let produtosDiferentes = [];
    const count = () => {
      let number = 1;
      if (!produtosAntigos) {
        return number;
      }

      if (produtosAntigos.some(({ title }) => title === item.title)) {
        const qtd = produtosAntigos
          .filter(({ title }) => title === item.title)[0].quantidade;
        number = qtd + 1;
      }
      return number;
    };
    if (produtosAntigos !== null) {
      produtosDiferentes = produtosAntigos
        .filter(({ title }) => title !== item.title);
    }
    produtosDiferentes.push({
      ...item,
      quantidade: count(),
    });
    localStorage.setItem('produtosSalvos', JSON.stringify(produtosDiferentes));
    handleCartSize();
  };

  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <>
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
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => this.atualizaStorage({ title, image: thumbnail, price }) }
        >
          Adicionar ao Carrinho
        </button>
      </>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleCartSize: PropTypes.func.isRequired,
};
