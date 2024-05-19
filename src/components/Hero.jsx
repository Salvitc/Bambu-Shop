import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-gray-300 bg-blend-overlay">
    <div className="hero-content text-center">
      <div className="max-w-xl">
        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">¡Tu floristería online en Cádiz!</h1>
        <p className="py-6 text-2xl max-md:text-lg text-accent-content">
          Encuentra las flores más frescas y hermosas para cualquier ocasión.
          Realiza tus pedidos online y recíbelos en la puerta de tu casa.
        </p>
        <Link to="/shop" className="btn btn-wide bg-green-600 hover:bg-green-800 text-white">Compra ahora</Link>
      </div>
    </div>
  </div>
  )
}

export default Hero
