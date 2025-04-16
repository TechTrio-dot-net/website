"use client";

import { useState } from "react";
import { db } from "./../../db/firebase"; // Adjust the import path as needed
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes"; // Import useTheme

export default function ContactForm() {
  const [selectedOption, setSelectedOption] = useState("quote"); // Default selected option
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    position: "",
    coverLetter: "",
    resume: "",
  });

  const { resolvedTheme } = useTheme(); // Get the current theme

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let collectionName = "";
      let dataToSend = {};

      switch (selectedOption) {
        case "quote":
          collectionName = "quotes";
          dataToSend = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            budget: formData.budget,
            timestamp: new Date(),
          };
          break;
        case "position":
          collectionName = "applications";
          dataToSend = {
            name: formData.name,
            email: formData.email,
            position: formData.position,
            coverLetter: formData.coverLetter,
            resume: formData.resume,
            timestamp: new Date(),
          };
          break;
        case "talk":
          collectionName = "messages";
          dataToSend = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date(),
          };
          break;
        default:
          throw new Error("Invalid option selected");
      }

      // Add data to Firestore
      await addDoc(collection(db, collectionName), dataToSend);

      // Show success toast
      toast.success("Form submitted successfully!");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
        budget: "",
        position: "",
        coverLetter: "",
        resume: "",
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-6">
      <Toaster position="top-center" />
      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div
          className={`max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 ${resolvedTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } p-8 rounded-2xl shadow-lg`}
        >
          {/* Left Section */}
          <div>
            <h2 className={`text-3xl font-bold ${resolvedTheme === "dark" ? "text-white" : "text-black"}`}>
              How can we help? <br />
              <span className="text-yellow-400">Let's work together.</span>
            </h2>
            <p className={`${resolvedTheme === "dark" ? "text-gray-400" : "text-gray-600"} mt-4`}>
              Working together takes some practice to get in sync, but once we find our rhythm, the result can be magical!
            </p>
            <div className="hidden md:block mt-6">
              <img
                src="https://significa.co/_app/immutable/assets/pre-footer.ae1f1ddb.webp"
                alt="Illustration"
                className="w-full max-w-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h3 className={`text-lg font-semibold ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}>
              What are you looking for?
            </h3>
            <div className="flex space-x-2 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="quote"
                  checked={selectedOption === "quote"}
                  onChange={() => setSelectedOption("quote")}
                  className="form-radio text-yellow-400"
                />
                <span className={resolvedTheme === "dark" ? "text-white" : "text-black"}>Get a quote</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="position"
                  checked={selectedOption === "position"}
                  onChange={() => setSelectedOption("position")}
                  className="form-radio text-yellow-400"
                />
                <span className={resolvedTheme === "dark" ? "text-white" : "text-black"}>Apply to position</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="talk"
                  checked={selectedOption === "talk"}
                  onChange={() => setSelectedOption("talk")}
                  className="form-radio text-yellow-400"
                />
                <span className={resolvedTheme === "dark" ? "text-white" : "text-black"}>Talk to us</span>
              </label>
            </div>

            <form onSubmit={handleSubmit}>
              {selectedOption === "quote" && (
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} h-32 mb-4`}
                    required
                  ></textarea>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  >
                    <option value="">Budget range</option>
                    <option value="Less than ₹50,000">Less than ₹10,000</option>
                    <option value="₹50,000 - ₹2,00,000">₹10,000 - ₹1,00,000</option>
                    <option value="More than ₹2,00,000">More than ₹1,00,000</option>
                  </select>
                </div>
              )}

              {selectedOption === "position" && (
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  />
                  <input
                    type="text"
                    name="position"
                    placeholder="Position applying for"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  />
                  <textarea
                    name="coverLetter"
                    placeholder="Cover Letter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} h-32 mb-4`}
                    required
                  ></textarea>
                </div>
              )}

              {selectedOption === "talk" && (
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} mb-4`}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="What would you like to discuss?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full p-3 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
                      } rounded-lg ${resolvedTheme === "dark" ? "text-white" : "text-black"} h-32 mb-4`}
                    required
                  ></textarea>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 bg-yellow-400 text-black font-semibold p-3 rounded-lg"
              >
                Send message →
              </button>
            </form>

            {/* Hate contact forms option */}
            <p className={`${resolvedTheme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm mt-4`}>
              Hate contact forms?{" "}
              <a href="mailto:info@techtrio.net"className="text-yellow-400 hover:underline">
                info@techtrio.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}