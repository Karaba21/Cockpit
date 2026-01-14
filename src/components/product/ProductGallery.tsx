'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
    url: string;
    altText: string;
    mediaType?: 'image' | 'video' | 'external_video';
    previewImage?: string;
    host?: string;
}

interface ProductGalleryProps {
    media: MediaItem[];
    productTitle: string;
    isOnSale?: boolean;
}

export default function ProductGallery({ media, productTitle, isOnSale }: ProductGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!media || media.length === 0) {
        return (
            <div className="aspect-square bg-surface-light rounded-lg overflow-hidden border border-border flex items-center justify-center text-gray-500">
                No Image
            </div>
        );
    }

    const currentMedia = media[currentIndex];

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    };

    const goToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    const renderMedia = (item: MediaItem, isMain: boolean = false) => {
        const mediaType = item.mediaType || 'image';

        if (mediaType === 'video') {
            return (
                <video
                    src={item.url}
                    controls
                    className={isMain ? 'w-full h-full object-cover' : 'w-full h-full object-cover'}
                    poster={item.previewImage}
                >
                    Tu navegador no soporta el elemento de video.
                </video>
            );
        }

        if (mediaType === 'external_video') {
            if (item.host === 'YOUTUBE') {
                return (
                    <iframe
                        src={item.url}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                );
            }
            // Vimeo or other external videos
            return (
                <iframe
                    src={item.url}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            );
        }

        // Default: image
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={item.url}
                alt={item.altText}
                className={isMain ? 'w-full h-full object-cover' : 'w-full h-full object-cover'}
            />
        );
    };

    return (
        <div className="space-y-4">
            {/* Main Display */}
            <div className="aspect-square bg-surface-light rounded-lg overflow-hidden border border-border relative group">
                {renderMedia(currentMedia, true)}

                {/* Sale Badge */}
                {isOnSale && (
                    <span className="absolute top-4 right-4 bg-secondary text-white font-bold px-3 py-1 rounded z-10">
                        OFERTA
                    </span>
                )}

                {/* Navigation Arrows - Only show if more than 1 media item */}
                {media.length > 1 && (
                    <>
                        {/* Left Arrow */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={goToNext}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
                            aria-label="Imagen siguiente"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails - Only show if more than 1 media item */}
            {media.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {media.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => goToIndex(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                ? 'border-primary ring-2 ring-primary/50'
                                : 'border-border hover:border-primary/50'
                                }`}
                        >
                            {item.mediaType === 'video' || item.mediaType === 'external_video' ? (
                                <div className="relative w-full h-full">
                                    {item.previewImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.previewImage}
                                            alt={`${item.altText} - miniatura`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-surface-light flex items-center justify-center">
                                            <svg
                                                className="w-8 h-8 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* Video indicator */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-black/60 rounded-full p-2">
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={item.url}
                                    alt={`${item.altText} - miniatura`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
