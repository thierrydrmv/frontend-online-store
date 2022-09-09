import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    produtosNoCarrinho: [],
  };

  componentDidMount() {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtosSalvos'));
    this.setState({ produtosNoCarrinho: produtosSalvos });
  }

  render() {
    const { produtosNoCarrinho } = this.state;

    const verificaProduto = (produtos) => {
      if (produtos === null || produtos.length === 0) {
        return (
          <div>
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          </div>
        );
      }
      return (
        produtos.map((elemento) => (
          <div key={ elemento.title }>
            <p data-testid="shopping-cart-product-name">{elemento.title}</p>
            <p>{elemento.price}</p>
            <p data-testid="shopping-cart-product-quantity">{elemento.quantidade}</p>
          </div>
        ))
      );
    };

    return (
      <div>
        {/* {
          produtosNoCarrinho ? (
            produtosNoCarrinho.map((elemento) => (
              <div key={ elemento.title }>
                <p data-testid="shopping-cart-product-name">{elemento.title}</p>
                <p>{elemento.price}</p>
                <p data-testid="shopping-cart-product-quantity">{elemento.quantidade}</p>
              </div>
            ))
          ) : (
            <div>
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            </div>
          )
        } */}

        {
          verificaProduto(produtosNoCarrinho)
        }

      </div>

    );
  }
}
