import './_mixins.scss';
import './_variables.scss';
import './_resets.scss';
import './app.scss';
import cardBack from './assets/images/bg-card-back.png';
import cardFront from './assets/images/bg-card-front.png';
import backDesktop from './assets/images/bg-main-desktop.png';
import backMobile from './assets/images/bg-main-mobile.png';
import cardLogo from './assets/images/card-logo.svg';

function App() {
  return (
    <>
      <div className="CardDetailsFillUp">
        <div className="cardViewer">
          <picture className="cardViewer__background">
            <source srcSet={backDesktop} media="(min-width:600px)" />
            <img src={backMobile} alt="mobile-background" />
          </picture>
          <div className="cardViewer__cardFront">
            <img
              className="cardViewer__cardFront-img"
              src={cardFront}
              alt="card-Front"
            />
            <img
              className="cardViewer__cardFront-logo"
              src={cardLogo}
              alt="card-logo"
            />
            <p className="cardViewer__cardFront-number">0000 0000 0000 0000</p>
            <p className="cardViewer__cardFront-name">JANE APPLESEED</p>
            <p className="cardViewer__cardFront-date">00/00</p>
          </div>
          <div className="cardViewer__cardBack">
            <img
              className="cardViewer__cardBack-img"
              src={cardBack}
              alt="card-back"
            />
            <p className="cardViewer__cardBack-number">000</p>
          </div>
        </div>
        <div className="cardFormContainer">
          <form className="cardForm">
            <label htmlFor="cardName">CARDHOLDER NAME</label>
            <input type="text" id="cardName" className="cardForm__cardName" />
            <label htmlFor="cardNumber">CARD NUMBER</label>
            <input
              type="number"
              id="cardNumber"
              className="cardForm__cardNumber"
            />
            <div className="formFlex">
              <label htmlFor="expDate">EXP. DATE (MM/YY)</label>
              <input
                type="number"
                id="expDate"
                className="cardForm__cardDateMM"
              />
              <label htmlFor="expDateYY"></label>
              <input
                type="number"
                id="expDateYY"
                className="cardForm__cardDateYY"
              />
              <label htmlFor="cvc">CVC</label>
              <input type="number" className="cardForm__cardCvc" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
