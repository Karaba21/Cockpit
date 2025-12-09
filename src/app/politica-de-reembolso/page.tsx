export default function PoliticaReembolsoPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
            <div className="space-y-8 text-foreground">

                {/* Header */}
                <section>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Política de reembolso</h1>

                    <div className="space-y-4 leading-relaxed">
                        <p>
                            En Cockpit.uy aceptamos devoluciones dentro de los 5 días hábiles posteriores a la recepción. El comprador deberá hacerse cargo de los costos de envío y gestión, y la devolución quedará sujeta a aprobación tras verificar que el producto esté en perfecto estado, sin uso indebido y con su embalaje original. En caso de no cumplir con estas condiciones, la devolución será rechazada.
                        </p>
                        <p className="font-semibold text-primary">
                            Importante: los volantes Logitech, una vez abiertos y manipulados, no tienen devolución.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
