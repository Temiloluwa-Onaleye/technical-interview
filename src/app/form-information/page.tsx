"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

export default function FormInformation() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("Posts") || "[]");
    setPosts(storedPosts);
  }, []);

  const handleDelete = (id: string) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("Posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="container mx-auto max-w-[700px] my-6 p-4">
      <h1 className="text-2xl font-bold mb-4">Form Information</h1>
      <button
        onClick={() => router.push("/form")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Back to Form
      </button>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post?.id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              <p className="text-gray-700">{post?.content}</p>
              <p className="text-sm text-gray-500">ID: {post?.id}</p>
              <p className="text-sm text-gray-500">
                Created at: {new Date(post?.timestamp).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(post.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
