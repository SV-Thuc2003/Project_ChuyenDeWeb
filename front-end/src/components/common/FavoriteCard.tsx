import React from 'react';
import Card from './Card';
import { useFavorite } from '../../hooks/useFavorite';

interface FavoriteCardProps {
  id: number;
  image?: string;
  title?: string;
  price?: string;
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
  const { isFavorite, toggleFavorite } = useFavorite(id, userId);

  return (
    <Card
      id={id}
      image={image}
      title={title}
      price={price}
      isFavorite={isFavorite}
      onFavoriteToggle={toggleFavorite}
      className={className}
    />
  );
};

export default FavoriteCard;
