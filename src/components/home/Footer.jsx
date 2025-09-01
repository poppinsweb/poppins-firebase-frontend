import "../../styles/home/footer.css";
import { FaInstagram, FaWhatsapp, FaRegEnvelope, FaHandHoldingHeart } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer-container ">
      <footer className="text-center">
        <div className="">
          <section className="mt-1 footer-links">
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="https://www.poppinseduca.com/ "target="_blank">Página principal</a>
              </div>
            </div>
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/privacity">Privacidad</a>
              </div>
            </div>
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/copyright">Copyright</a>
              </div>
            </div>
          </section>
          <section className="social-logos">
            <a
              href="https://www.instagram.com/poppinseduca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram alt="Link-instagram" className="social" />
            </a>
            <a
              href="https://wa.me/c/573028464049"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp alt="Link-whatsapp" className="social" />
            </a>
            <a
              href="mailto:poppinseduca@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaRegEnvelope alt="Link-mailto" className="social" />
            </a> <p className="memark">webapp <FaHandHoldingHeart /> by alecode</p>
          </section>
        </div>
      </footer>
    </div>
  );
};
