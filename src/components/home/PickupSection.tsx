import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const PickupSection = () => {
    return (
        <section id="pickup" className="scroll-mt-24 py-4 bg-surface border-t border-asfalto">
            <div className="container mx-auto px-4">
                <h2 className="text-6xl md:text-6xl font-bold tracking-tighter mb-8 text-center text-primary font-outfit">
                    PICKUP
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Side - Location Information */}
                    <div className="space-y-6">

                        {/* Address */}
                        <div className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <MapPin className="text-primary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1 font-dm-sans">Dirección</h4>
                                <p className="text-arena text-lg font-dm-sans">
                                    Carrasco Norte, Montevideo
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <Phone className="text-primary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1 font-dm-sans">Teléfono</h4>
                                <a
                                    href="tel:+59893474177"
                                    className="text-arena text-lg hover:text-primary transition-all duration-300 font-dm-sans"
                                >
                                    +598 93474177
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <Mail className="text-primary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1 font-dm-sans">Email</h4>
                                <a
                                    href="mailto:cockpituy@gmail.com"
                                    className="text-arena text-lg hover:text-primary transition-all duration-300 font-dm-sans"
                                >
                                    cockpituy@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Map Image */}
                    <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden border border-asfalto shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="/ubicacion.webp"
                            alt="Ubicación GP Automóviles"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PickupSection;
