import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="lg:mx-20">
        {/* Top Footer */}
        <footer className="footer p-10 bg-gradient-to-r from-teal-700 to-gray-800 text-white grid grid-cols-2 md:grid-cols-3 gap-8 rounded-t-sm">
          <nav>
            <h6 className="footer-title text-xl font-bold mb-4 border-b border-gray-500 pb-2">
              সেবা
            </h6>
            <a className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2">
              ব্র্যান্ডিং
            </a>
            <a className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2">
              ডিজাইন
            </a>
            <a className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2">
              মার্কেটিং
            </a>
            <a className="block text-base  transform transition-all duration-300 hover:text-teal-300">
              বিজ্ঞাপন
            </a>
          </nav>
          <nav>
            <h6 className="footer-title text-xl font-bold mb-4 border-b border-gray-500 pb-2">
              কোম্পানি
            </h6>
            <Link
              to="/faq"
              className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2"
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              to="/contact"
              className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2"
            >
              যোগাযোগ
            </Link>

            <Link
              to="/detail"
              className="block text-base  transform transition-all duration-300 hover:text-teal-300"
            >
              বিস্তারিত
            </Link>
            <Link
              to="/faq"
              className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2"
            >
              সচরাচর প্রশ্নাবলী
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title text-xl font-bold mb-4 border-b border-gray-500 pb-2">
              আইনগত
            </h6>
            <Link
              to="/legal"
              className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2"
            >
              ব্যবহারের শর্ত
            </Link>
            <Link
              to="/legal"
              className="block text-base  transform transition-all duration-300 hover:text-teal-300 mb-2"
            >
              গোপনীয়তা নীতি
            </Link>
            <Link
              to="/legal"
              className="block text-base  transform transition-all duration-300 hover:text-teal-300"
            >
              কুকি নীতি
            </Link>
          </nav>
        </footer>

        {/* Bottom Footer */}
        <footer className="bg-gray-900 text-gray-300 px-10 py-6 flex flex-col md:flex-row justify-between items-center">
          <aside className="flex items-center gap-4 mb-4 md:mb-0">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/5000/svg"
              fill="currentColor"
              className="text-teal-400"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847z"></path>
            </svg>
            <p>
              <span className="font-bold text-white">স্বপ্ননীড় প্রপার্টিজ</span>
              <br />
              <span className="text-gray-400 text-sm">
                ২০২৫ সাল থেকে নির্ভরযোগ্য ফ্ল্যাট বিক্রয়
              </span>
            </p>
          </aside>
          <p className="text-center text-gray-400">
            কপিরাইট 🅒 ২০২৫ - সকল অধিকার সংরক্ষিত স্বপ্ননীড় প্রপার্টিজ।
          </p>
          <nav className="flex gap-6">
            <a
              to="#"
              aria-label="Twitter"
              className="text-teal-400  transform transition duration-300 hover:text-gray-400"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              to="#"
              aria-label="YouTube"
              className="text-teal-400 transform transition duration-300 hover:text-gray-400"
            >
              <i className="fab fa-youtube text-2xl"></i>
            </a>
            <a
              to="#"
              aria-label="Facebook"
              className="text-teal-400  transform transition duration-300 hover:text-gray-400"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
