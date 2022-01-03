import { useState } from 'react';
import api from '../api/api';
import CardFeed from '../components/CardFeed';
import InputBox from '../components/InputBox';
import { IPasswordCardItems } from '../interfaces';
import '../SASS/base/_Home.scss';

const Home = () => {
  const [passwordCards, setPasswordCards] = useState<IPasswordCardItems[]>([]);
  const [refreshCards, setRefreshCards] = useState<boolean>(false);

  const handleDelete = async (cardId: string) => {
    try {
      await api.delete(`/${cardId}`);
      const filteredPasswordCardsAfterDelte = passwordCards.filter((card) => card._id !== cardId);
      setPasswordCards(filteredPasswordCardsAfterDelte);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Home">
      <div className="Home-container">
        <h1 className="Home-container_title">Password Generator</h1>
        <InputBox
          passwordCards={passwordCards}
          setPasswordCards={setPasswordCards}
          setRefreshCards={setRefreshCards}
        />
        <CardFeed
          passwordCards={passwordCards}
          setPasswordCards={setPasswordCards}
          handleDelete={handleDelete}
          refreshCards={refreshCards}
        />
      </div>
    </div>
  );
};

export default Home;
