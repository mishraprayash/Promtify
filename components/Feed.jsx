"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [search, setSearch] = useState("");
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          required
          className="search_input peer"
        />
        <button className="cursor-pointer ml-2 transition-transform duration-500 ease-in-out hover:scale-105 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 50"
            width="40px"
            height="40px"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
          </svg>
        </button>
      </form>
      <div className="mt-16 prompt_layout">
        {/* implementation of live search by a tagname or a username  using filtering method*/}
        {prompts
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.tag.toLowerCase().includes(search) || item.creator.username.toLowerCase().includes(search);
          })
          .map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
      </div>
    </section>
  );
};

export default Feed;
