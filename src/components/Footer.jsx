"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Footer = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const words = ["Let's", "build", "a", "better", "future", "with"];

  return (
    <footer className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg pt-12">
      {/* CTA Section */}
      <div className={`py-20 px-8 ${theme === "dark" ? "bg-black" : "bg-[#FFF9C4]"}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* CTA Title - wider on large screens */}
          <div className="w-full lg:w-3/4 text-center lg:text-left">
            <motion.h3
              key={pathname}
              className={`text-4xl lg:text-6xl font-extrabold leading-tight tracking-widest ${
                theme === "dark" ? "text-[#FFF9C4]" : "text-gray-900"
              }`}
              variants={sentenceVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {words.map((word, index) => (
                <motion.span key={index} variants={wordVariants} className="inline-block mx-1">
                  {word}
                </motion.span>
              ))}
              <motion.span variants={wordVariants} className="inline-block mx-1 text-yellow-400">
                Technology.
              </motion.span>
            </motion.h3>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href="/contact"
                className="flex items-center justify-center bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md transition text-base md:text-lg"
              >
                Let's Go
                <svg
                  className="ml-2 w-5 h-5"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.53848 13.7123L12.9631 6.28769M12.9631 6.28769V13.7123M12.9631 6.28769H5.53848"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* CTA Description */}
          <div className="w-full lg:w-1/3 text-center lg:text-right">
            <p
              className={`text-base md:text-lg lg:text-xl ${
                theme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Find out how TechTrio’s technology expertise can take your digital experience to the next level.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        <div>
          <h4 className="font-semibold mb-4 text-base">Services</h4>
          <ul className="space-y-2">
            <li><Link href="#">Automation</Link></li>
            <li><Link href="#">Payment Gateway</Link></li>
            <li><Link href="#">App Development</Link></li>
            <li><Link href="#">Web Development</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-base">About</h4>
          <ul className="space-y-2">
            <li><Link href="#">Our Team</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Blogs</Link></li>
            <li><Link href="#">Case Studies</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-base">Support</h4>
          <ul className="space-y-2">
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Live Chat</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-base">Location</h4>
          <p>Vijapur, Gujarat</p>
          <Link href="/contact" className="mt-4 inline-block bg-yellow-400 text-black px-4 py-2 rounded-md text-sm">
            Contact Us
          </Link>
        </div>
      </div>

      {/* TECHTRIO reveal from divider */}
      <div className="relative h-[100px] lg:h-[240px] overflow-hidden">
        {/* Divider */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-400 dark:bg-gray-700 z-10" />

        {/* Text Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sentenceVariants}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 flex gap-2 sm:gap-4 text-6xl sm:text-7xl lg:text-[11rem] font-extrabold tracking-wider text-gray-900 dark:text-white whitespace-nowrap"
        >
          {"TechTrio".split("").map((letter, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className={["T"].includes(letter) ? "text-yellow-400" : ""}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-300 dark:border-gray-700 px-8 py-6">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
    
    {/* Left Side: Text */}
    <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
      <p>© 2025 TechTrio. All rights reserved.</p>
     
    </div>

    {/* Right Side: Social Icons */}
    <div className="mt-4 sm:mt-0 flex space-x-4 text-xl">
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition"
      >
        <FaTwitter />
      </a>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
      >
        <FaGithub />
      </a>
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
      >
        <FaInstagram />
      </a>
    </div>
  </div>
</div>

    </footer>
  );
};

export default Footer;
