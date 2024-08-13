// changeField.ts
import { ChangeEvent, useState, useRef } from 'react';
import { UseFormSetValue, UseFormSetFocus } from 'react-hook-form';

type FormValues = {
  cardName: string;
  cardNumber: string;
  cardDateMM: string;
  cardDateYY: string;
  cardCvc: string;
};

interface changeFieldProps {
  setValue: UseFormSetValue<FormValues>;
  setFocus: UseFormSetFocus<FormValues>;
}

const changeField = ({ setValue, setFocus }: changeFieldProps) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
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
          break;
        }
        setValue(name, cleanValue);
        break;
      }

      case 'cardDateYY': {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length >= 4) {
          setFocus('cardCvc');
          setValue(name, cleanValue.slice(0, 4));
          break;
        }
        setValue(name, cleanValue);
        break;
      }

      case 'cardCvc': {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length >= 3) {
          setValue(name, cleanValue.slice(0, 3));
          submitButtonRef.current?.focus();
          break;
        }
        setValue(name, cleanValue);
        break;
      }

      default:
        break;
    }
  };

  return {
    cardNumber,
    handleFieldChange,
    submitButtonRef,
  };
};

export default changeField;
