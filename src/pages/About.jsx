import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="Sobre Nosotros" path="Inicio | Nosotros" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">¿Quien somos?</h2>
      <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
        En Floristería Bambú, ubicada en la encantadora ciudad de Cádiz, nos dedicamos a brindar alegría y belleza a través de nuestras exquisitas flores. Como eCommerce especializado, ofrecemos una amplia variedad de arreglos florales, ramos y plantas, cuidadosamente seleccionados para cada ocasión. Nuestro compromiso es proporcionar productos de la más alta calidad, combinando la frescura de nuestras flores con un servicio excepcional. En Bambú, creemos en la magia de las flores para transformar momentos cotidianos en recuerdos inolvidables, y nos esforzamos por hacer que cada compra en nuestra tienda online sea una experiencia única y satisfactoria.
      </p>
      <Link to="/contact" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
