export default function TerminosServicioPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
            <div className="space-y-8 text-foreground">

                {/* Header */}
                <section>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Términos del servicio</h1>

                    <div className="space-y-4 leading-relaxed">
                        <p>
                            Al acceder y utilizar este sitio web, aceptas cumplir con los presentes Términos de Servicio. Te recomendamos leerlos atentamente antes de realizar cualquier compra.
                        </p>
                    </div>
                </section>

                {/* Productos y Precios */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Productos y Precios</h2>
                    <p className="leading-relaxed">
                        Los precios publicados en el sitio son en pesos uruguayos (UYU) e incluyen impuestos cuando corresponda. Cockpit.uy se reserva el derecho de modificar precios y disponibilidad sin previo aviso.
                    </p>
                </section>

                {/* Proceso de Compra */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Proceso de Compra</h2>
                    <p className="leading-relaxed">
                        Una vez realizado el pedido y confirmado el pago, recibirás un correo de confirmación. Cockpit.uy no se responsabiliza por errores en la información brindada por el cliente (dirección, teléfono, correo, etc.).
                    </p>
                </section>

                {/* Envíos */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Envíos</h2>
                    <p className="leading-relaxed">
                        Los envíos se realizan a todo Uruguay mediante empresas de transporte de terceros. Los plazos de entrega son estimados y pueden variar según la zona y la disponibilidad del servicio.
                    </p>
                </section>

                {/* Limitación de Responsabilidad */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Limitación de Responsabilidad</h2>
                    <p className="leading-relaxed">
                        Cockpit.uy no será responsable por daños directos o indirectos derivados del uso inadecuado de los productos adquiridos.
                    </p>
                </section>

                {/* Privacidad */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Privacidad</h2>
                    <p className="leading-relaxed">
                        La información personal de los clientes será utilizada únicamente para la gestión de las compras y envíos, respetando la normativa uruguaya de protección de datos.
                    </p>
                </section>

            </div>
        </div>
    );
}
