import './_mixins.scss';
import './_variables.scss';
import './_resets.scss';
import './app.scss';
import cardBack from './assets/images/bg-card-back.png';
import cardFront from './assets/images/bg-card-front.png';
import backDesktop from './assets/images/bg-main-desktop.png';
import backMobile from './assets/images/bg-main-mobile.png';
import cardLogo from './assets/images/card-logo.svg';
import iconComplete from './assets/images/icon-complete.svg';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
// import changeField from './changeField';
import { useState, useRef, ChangeEvent } from 'react';

type FormValues = {
  cardName: string;
  cardNumber: string;
  cardDateMM: string;
  cardDateYY: string;
  cardCvc: string;
};

function App() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState, setValue, setFocus } =
    form;
  const { errors } = formState;
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardDateMM, setCardDateMM] = useState<string>('');
  const [cardDateYY, setCardDateYY] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  //The commented logic is part of what I need to use the changeFiled as a Hook
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  // const { cardNumber, handleFieldChange, submitButtonRef } = changeField({
  //   setValue,
  //   setFocus,
  // });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'cardName': {
        const cleanValue = value.toUpperCase();
        setCardName(cleanValue);
        setValue(name, cleanValue);
        break;
      }
      case 'cardNumber': {
        const cleanValue = value.replace(/\s+/g, '');
        if (cleanValue.length > 16) {
          setFocus('cardDateMM');
          break;
        }
        const formattedValue = cleanValue.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(formattedValue);
        setValue(name, cleanValue);
        break;
      }

      case 'cardDateMM': {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length >= 2) {
          setFocus('cardDateYY');
          setValue(name, cleanValue.slice(0, 2));
          setCardDateMM(cleanValue.slice(0, 2));

          break;
        }
        setValue(name, cleanValue);
        break;
      }

      case 'cardDateYY': {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length === 2) {
          setValue(name, cleanValue.slice(0, 2));
          setCardDateYY(cleanValue.slice(0, 2));
          setFocus('cardCvc');
          break;
        }
        setValue(name, cleanValue);
        setCardDateYY(cleanValue.slice(0, 2));

        break;
      }

      case 'cardCvc': {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length >= 3) {
          setValue(name, cleanValue.slice(0, 3));
          submitButtonRef.current?.focus();
          setCardCvc(cleanValue.slice(0, 3));
          break;
        }
        setValue(name, cleanValue);
        setCardCvc(cleanValue);
        break;
      }
      default:
        break;
    }
  };

  const validateExpiryDate = (mm: string, yy: string) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    // Ensure that mm and yy are numeric and have the expected length
    const expMonth = parseInt(mm, 10);
    const expYear = parseInt(`20${yy}`, 10); // Convert yy to a 4-digit year
    // Check if the month and year are valid
    if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
      return 'Invalid Date';
    }
    // Validate the expiration year and month
    if (expYear > currentYear) return true;
    if (expYear === currentYear && expMonth >= currentMonth) return true;

    return 'Invalid Date';
  };
  const onSubmit = () => {
    console.log('form submitted');
    setIsSubmitted(true);
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
            <div className="cardViewer__cardFront-info">
              <img
                className="cardViewer__cardFront-logo"
                src={cardLogo}
                alt="card-logo"
              />
              <p className="cardViewer__cardFront-number">
                {cardNumber || '0000 0000 0000 0000'}
              </p>
              <p className="cardViewer__cardFront-name">
                {cardName || 'JANE APPLESEED'}
              </p>
              <p className="cardViewer__cardFront-date">
                {cardDateMM || '00'}/{cardDateYY || '00'}
              </p>
            </div>
          </div>
          <div className="cardViewer__cardBack">
            <img
              className="cardViewer__cardBack-img"
              src={cardBack}
              alt="card-back"
            />
            <p className="cardViewer__cardBack-number">{cardCvc || '000'}</p>
          </div>
        </div>
        <div className="cardFormContainer">
          {isSubmitted ? (
            <div className="thankYou">
              <img src={iconComplete} alt="iconComplete" />
              <h1>THANK YOU!</h1>
              <p>We've added your card details</p>
              <button onClick={() => window.location.reload()}>Continue</button>
            </div>
          ) : (
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
                value={cardName}
                {...register('cardName', {
                  required: 'This Field is required',
                  onChange: handleFieldChange,
                })}
              />
              <p className="cardForm__errors">{errors.cardName?.message}</p>

              <label htmlFor="cardNumber">CARD NUMBER</label>
              <input
                type="tel"
                id="cardNumber"
                className="cardForm__cardNumber"
                placeholder="e.g. 1234 5678 9123 0000"
                value={cardNumber}
                {...register('cardNumber', {
                  required: 'Card number is required',
                  onChange: handleFieldChange,
                  validate: (value) =>
                    /^\d*$/.test(value.replace(/\s+/g, '')) ||
                    'Wrong format, numbers only',
                })}
              />
              <p className="cardForm__errors">{errors.cardNumber?.message}</p>

              <div className="cardForm__groupNumbers">
                <label htmlFor="expDate" className="cardForm__expDateLab">
                  EXP. DATE (MM/YY)
                </label>
                <input
                  type="tel"
                  id="expDate"
                  className="cardForm__cardDateMM"
                  placeholder="MM"
                  {...register('cardDateMM', {
                    required: "Can't be blank",
                    onChange: handleFieldChange,
                  })}
                />
                <p className="cardForm__groupNumbers-errorMM">
                  {errors.cardDateMM?.message}
                </p>

                <input
                  type="tel"
                  id="expDateYY"
                  className="cardForm__cardDateYY"
                  placeholder="YY"
                  value={cardDateYY}
                  {...register('cardDateYY', {
                    required: "Can't be blank",
                    onChange: handleFieldChange,
                    validate: (value, context) =>
                      validateExpiryDate(context.cardDateMM, value),
                  })}
                />
                <p className="cardForm__groupNumbers-errorYY">
                  {errors.cardDateYY?.message}
                </p>

                <label htmlFor="cvc" className="cardForm__cardCvcLab">
                  CVC
                </label>
                <input
                  type="tel"
                  id="cvc"
                  className="cardForm__cardCvc"
                  placeholder="e.g. 123"
                  value={cardCvc}
                  {...register('cardCvc', {
                    required: "Can't be blank",
                    onChange: handleFieldChange,
                  })}
                />
                <p className="cardForm__groupNumbers-errorCvc">
                  {errors.cardCvc?.message}
                </p>
              </div>
              <button className="cardForm__button" ref={submitButtonRef}>
                Confirm
              </button>
            </form>
          )}
          <DevTool control={control} />
        </div>
      </div>
    </>
  );
}

export default App;
