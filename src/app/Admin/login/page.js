"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../db/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes"; // Use next-themes for dark mode

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme } = useTheme(); // Get current theme

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-screen transition-all duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-6 rounded-lg shadow-md ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Animated Image */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <Image
            src="https://res.cloudinary.com/ddztecdya/image/upload/v1739845925/jrzjovv25dgvbdaywc5p.png"
            alt="Login"
            width={200}
            height={200}
            className="rounded-full"
          />
        </motion.div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
            }`}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
            }`}
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-2 rounded transition-all ${
              theme === "dark"
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
