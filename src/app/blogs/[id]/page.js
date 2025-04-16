"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../../db/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

const BlogDetails = () => {
  const params = useParams();
  const id = params?.id; // Extract blog ID
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [likes, setLikes] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (!id) return;

    const fetchBlogDetails = async () => {
      let foundBlog = null;
      let blogCategory = "";

      // Get all categories
      const categoriesRef = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesRef);

      for (const categoryDoc of categoriesSnapshot.docs) {
        const blogsRef = collection(db, "categories", categoryDoc.id, "blogs");
        const blogDoc = await getDoc(doc(blogsRef, id));

        if (blogDoc.exists()) {
          foundBlog = blogDoc.data();
          blogCategory = categoryDoc.id;
          break;
        }
      }

      if (foundBlog) {
        setBlog(foundBlog);
        setLikes(foundBlog.likes || 0);
        
        // Fetch related blogs
        const relatedRef = collection(db, "categories", blogCategory, "blogs");
        const relatedSnap = await getDocs(relatedRef);
        const relatedPosts = relatedSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((post) => post.id !== id);

        setRelatedBlogs(relatedPosts);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) return <p className="text-center text-2xl py-10">Loading...</p>;

  return (
    <div className={`max-w-4xl mx-auto px-6 py-10 mt-20 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className="text-5xl font-bold text-center">{blog.title}</h1>
      <p className="text-gray-500 text-center mt-2">{blog.date} • {blog.author}</p>

      {blog.images && blog.images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {blog.images.map((img, index) => (
            <Image key={index} src={img} alt={`Blog Image ${index}`} width={600} height={400} className="rounded-lg shadow-lg" />
          ))}
        </div>
      )}

      <p className="mt-6 text-lg leading-relaxed">{blog.content}</p>

      {/* Like Button */}
      <div className="flex items-center space-x-3 mt-6">
        <button className="text-gray-500 hover:text-blue-500 transition">
          {likes ? <FaThumbsUp className="text-blue-500" /> : <FaRegThumbsUp />}
        </button>
        <span className="text-lg">{likes}</span>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedBlogs.map((post) => (
              <div key={post.id} className={`rounded-lg shadow-lg overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.date} • {post.author}</p>
                  <button onClick={() => window.location.href = `/blogs/${post.id}`} className="mt-3 text-blue-500">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
