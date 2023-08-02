import { Carousel } from 'react-bootstrap';
import { separadorMiles } from './utils/Separador';
import { useNavigate } from "react-router-dom";

export default function Destacados({ destacados }) {
    //console.log(destacados)
    const navigate = useNavigate();
    function navegacion(direccion) {
        navigate(direccion);
    }

    return (
        <div style={{ background: `#979797` }}>
            <div className='container'>
                <Carousel interval={3000} >
                    {destacados ?
                        destacados.map((des, index) => {
                            return (
                                <Carousel.Item key={index} >
                                    <div className="mx-auto col-lg-8 order-lg-last" style={{ minHeight: `450px`, filter: `brightness(40%)` }}>
                                        <img width={900} height={500} src={'http://186.158.152.141:4002/' + des?.Propiedad_has_fotos[0]?.fotos_propiedads[0]?.name} alt='..' />
                                    </div>
                                    <Carousel.Caption style={{ display:`flex`,justifyContent:`center`,alignItems:`center`,textAlign:`center`,cursor:`pointer` }} onClick={() => navegacion(`/detalle/${des?.idpropiedad}`)} >
                                        <div className='row' >
                                            <div className="col" >
                                                <h1 style={{ minWidth:`400px` }} className="shadow text-white"><b>{des?.titulo}</b></h1>
                                                <p className='shadow' style={{ color: `orange` }}>{des?.descripcion}</p>
                                            </div>
                                            <div className='col'>
                                                <h3 className='shadow'>{des?.direccion}</h3>
                                                <p className='shadow' style={{ color: `orange` }}>Gs {separadorMiles(parseInt(des?.precio))}</p>
                                            </div>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                        : null}

                </Carousel>
            </div>
        </div >
    );
}