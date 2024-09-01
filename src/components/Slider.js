import React, { useEffect, useState } from 'react';
import axios from 'axios';
import B_URL from '../Services/Api';

function Slider() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axios.get(`${B_URL}/api/banners/`);
                setBanners(data);
            } catch (error) {
                console.error("Failed to fetch banners:", error.response ? error.response.data : error.message);
            }
        };

        fetchBanners();
    }, []);

    return (
        <div>
            {/* Start slider section */}
            <section className="slider-section mb-4">
                <div className="first-slider p-0">
                    <div className="banner-slider owl-carousel owl-theme">
                        {banners.map(banner => (
                            <div className="item" key={banner.id}>
                                <div className="position-relative">
                                    <a href="javascript:;">
                                        <img
                                            src={`${B_URL}${banner.image}`}
                                            className="img-fluid"
                                            alt={banner.alt_text}
                                        />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* End slider section */}
        </div>
    );
}

export default Slider;
