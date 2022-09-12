import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class DetailedProduct extends Component {
  state = {
    produto: [],
    numeros: ['1', '2', '3', '4', '5'],
    avaliacaoIncorreta: false,
    email: '',
    option: null,
    comentario: '',
    avaliacoes: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const avaliacoesAnteriores = localStorage.getItem(id);
    if (avaliacoesAnteriores) {
      this.setState({ avaliacoes: JSON.parse(avaliacoesAnteriores) });
    }
    const produto = await getProductById(id);
    this.setState({ produto: [produto] });
  }

  atualizaStorage = async () => {
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
      image: produto[0].thumbnail,
      quantidade: this.atualizaEstado(),
    });

    localStorage.setItem('produtosSalvos', JSON.stringify(produtosDiferentes));
  };

  atualizaEstado = () => {
    const { produto } = this.state;
    const produtosAntigos = JSON.parse(localStorage.getItem('produtosSalvos'));
    if (produtosAntigos === null) {
      return 1;
    } if (produtosAntigos.some((elemento) => elemento.title === produto[0].title)) {
      const qtd = produtosAntigos
        .filter((elemento) => elemento.title === produto[0].title)[0].quantidade;
      return qtd + 1;
    }
    return 1;
  };

  verificaForm = () => {
    const { option } = this.state;
    if (option) {
      this.setState({ avaliacaoIncorreta: false });
    }
  };

  enviaForm = () => {
    const { email, option, comentario } = this.state;
    if (option) {
      const objComentario = {
        email,
        text: comentario,
        rating: option,
      };
      const opcoes = document.getElementsByClassName('opcao');
      for (let index = 0; index < opcoes.length; index += 1) {
        opcoes[index].checked = false;
      }
      this.setState((before) => ({
        avaliacaoIncorreta: false,
        email: '',
        option: null,
        comentario: '',
        avaliacoes: [...before.avaliacoes, objComentario],
      }), () => this.comentaStorage());
    } else {
      this.setState({ avaliacaoIncorreta: true });
    }
  };

  comentaStorage = () => {
    const { avaliacoes } = this.state;
    const { match: { params: { id } } } = this.props;
    localStorage.setItem(id, JSON.stringify(avaliacoes));
  };

  handleChange = (evento) => {
    const valor = evento.target.value;
    const nome = evento.target.name;
    this.setState({ [nome]: valor }, () => this.verificaForm());
  };

  render() {
    const {
      avaliacaoIncorreta,
      produto,
      numeros,
      email,
      comentario,
      avaliacoes,
    } = this.state;

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

        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
          {
            numeros.map((numero) => (
              <div key={ `id${numero}` }>
                <input
                  type="radio"
                  name="option"
                  className="opcao"
                  id={ numero }
                  value={ numero }
                  data-testid={ `${numero}-rating` }
                  onClick={ this.handleChange }
                />
                <label htmlFor={ numero }>{numero}</label>
              </div>
            ))
          }
          <textarea
            data-testid="product-detail-evaluation"
            name="comentario"
            onChange={ this.handleChange }
            value={ comentario }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.enviaForm }
          >
            Enviar Avaliação
          </button>
        </form>
        {
          avaliacaoIncorreta && <p data-testid="error-msg">Campos inválidos</p>
        }
        {
          avaliacoes && (
            avaliacoes.map((avaliacao) => (
              <div key={ avaliacao.email }>
                <p data-testid="review-card-email">{avaliacao.email}</p>
                <p data-testid="review-card-rating">{avaliacao.rating}</p>
                <p data-testid="review-card-evaluation">{avaliacao.text}</p>
              </div>
            ))
          )
        }
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
