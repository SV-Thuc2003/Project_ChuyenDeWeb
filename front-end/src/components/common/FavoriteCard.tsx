// import React from 'react';
// import Card from './Card';
// import { useFavorites } from '../../hooks/useFavorite';

// interface FavoriteCardProps {
//   id: number;
//   image?: string;
//   title?: string;
//   price?: number;
//   userId: number;
//   className?: string;
// }

// const FavoriteCard: React.FC<FavoriteCardProps> = ({
//   id,
//   image,
//   title,
//   price,
//   userId,
//   className = '',
// }) => {
//   const { isFavorite, toggleFavorite } = useFavorites(userId);

//   return (
//     <Card
//       id={id}
//       image={image}
//       title={title}
//       price={price}
//       isFavorite={isFavorite}
//       onFavoriteToggle={toggleFavorite}
//       className={className}
//     />
//   );
// };

// export default FavoriteCard;

import React from 'react';
import Card from './Card';
import { useFavorites } from '../../hooks/useFavorite';

interface FavoriteCardProps {
  id: number;
  image?: string;
  title?: string;
  price?: number;
  userId: number;
  className?: string;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  id,
  image,
  title,
  price,
  userId,
  className = '',
}) => {
  const { isFavorite, toggleFavorite } = useFavorites(userId);

  const handleFavoriteToggle = () => {
    toggleFavorite(id);
  };

  return (
    <Card
      id={id}
      image={image}
      title={title}
      price={price}
      isFavorite={isFavorite(id)} 
      onFavoriteToggle={handleFavoriteToggle} 
      className={className}
    />
  );
};

export default FavoriteCard;
