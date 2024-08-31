import React from 'react'

function Slider() {
    return (
        <div>
            {/* Start slider section */}
            <section className="slider-section mb-4">
                <div className="first-slider p-0">
                    <div className="banner-slider owl-carousel owl-theme">
                        <div className="item">
                            <div className="position-relative">
                                <a href="javascript:;">
                                    <img
                                        src="assets/images/banners/01.png"
                                        className="img-fluid"
                                        alt="..."
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End slider section */}
        </div>
    )
}

export default Slider