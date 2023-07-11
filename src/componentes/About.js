

export default function About() {
    return (
        <div>
            <section className="bg-success py-5">
                <div className="container">
                    <div className="row align-items-center py-5">
                        <div className="col-md-8 text-white">
                            <h1>Sobre nosotros</h1>
                            <p>
                                Es muy importante tener un buen cliente, va a ser mucho, pero así lo voy a dar.
                                con el tiempo ocurren como con gran trabajo y dolor. Con los años, vendré,
                                ¿Quién debe practicar cualquier tipo de trabajo excepto para obtener algún beneficio de él?
                            </p>
                        </div>
                        <div className="col-md-4">
                            <img src={require('./img/about-hero.svg')} alt="About Hero" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}