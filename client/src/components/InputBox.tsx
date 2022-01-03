import '../SASS/base/_InputBox.scss';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from '../api/api';
import { IPasswordCardItems } from '../interfaces';

interface IInputBoxProps {
  passwordCards: IPasswordCardItems[],
  setPasswordCards: (allCards: any[]) => void,
  setRefreshCards: (arg: boolean) => void,
}

const InputBox = ({ passwordCards, setPasswordCards, setRefreshCards }: IInputBoxProps) => {
  const [nameInput, setNameInput] = useState<string>('');
  const [sliderLength, setSliderLength] = useState<number>(5);
  const [randomPassword, setRandomPassword] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPasswordCard = {
      title: nameInput, dateTime, password: randomPassword, showPassword: false,
    };

    try {
      setRefreshCards(false);
      await api.post('/save', newPasswordCard);
      const allCards = [...passwordCards];

      setPasswordCards(allCards);
      setSliderLength(5);
      setNameInput('');
      setRandomPassword('');
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshCards(true);
    }
  };

  const generatePassword = async () => {
    const _randomPassword: string = [...Array(sliderLength)].map(() => Math.random().toString(36)[2]).join('');

    setRandomPassword(_randomPassword);
  };

  const generate = (e: any) => {
    setSliderLength(e.target.valueAsNumber);
    generatePassword();
  };

  useEffect(() => {
    generatePassword();
  }, [sliderLength]);

  return (
    <form onSubmit={handleSubmit} className="inputBox">
      <div className="inputBox-titleWrap">
        <h2 className="inputBox-titleWrap_title">Name of your password</h2>
        <input className="inputBox-titleWrap_input" value={nameInput} onSubmit={() => setNameInput('')} onChange={(e: any) => setNameInput(e.target.value)} type="text" name="passwordName" id="passwordName" required placeholder="Name your password" />
      </div>

      <div className="inputBox-sliderWrap">
        <input type="range" min="5" max="100" value={sliderLength} onChange={(e: any) => generate(e)} required name="passwordLength" id="passwordLength" />
        <p className="inputBox-sliderWrap_number">
          Password length:
          {' '}
          {sliderLength}
        </p>
        <p className="inputBox-generatorWrap_text">
          Generated password:
          {' '}
          {randomPassword}
        </p>
      </div>
      <button type="submit" disabled={nameInput.length < 2} onClick={handleSubmit}>Save password</button>
    </form>
  );
};

export default InputBox;
