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
    this.setState({ produto: [produto] });
  }

  atualizaStorage = () => {
    const { produto } = this.state;
    const produtosAntigos = JSON.parse(localStorage.getItem('produtosSalvos'));
    let produtosDiferentes = [];
    if (produtosAntigos !== null) {
      produtosDiferentes = produtosAntigos
        .filter((elemento) => elemento.title !== produto[0].title);
    }

    produtosDiferentes.push({
      title: produto[0].title,
      price: produto[0].price,
      quantidade: this.atualizaEstado(),
    });

    localStorage.setItem('produtosSalvos', JSON.stringify(produtosDiferentes));
  };

  atualizaEstado = () => {
    const { produto } = this.state;
    const produtosAntigos = JSON.parse(localStorage.getItem('produtosSalvos'));
    if (produtosAntigos === null) {
    //   this.setState({ quantidadeSalva: 1 });
      return 1;
    } if (produtosAntigos.some((elemento) => elemento.title === produto[0].title)) {
      const qtd = produtosAntigos
        .filter((elemento) => elemento.title === produto[0].title)[0].quantidade;
      //   this.setState({ quantidadeSalva: qtd + 1 });
      return qtd + 1;
    }
    //   this.setState({ quantidadeSalva: 1 });
    return 1;
  };

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
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.atualizaStorage }
        >
          Adicionar ao Carrinho
        </button>
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
