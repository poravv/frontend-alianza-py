/*

import { withNamespaces } from 'react-i18next';

const Market = ({ dato, t }) => {

    const catalogo = () => (
        <div className="card-group">
            {dato ?
                dato.map((dato, index) => (
                    <div key={index} className="card m-1" style={{ minWidth: `200px`, maxWidth: `500px` }}>
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    dato.propiedad_has_fotos.fotos_propiedad.map((fotos, index) => (
                                        imagenes(fotos, index)
                                        //console.log(fotos)
                                    ))
                                }
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-titulo">{dato.titulo}</h5>
                            <p className="card-text">{dato.descripcion}</p>
                            <p className="card-text"><small className="text-muted">{dato.precio}</small></p>
                        </div>
                    </div>
                ))
                : null}
        </div>
    )

    const imagenes = (foto, index) => {
        //console.log(foto)
        if (index === 0) {
            //console.log('Entra en index 1');
            return <div className="carousel-item active" key={index} >
                <img key={index} className="w-100" src={foto.foto} alt="" />
            </div>
        } else {
            //console.log('Entra en index !1');
            return <div className="carousel-item" key={index} >
                <img key={index} className="w-100" src={foto.foto} alt="" />
            </div>
        }
    }

    return (
        <div>
            <section className="bg-success py-5">
                <div className="container">
                    <div className="col-md-8 text-white">
                        <h1>Catalogo</h1>
                    </div>
                    {catalogo()}
                </div>
            </section>
        </div>

    )
}


export default withNamespaces()(Market);
*/