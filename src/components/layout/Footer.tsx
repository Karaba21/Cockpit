import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, CreditCard } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-surface border-t border-asfalto pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-bold italic tracking-tighter mb-4 text-primary">COCKPIT UY</h3>
                        <p className="text-arena text-sm mb-6">
                            Lideres en simracing en Uruguay.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/cockpituy" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/cockpit.uy/" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="col-span-1">
                        <h4 className="font-bold uppercase text-sm mb-4 tracking-wide">Navegación</h4>
                        <ul className="space-y-2 text-sm text-arena">
                            <li><Link href="/" className="hover:text-primary transition-all duration-300 hover:pl-1">Home</Link></li>
                            <li><Link href="/catalogo" className="hover:text-primary transition-all duration-300 hover:pl-1">Catalogo</Link></li>
                            <li><Link href="/cart" className="hover:text-primary transition-all duration-300 hover:pl-1">Carrito</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="col-span-1">
                        <h4 className="font-bold uppercase text-sm mb-4 tracking-wide">Legal</h4>
                        <ul className="space-y-2 text-sm text-arena">
                            <li><Link href="/politica-de-privacidad" className="hover:text-primary transition-all duration-300 hover:pl-1">Política de privacidad</Link></li>
                            <li><Link href="/politica-de-reembolso" className="hover:text-primary transition-all duration-300 hover:pl-1">Política de reembolso</Link></li>
                            <li><Link href="/terminos-del-servicio" className="hover:text-primary transition-all duration-300 hover:pl-1">Términos del servicio</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact placeholder */}
                    <div className="col-span-1">
                        <h4 className="font-bold uppercase text-sm mb-4 tracking-wide">Contacto</h4>
                        <p className="text-sm text-arena mb-2">¿Tienes dudas?</p>
                        <a href="mailto:contacto@cockpituy.store" className="text-primary hover:underline text-sm hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)] transition-all duration-300">
                            contacto@cockpituy.store
                        </a>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()}, COCKPIT UY. Todos los derechos reservados.
                    </p>

                    <div className="flex items-center space-x-2 text-arena">
                        <CreditCard size={24} className="text-primary" />
                        {/* Add more payment icons here */}
                        <span className="text-xs">Pagos seguros</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
