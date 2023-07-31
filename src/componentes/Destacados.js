import { Carousel } from 'react-bootstrap';

export default function Destacados() {
    return (
        <div>
            <Carousel style={{ background: `#F1F1F1` }}>
                <Carousel.Item >
                    <div className="container">
                        <div className="row p-2">
                            <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img style={{ width: `100%` }} src={require('../componentes/img/banner_img_01.jpg')} alt='..' />
                            </div>
                            <div className="col-lg-6 mb-0 d-flex align-items-center">
                                <div className="text-align-left align-self-center text-black">
                                    <h1 className="h1 text-success"><b>Zay</b> eCommerce</h1>
                                    <h3 className="h2">Tiny and Perfect eCommerce Template</h3>
                                    <p>
                                        Zay Shop is an eCommerce HTML5 CSS template with latest version of Bootstrap 5 (beta 1).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Carousel.Caption >
                        {null}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}