import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const PickupSection = () => {
    return (
        <section id="pickup" className="py-16 bg-surface border-t border-asfalto">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter mb-12 text-center text-primary">
                    Pickup
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Side - Location Information */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold italic text-foreground mb-6">
                            GP Automóviles
                        </h3>

                        {/* Address */}
                        <div className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <MapPin className="text-primary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Dirección</h4>
                                <p className="text-arena text-sm">
                                    General Fructuoso Rivera 3334, San José de Mayo
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <Phone className="text-primary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Teléfono</h4>
                                <a
                                    href="tel:+59899493618"
                                    className="text-arena text-sm hover:text-primary transition-all duration-300"
                                >
                                    +598 99 493 618
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <Mail className="text-primary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Email</h4>
                                <a
                                    href="mailto:gp.automoviles@gmail.com"
                                    className="text-arena text-sm hover:text-primary transition-all duration-300"
                                >
                                    gp.automoviles@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <Clock className="text-primary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Horarios</h4>
                                <div className="text-arena text-sm space-y-1">
                                    <p>Lunes - Viernes: 8:00 - 19:00</p>
                                    <p>Sábados: 8:00 - 17:00 PM</p>
                                    <p>Domingos: Con previa agenda</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Map Image */}
                    <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden border border-asfalto shadow-lg hover:shadow-xl transition-all duration-300">
                        <Image
                            src="/ubicacion.png"
                            alt="Ubicación GP Automóviles"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PickupSection;
