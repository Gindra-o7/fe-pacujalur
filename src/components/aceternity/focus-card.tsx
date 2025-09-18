import { useState } from "react";

interface GalleryCard {
  src: string;
  title: string;
  description: string;
}

interface FocusCardsProps {
  cards: GalleryCard[];
}

const FocusCards: React.FC<FocusCardsProps> = ({ cards }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseEnter = (index: number): void => {
    setHovered(index);
  };

  const handleMouseLeave = (): void => {
    setHovered(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
      {cards.map((card: GalleryCard, index: number) => (
        <div
          key={`${card.title}-${index}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className={`
            rounded-3xl relative overflow-hidden aspect-[4/3] transition-all duration-300 ease-out cursor-pointer group
            ${hovered !== null && hovered !== index 
              ? 'blur-sm scale-[0.98] brightness-50' 
              : 'blur-0 scale-100 brightness-100'
            }
          `}
        >
          <img
            src={card.src}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{card.title}</h3>
              <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {card.description}
              </p>
            </div>
          </div>

          {/* Hover ring effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>
      ))}
    </div>
  );
};

export default FocusCards;
