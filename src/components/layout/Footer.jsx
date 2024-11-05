import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa"

import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
        <h1>TaskManager</h1>

        <ul>
            <li><FaLinkedin /> - TaskManager</li>
            <li><FaFacebook /> - TaskManager Oficial</li>
            <li><FaWhatsapp /> - (00) 00000-0000</li>
        </ul>
    </footer>
  )
}

export default Footer
