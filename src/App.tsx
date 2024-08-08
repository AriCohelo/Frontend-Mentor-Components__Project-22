import './_mixins.scss';
import './_variables.scss';
import './_resets.scss';
import './app.scss';
import cardBack from './assets/images/bg-card-back.png';
import cardFront from './assets/images/bg-card-front.png';
import backDesktop from './assets/images/bg-main-desktop.png';
import backMobile from './assets/images/bg-main-mobile.png';
import cardLogo from './assets/images/card-logo.svg';
import { useForm } from 'react-hook-form';
import { useState, ChangeEvent } from 'react';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  cardName: string;
  cardNumber: string;
  cardDateMM: number;
  cardDateYY: number;
  cardCvc: number;
};

function App() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState, setValue, trigger } =
    form;
  const { errors } = formState;
  const [cardNumber, setCardNumber] = useState<string>('');

  const formatCardNumber = (value: string): string => {
    const spacedNumber = value.replace(/(.{4})/g, '$1 ').trim();
    return spacedNumber;
  };
  const handleCardNumberSpacing = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\s+/g, ''); // Remove spaces for formatting
    if (rawValue.length > 16) {
      trigger('cardNumber'); // Trigger validation to show error
      return; // Block additional input
    }
    const formattedValue = formatCardNumber(rawValue);
    setCardNumber(formattedValue); // Update local state with formatted value
    setValue('cardNumber', rawValue); // Update react-hook-form value with raw value
  };

  const onSubmit = () => {
    console.log('form submitted');
  };
  return (
    <>
      <div className="CardDetailsFillUp">
        <div className="cardViewer">
          <picture className="cardViewer__background">
            <source srcSet={backDesktop} media="(min-width:650px)" />
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
          <form
            className="cardForm"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="cardName">CARDHOLDER NAME</label>
            <input
              type="text"
              id="cardName"
              className="cardForm__cardName"
              placeholder="e.g. Jane Appleseed"
              {...register('cardName', {
                required: 'This Field is required',
              })}
            />
            <p className="cardForm__errors">{errors.cardName?.message}</p>
            <label htmlFor="cardNumber">CARD NUMBER</label>
            <input
              type="text"
              id="cardNumber"
              className="cardForm__cardNumber"
              placeholder="e.g. 1234 5678 9123 0000"
              value={cardNumber}
              {...register('cardNumber', {
                required: 'Card number is required',
                onChange: handleCardNumberSpacing,
                maxLength: {
                  value: 19,
                  message: 'Card number cannot exeed 16 digits',
                },
              })}
            />
            <p className="cardForm__errors">{errors.cardNumber?.message}</p>
            <div className="cardForm__groupNumbers">
              <label htmlFor="expDate" className="cardForm__expDateLab">
                EXP. DATE (MM/YY)
              </label>
              <input
                type="number"
                id="expDate"
                className="cardForm__cardDateMM"
                placeholder="MM"
                {...register('cardDateMM', {
                  required: "Can't be blank",
                })}
              />
              <p className="cardForm__errors">{errors.cardDateMM?.message}</p>

              <input
                type="number"
                id="expDateYY"
                className="cardForm__cardDateYY"
                placeholder="YY"
                {...register('cardDateYY')}
              />
              <label htmlFor="cvc" className="cardForm__cardCvcLab">
                CVC
              </label>
              <input
                type="number"
                id="cvc"
                className="cardForm__cardCvc"
                placeholder="e.g. 123"
                {...register('cardCvc')}
              />
            </div>
            <button className="cardForm__button">Confirm</button>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </>
  );
}

export default App;
