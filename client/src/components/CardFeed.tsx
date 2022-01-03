import { useEffect, useState } from 'react';
import api from '../api/api';
import { IPasswordCardItems } from '../interfaces';
import Card from './Card';

interface ICardFeedProps {
  passwordCards: IPasswordCardItems[],
  setPasswordCards: (passwordCardsRes: any[]) => void,
  handleDelete: (cardId: string) => void,
  refreshCards: boolean
}

const CardFeed = ({
  passwordCards, setPasswordCards, handleDelete, refreshCards,
}: ICardFeedProps) => {
  const [cardLoading, setCardLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPasswordCards = async () => {
      try {
        setCardLoading(true);
        const passwordCardsRes = await api.get('');
        setPasswordCards(passwordCardsRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setCardLoading(false);
      }
    };

    fetchPasswordCards();
  }, [refreshCards]);

  const showCardPassword = (cardId: string) => {
    const currentCardIndex = passwordCards.findIndex(
      (card: IPasswordCardItems) => card._id === cardId,
    );

    const tmpPasswordCards = [...passwordCards];

    tmpPasswordCards[currentCardIndex]
      .showPassword = !tmpPasswordCards[currentCardIndex].showPassword;

    setPasswordCards(tmpPasswordCards);
  };

  return (
    <div>
      {cardLoading
        && <h1>Loading...</h1>}

      {!cardLoading && passwordCards.length !== 0 ? (
        passwordCards.map((card: IPasswordCardItems) => (
          <Card
            cardData={card}
            showCardPassword={showCardPassword}
            handleDelete={handleDelete}
            refreshCards={refreshCards}
          />
        ))
      ) : (
        <h1>No cards</h1>
      )}
    </div>
  );
};

export default CardFeed;
