import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div>
        <div className="Objective">
          <h1><b>Objective</b></h1>
          <span>
            The 2030 Agenda for Sustainable Development, adopted in September 2015 by all United Nations Member States, is a global plan aimed at eradicating poverty, protecting the planet, and ensuring prosperity for all. This ambitious framework is built around 17 Sustainable Development Goals (SDGs), addressing global challenges such as climate change, inequality, environmental degradation, and social justice. The 2030 Agenda not only focuses on economic development but also promotes an integrated approach that considers social well-being and environmental sustainability as fundamental pillars for an equitable future. As we move toward 2030, it is crucial that governments, businesses, organizations, and citizens work together to implement innovative and sustainable solutions that transform the way we live and work, ensuring that no one is left behind.
          </span>
        </div>
      </div>

      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 border-bottom">UN Objective</h2>
        <div className="UN">
          <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
            <div className="col">
              <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: 'url("/img/ONU-2.png")' }}>
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                  <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Sustainable Development</h3>
                  <ul className="d-flex list-unstyled mt-auto">
                    <li className="d-flex align-items-center me-3"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <span className="texto" style={{ textAlign: 'justify' }}>
            The 2030 Agenda for Sustainable Development, adopted in September 2015 by all United Nations Member States, is a global plan aimed at eradicating poverty, protecting the planet, and ensuring prosperity for all. This ambitious framework is built around 17 Sustainable Development Goals (SDGs), addressing global challenges such as climate change, inequality, environmental degradation, and social justice. The 2030 Agenda not only focuses on economic development but also promotes an integrated approach that considers social well-being and environmental sustainability as fundamental pillars for an equitable future. As we move toward 2030, it is crucial that governments, businesses, organizations, and citizens work together to implement innovative and sustainable solutions that transform the way we live and work, ensuring that no one is left behind.
          </span>
        </div>
      </div>

      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Features</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <h3 className="fs-2 text-body-emphasis">CO2 real-time Emissions Map</h3>
            <p>Have you ever wondered how much pollution the vehicles we use on a daily basis cause? Check out our page where you can see in real-time the emissions in Mexico.</p>
            <Link to="/co2" className="icon-link">Call to action</Link>
          </div>
          <div className="feature col">
            <h3 className="fs-2 text-body-emphasis">Timelapse of CO2 Emissions in Mexico</h3>
            <p>On this page, you will be able to find out how CO2 emissions from cars have increased in the past 4 decades.</p>
            <Link to="/timelapse" className="icon-link">Call to action</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
