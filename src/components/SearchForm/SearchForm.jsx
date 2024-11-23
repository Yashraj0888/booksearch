import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import "./SearchForm.css";
import { useGlobalContext } from '../../context.';
// import { useGlobalContext } from '../../context';

const SearchForm = () => {
  const { setSearchParams } = useGlobalContext();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
 const [subject, setSubject] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if any field has a value
    setIsDisabled(!(title || author || subject));
  }, [title, author, subject]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim input values
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    const trimmedSubject = subject.trim();

 
    const searchParams = {};
    if (trimmedTitle) searchParams.title = trimmedTitle;
    if (trimmedAuthor) searchParams.author = trimmedAuthor;
    if (trimmedSubject) searchParams.subject = trimmedSubject;

    setSearchParams(searchParams); // Set search params to global context
    navigate("/book"); // Navigate to search result page
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input
                type="text"
                className='form-control'
                placeholder='Title (e.g., The Lost World)'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className='form-control'
                placeholder='Author (e.g., Arthur Conan Doyle)'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="text"
                className='form-control'
                placeholder='Genre (e.g., Adventure)'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <button
                type="submit"
                className={`flex flex-c ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isDisabled}
              >
                <FaSearch size={32} /> {/* Adjust size for the icon */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
