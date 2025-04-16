"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./../../../../db/firebase"; // Adjust the import path as needed
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddTestimonialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    quote: "",
    name: "",
    role: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.quote || !formData.name || !formData.role || !formData.image) {
      toast.error("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Add testimonial to Firestore
      await addDoc(collection(db, "testimonials"), {
        quote: formData.quote,
        name: formData.name,
        role: formData.role,
        image: formData.image,
        timestamp: new Date(),
      });

      toast.success("Testimonial added successfully!");
    } catch (error) {
      console.error("Error adding testimonial: ", error);
      toast.error("Failed to add testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col justify-center items-center p-6">
      <Toaster position="top-center" />
      <div className="max-w-2xl w-full bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Add a Testimonial</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quote Field */}
          <div>
            <label htmlFor="quote" className="block text-sm font-medium mb-2">
              Quote
            </label>
            <textarea
              id="quote"
              name="quote"
              value={formData.quote}
              onChange={handleInputChange}
              className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="4"
              placeholder="Enter the testimonial quote"
              required
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter the name"
              required
            />
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter the role/position"
              required
            />
          </div>

          {/* Image URL Field */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter the image URL"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}