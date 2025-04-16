"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../db/firebase";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { useTheme } from "next-themes";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default Avatar Image

const BlogPage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [blogs, setBlogs] = useState({});
    const [likes, setLikes] = useState({});
    const { theme } = useTheme();
    const router = useRouter();

    // Fetch categories
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

    // Fetch blogs for selected category
    useEffect(() => {
        const fetchBlogs = async () => {
            if (!selectedCategory) return;

            const blogsRef = collection(db, "categories", selectedCategory, "blogs");
            const blogsSnapshot = await getDocs(blogsRef);
            const fetchedBlogs = {};

            blogsSnapshot.docs.forEach((doc) => {
                const data = doc.data();
                fetchedBlogs[doc.id] = { ...data, id: doc.id };
            });

            setBlogs(fetchedBlogs);
        };

        fetchBlogs();
    }, [selectedCategory]);

    // Handle Like Click
    const handleLike = async (blogId) => {
        const blogRef = doc(db, "categories", selectedCategory, "blogs", blogId);
        await updateDoc(blogRef, { likes: increment(1) });

        setLikes((prev) => ({
            ...prev,
            [blogId]: (prev[blogId] || 0) + 1,
        }));
    };

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className={`max-w-7xl mx-auto px-6 py-10 mt-20 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            {/* Page Title */}
            <h1 className="text-5xl font-extrabold text-center mb-5">TechTrio Blogs</h1>
            <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-10">
                Stay updated with the latest trends in technology, software, and automation.
            </p>

            {/* Category Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-6 py-3 rounded-lg text-lg font-semibold transition ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Blog Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.values(blogs).map((post) => (
                    <div
                        key={post.id}
                        onClick={() => router.push(`/blogs/${post.id}`)}
                        className="cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        {/* Blog Image or Slider */}
                        {post.images && post.images.length > 1 ? (
                            <Slider {...sliderSettings}>
                                {post.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={image}
                                        alt={post.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-56 object-cover"
                                    />
                                ))}
                            </Slider>
                        ) : post.images && post.images.length === 1 ? (
                            <Image
                                src={post.images[0]}
                                alt={post.title}
                                width={400}
                                height={250}
                                className="w-full h-56 object-cover"
                            />
                        ) : (
                            <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                No Image Available
                            </div>
                        )}

                        {/* Blog Content */}
                        <div className="p-5">
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{post.date}</p>

                            {/* Subtitle with "Read More" */}
                            <p className="text-gray-700 dark:text-gray-300 text-md mt-2 line-clamp-3">
                                {post.subtitle && post.subtitle.length > 100
                                    ? `${post.subtitle.substring(0, 100)}...`
                                    : post.subtitle || "No description available"}
                                {post.subtitle && post.subtitle.length > 100 && (
                                    <span className="text-blue-500 ml-2 cursor-pointer" onClick={() => router.push(`/blogs/${post.id}`)}>Read More</span>
                                )}
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center space-x-3 mt-4">
                                <Image
                                    src={post.authorImage || DEFAULT_AVATAR}
                                    alt={post.author}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="text-lg font-semibold">{post.author}</p>
                                    <p className="text-sm text-gray-500">{post.occupation || "Blogger"}</p>
                                </div>
                            </div>

                            {/* Like Button */}
                            <div className="flex items-center space-x-3 mt-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLike(post.id);
                                    }}
                                    className="text-gray-500 hover:text-blue-500 transition"
                                >
                                    {likes[post.id] ? <FaThumbsUp className="text-blue-500" /> : <FaRegThumbsUp />}
                                </button>
                                <span className="text-lg">{likes[post.id] || post.likes || 0}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
