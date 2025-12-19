import Link from 'next/link';
import Image from 'next/image';

interface CategoryCardProps {
    title: string;
    imageSrc: string;
    href: string;
    className?: string; // For grid span positioning
}

const CategoryCard = ({ title, imageSrc, href, className = '' }: CategoryCardProps) => (
    <Link
        href={href}
        className={`relative group overflow-hidden rounded-2xl block ${className}`}
    >
        <div className="absolute inset-0 z-0">
            <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-orange-500 font-bold text-2xl uppercase tracking-wider">
                {title}
            </h3>
        </div>
    </Link>
);

const CategoryGrid = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px] md:h-[500px]">
                {/* Left Column - Mods (Tall) */}
                <CategoryCard
                    title="Soportes"
                    imageSrc="/soportes2.jpg"
                    href="/catalogo?category=soportes"
                    className="h-full"
                />

                {/* Right Column - Stacked */}
                <div className="flex flex-col gap-4 h-full">
                    <CategoryCard
                        title="Volantes"
                        imageSrc="/volantes3.jpg"
                        href="/catalogo?category=volantes"
                        className="flex-1"
                    />
                    <CategoryCard
                        title="Accesorios"
                        imageSrc="/mods4.jpg"
                        href="/catalogo?category=accesorios"
                        className="flex-1"
                    />
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
