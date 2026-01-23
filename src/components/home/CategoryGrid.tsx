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

        <div className="absolute top-0 left-0 w-full bg-primary py-3 z-10">
            <h3 className="text-surface font-bold italic text-3xl uppercase tracking-wider text-center">
                {title}
            </h3>
        </div>
    </Link>
);

const CategoryGrid = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">

                <CategoryCard
                    title="Volantes"
                    imageSrc="/volsss.jpg"
                    href="/catalogo?category=volantes-1"
                    className="h-[350px]"
                />

                <CategoryCard
                    title="Soportes"
                    imageSrc="/cockpits-final.jpg"
                    href="/catalogo?category=soportes"
                    className="h-[350px]"
                />


                <CategoryCard
                    title="Accesorios"
                    imageSrc="/mods-final.jpg"
                    href="/catalogo?category=accesorios"
                    className="h-[350px]"
                />
            </div>
        </section>
    );
};

export default CategoryGrid;
