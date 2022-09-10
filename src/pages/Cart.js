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
    return (
      <div>
        { console.log(produtosNoCarrinho) }
        {
          produtosNoCarrinho ? (
            produtosNoCarrinho.map(({ title, price, image, quantidade }) => (
              <div key={ title }>
                <p data-testid="shopping-cart-product-name">{ title }</p>
                <p>{ price }</p>
                <img src={ image } alt={ title } />
                <p data-testid="shopping-cart-product-quantity">{ quantidade }</p>
              </div>
            ))
          ) : (
            <div>
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            </div>
          )
        }

      </div>

    );
  }
}
