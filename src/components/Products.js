import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getProductById } from '../services/api';

export default class Products extends Component {
  // state = {
  //   produto: [],
  // };

  atualizaStorage = async ({ target }) => {
    // const { produto } = this.state;
    const { firstChild } = target.parentNode;
    // const idProduct = firstChild.firstChild.firstChild.innerText;
    // const produtos = await getProductById(idProduct);
    // this.setState({ produto: [produtos] });
    const produtosAntigos = JSON.parse(localStorage.getItem('produtosSalvos'));
    const titleProduct = (
      firstChild.firstChild.firstChild.nextSibling.innerText);
    const priceProduct = (
      firstChild.firstChild.firstChild.nextSibling.nextSibling.innerText
    );
    const imageProduct = (
      firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.src
    );
    let produtosDiferentes = [];
    const count = () => {
      let number = 1;
      if (!produtosAntigos) {
        return number;
      }
      if (produtosAntigos.some(({ title }) => title === titleProduct)) {
        const qtd = produtosAntigos
          .filter(({ title }) => title === titleProduct)[0].quantidade;
        number = qtd + 1;
      }
      return number;
    };
    if (produtosAntigos !== null) {
      produtosDiferentes = produtosAntigos
        .filter(({ title }) => title !== titleProduct);
    }
    produtosDiferentes.push({
      title: titleProduct,
      price: priceProduct,
      image: imageProduct,
      quantidade: count(),
    });
    localStorage.setItem('produtosSalvos', JSON.stringify(produtosDiferentes));
    // console.log(produto);
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
          onClick={ this.atualizaStorage }
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
};
