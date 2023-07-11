
const imagenes = [
    require('../componentes/img/banner_img_01.jpg'),
    require('../componentes/img/banner_img_02.jpg'),
    require('../componentes/img/banner_img_03.jpg'),
]

export default function Destacados() {
    return (
        <div>
            <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    {imagenes.map((index) => {
                        return <div key={index}>
                        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={index}  ></li>
                    </div>
                    })}
                </ol>
                <div className="carousel-inner">
                    {imagenes.map((img, index) => {
                        if (index === 0) {
                            return <div className="carousel-item active" key={index}>
                                <div className="container">
                                    <div className="row p-5">
                                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                            <img key={index} className="img-fluid" src={img} alt="" />
                                        </div>
                                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                                            <div className="text-align-left align-self-center">
                                                <h1 className="h1 text-success"><b>Zay</b> eCommerce</h1>
                                                <h3 className="h2">Tiny and Perfect eCommerce Template</h3>
                                                <p>
                                                    Zay Shop is an eCommerce HTML5 CSS template with latest version of Bootstrap 5 (beta 1).
                                                    This template is 100% free provided by <a rel="noreferrer" className="text-success" href="https://templatemo.com" target="_blank">TemplateMo</a> website.
                                                    Image credits go to <a rel="noreferrer" className="text-success" href="https://stories.freepik.com/" target="_blank">Freepik Stories</a>,
                                                    <a rel="noreferrer" target="_blank" className="text-success" href="https://unsplash.com/" >Unsplash</a> and
                                                    <a rel="noreferrer" target="_blank" className="text-success" href="https://icons8.com/">Icons 8</a>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } else {
                            return <div className="carousel-item" key={index}>
                                <div className="container" >
                                    <div className="row p-5">
                                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                            <img key={index} className="img-fluid" src={img} alt="" />
                                        </div>
                                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                                            <div className="text-align-left align-self-center">
                                                <h1 className="h1 text-success"><b>Zay</b> eCommerce</h1>
                                                <h3 className="h2">Tiny and Perfect eCommerce Template</h3>
                                                <p>
                                                    Zay Shop is an eCommerce HTML5 CSS template with latest version of Bootstrap 5 (beta 1).
                                                    This template is 100% free provided by <a rel="noreferrer" className="text-success" href="https://templatemo.com" target="_blank">TemplateMo</a> website.
                                                    Image credits go to <a rel="noreferrer" className="text-success" href="https://stories.freepik.com/" target="_blank">Freepik Stories</a>,
                                                    <a rel="noreferrer" className="text-success" href="https://unsplash.com/" target="_blank">Unsplash</a> and
                                                    <a rel="noreferrer" className="text-success" href="https://icons8.com/" target="_blank">Icons 8</a>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    })}
                </div>
                <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
                    <i className="fas fa-chevron-left"></i>
                </a>
                <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
                    <i className="fas fa-chevron-right"></i>
                </a>
            </div>
        </div>
    );
}