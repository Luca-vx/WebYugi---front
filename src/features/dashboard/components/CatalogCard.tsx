import { useState } from "react";
import type { CardDto } from "../../../types/api";

interface CatalogCardProps {
  card: CardDto;
}

function getImagePath(imageUrl?: string | null) {
  if (!imageUrl) return null;
  // O backend armazena imagens em /uploads/cartas e retorna esse caminho no DTO.
  if (imageUrl.startsWith("/uploads/")) return imageUrl;
  try {
    const parsed = new URL(imageUrl);
    return parsed.pathname.startsWith("/uploads/") ? `${parsed.pathname}${parsed.search}` : null;
  } catch {
    return null;
  }
}

export function CatalogCard({ card }: CatalogCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imagePath = getImagePath(card.imageUrl);

  return (
    <article className="catalog-card">
      <div className={`card-art ${!imagePath || imageFailed ? "card-art-placeholder" : ""}`}>
        {imagePath && !imageFailed ? (
          <img src={imagePath} alt={card.name} loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
        ) : (
          <span className="card-art-fallback" aria-hidden="true">▧</span>
        )}
      </div>
      <div className="catalog-card-top"><h3 title={card.name}>{card.name}</h3><span className="type-tag">{card.type}</span></div>
      <p>{card.description}</p>
    </article>
  );
}
