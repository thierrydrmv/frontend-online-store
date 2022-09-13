import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Checkout extends Component {
  state = {
    produtosNoCarrinho: [],
    avaliacaoIncorreta: null,
    compraFinalizada: false,
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  };

  componentDidMount() {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtosSalvos'));
    this.setState({
      produtosNoCarrinho: produtosSalvos,
    });
  }

  handleChange = (evento) => {
    const valor = evento.target.value;
    const nome = evento.target.name;
    this.setState({ [nome]: valor });
  };

  dados = () => {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    } = this.state;

    const valid = !fullname
    || !email
    || !cpf
    || !phone
    || !cep
    || !address
    || !payment;

    if (valid) {
      this.setState({ avaliacaoIncorreta: true });
    } else {
      this.setState({
        avaliacaoIncorreta: false,
        compraFinalizada: true,
      });
      localStorage.clear();
    }
  };

  render() {
    const {
      compraFinalizada,
      produtosNoCarrinho,
      avaliacaoIncorreta,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
    } = this.state;
    return (
      <div>
        {
          produtosNoCarrinho
          && produtosNoCarrinho.map(({ title }) => <p key={ title }>{title}</p>)
        }
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            onChange={ this.handleChange }
            name="fullname"
            value={ fullname }
          />
          <input
            data-testid="checkout-email"
            type="text"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            onChange={ this.handleChange }
            name="cpf"
            value={ cpf }
          />
          <input
            data-testid="checkout-phone"
            type="text"
            onChange={ this.handleChange }
            name="phone"
            value={ phone }
          />
          <input
            data-testid="checkout-cep"
            type="text"
            onChange={ this.handleChange }
            name="cep"
            value={ cep }
          />
          <input
            data-testid="checkout-address"
            type="text"
            onChange={ this.handleChange }
            name="address"
            value={ address }
          />
          <input
            data-testid="ticket-payment"
            name="payment"
            type="radio"
            onChange={ this.handleChange }
            value="ticket"
          />
          <input
            data-testid="visa-payment"
            name="payment"
            type="radio"
            onChange={ this.handleChange }
            value="visa"
          />
          <input
            data-testid="master-payment"
            name="payment"
            type="radio"
            onChange={ this.handleChange }
            value="master"
          />
          <input
            data-testid="elo-payment"
            name="payment"
            type="radio"
            onChange={ this.handleChange }
            value="elo"
          />
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.dados }
          >
            Finalizar Compra
          </button>
        </form>
        {
          avaliacaoIncorreta && <p data-testid="error-msg">Campos inválidos</p>
        }
        {
          compraFinalizada && <Redirect to="/" />
        }
      </div>
    );
  }
}
