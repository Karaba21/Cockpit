import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, CreditCard } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-surface border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-bold italic tracking-tighter mb-4">COCKPIT UY</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Lideres en simracing en Uruguay.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="col-span-1">
                        <h4 className="font-bold uppercase text-sm mb-4 tracking-wide">Navegación</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/catalogo" className="hover:text-primary transition-colors">Catalogo</Link></li>
                            <li><Link href="/cart" className="hover:text-primary transition-colors">Carrito</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="col-span-1">
                        <h4 className="font-bold uppercase text-sm mb-4 tracking-wide">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/policies/privacy-policy" className="hover:text-primary transition-colors">Política de privacidad</Link></li>
                            <li><Link href="/policies/refund-policy" className="hover:text-primary transition-colors">Política de reembolso</Link></li>
                            <li><Link href="/policies/terms-of-service" className="hover:text-primary transition-colors">Términos del servicio</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact placeholder */}
                    <div className="col-span-1">
                        <h4 className="font-bold uppercase text-sm mb-4 tracking-wide">Contacto</h4>
                        <p className="text-sm text-gray-400 mb-2">¿Tienes dudas?</p>
                        <a href="mailto:contacto@cockpituy.store" className="text-primary hover:underline text-sm">
                            contacto@cockpituy.store
                        </a>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()}, COCKPIT UY. Todos los derechos reservados.
                    </p>

                    <div className="flex items-center space-x-2 text-gray-500">
                        <CreditCard size={24} />
                        {/* Add more payment icons here */}
                        <span className="text-xs">Pagos seguros</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
