"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../db/firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

const AdminBlogPage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        date: new Date().toISOString().split("T")[0], // Default to today's date
        author: "",
        authorImage: "",
        occupation: "",
        images: [],
        content: "",
    });
    const [imageUrls, setImageUrls] = useState([""]); // Array to store multiple images

    // Fetch categories from Firestore
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesRef = collection(db, "categories");
            const categoriesSnapshot = await getDocs(categoriesRef);
            const categoryNames = categoriesSnapshot.docs.map((doc) => doc.id);
            setCategories(categoryNames);
            if (categoryNames.length > 0) setSelectedCategory(categoryNames[0]);
        };

        fetchCategories();
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle category selection
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Handle adding a new category
    const handleAddCategory = async () => {
        if (newCategory.trim() === "") return;
        setCategories([...categories, newCategory]);
        setSelectedCategory(newCategory);

        const categoryRef = doc(db, "categories", newCategory);
        await setDoc(categoryRef, {});

        setNewCategory("");
        alert("Category added successfully!");
    };

    // Handle image input change
    const handleImageChange = (index, value) => {
        const updatedImages = [...imageUrls];
        updatedImages[index] = value;
        setImageUrls(updatedImages);
    };

    // Add new image input field
    const addImageField = () => {
        setImageUrls([...imageUrls, ""]);
    };

    // Validate word count before submission
    const isValidWordCount = (text) => {
        return text.split(/\s+/).filter((word) => word.length > 0).length >= 500;
    };

    // Handle blog submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory) return alert("Please select a category.");
        if (!isValidWordCount(formData.content)) {
            return alert("Content must be at least 500 words.");
        }

        const blogsRef = collection(db, "categories", selectedCategory, "blogs");

        const finalData = {
            ...formData,
            images: imageUrls.filter((url) => url.trim() !== ""), // Remove empty image fields
            likes: 0,
        };

        await addDoc(blogsRef, finalData);

        setFormData({
            title: "",
            subtitle: "",
            date: new Date().toISOString().split("T")[0],
            author: "",
            authorImage: "",
            occupation: "",
            images: [],
            content: "",
        });

        setImageUrls([""]); // Reset image inputs

        alert("Blog added successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 mt-20 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-center mb-6">Admin - Add Blog Post</h1>

            {/* New Category Input */}
            <div className="flex items-center mb-6 space-x-4">
                <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="px-4 py-2 border rounded-md w-full"
                />
                <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Category
                </button>
            </div>

            {/* Blog Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <select name="category" value={selectedCategory} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded-md">
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-md" />

                <input type="text" name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-md" />

                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-md" />

                <input type="text" name="author" placeholder="Author Name" value={formData.author} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-md" />

                <input type="text" name="authorImage" placeholder="Author Image URL" value={formData.authorImage} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" />

                <input type="text" name="occupation" placeholder="Author Occupation" value={formData.occupation} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" />

                {/* Multiple Image Upload Fields */}
                {imageUrls.map((image, index) => (
                    <input key={index} type="text" placeholder={`Image URL ${index + 1}`} value={image} onChange={(e) => handleImageChange(index, e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                ))}
                <button type="button" onClick={addImageField} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                    + Add More Images
                </button>

                <textarea name="content" placeholder="Content (Min 500 words)" value={formData.content} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-md min-h-[200px]" />

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default AdminBlogPage;
