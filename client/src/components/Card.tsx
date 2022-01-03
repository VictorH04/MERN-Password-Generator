import { useTransition, animated } from 'react-spring';
import { IPasswordCardItems } from '../interfaces';

interface ICardProps {
  cardData: IPasswordCardItems,
  showCardPassword: (cardId: string) => void,
  handleDelete: (cardId: string) => void,
  refreshCards: boolean
}

const Card = ({
  cardData, showCardPassword, handleDelete, refreshCards,
}: ICardProps) => {
  const transition = useTransition(refreshCards, {
    from: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 100, opacity: 0 },
  });

  return (
    <>
      {transition((style, item) => (item ? (
        <animated.div style={style} className="passwordCard" key={cardData._id}>
          <h1 className="passwordCard-title">
            Password to:
            {' '}
            {cardData.title}
          </h1>
          <h2 className="passwordCard-createdAt">
            Created at:
            {' '}
            {cardData.dateTime}
          </h2>
          <h2 className="passwordCard-password" style={{ display: 'flex' }}>
            {!cardData.showPassword ? [...Array(cardData.password.length)].map(
              () => <p>&#9679;</p>,
            ) : cardData.password}
          </h2>
          <button type="button" onClick={() => showCardPassword(cardData._id)}>Show password</button>
          <button type="button" onClick={() => handleDelete(cardData._id)}>Delete card</button>
          <h1>{cardData.showPassword}</h1>
        </animated.div>
      ) : ('')))}
    </>
  );
};

export default Card;
