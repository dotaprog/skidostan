import { Category } from '../data/promos';
import PromoCard from './PromoCard';

interface CategorySectionProps {
  category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
  if (category.promos.length === 0) return null;

  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{category.emoji}</span>
        <h2 className="text-2xl font-extrabold text-gray-900">{category.label}</h2>
        <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-3 py-1 rounded-full">
          {category.promos.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.promos.map((promo) => (
          <PromoCard
            key={promo.id}
            promo={promo}
            categoryLabel={category.label}
          />
        ))}
      </div>
    </section>
  );
}
