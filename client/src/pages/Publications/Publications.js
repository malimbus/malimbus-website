
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';

import styles from './Publications.module.css';
import SearchByYear from './SearchByYear';
import Card from './Card';

import {
  getPublications,
  getPostsBySearch
} from '../../actions/posts';
import { getProfiles } from '../../actions/profile';

const Publications = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Search and pagination state
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [user, setUser] = useState({});

  // Redux data
  const {
    posts = [],
    numberOfPages = 1,
    isLoading = false
  } = useSelector((state) => state.posts);

  const { profiles = [] } = useSelector(
    (state) => state.profiles
  );

  const totalPages = Math.max(
    1,
    Number(numberOfPages) || 1
  );

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index
  );

  // Load member profiles
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  // Load publications when not searching
  useEffect(() => {
    if (!isSearching) {
      dispatch(getPublications(pageNumber));
    }
  }, [dispatch, pageNumber, isSearching]);

  // Retrieve logged-in user
  useEffect(() => {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem('profile')
      );

      setUser(currentUser || {});
    } catch (error) {
      setUser({});
    }
  }, [location]);

  // Pagination controls
  const gotoPrevious = () => {
    setPageNumber((currentPage) =>
      Math.max(0, currentPage - 1)
    );
  };

  const gotoNext = () => {
    setPageNumber((currentPage) =>
      Math.min(totalPages - 1, currentPage + 1)
    );
  };

  // Match publication authors with member profiles
  const nameEmailMap = profiles.reduce(
    (acc, { name, email, userId, profilePicture }) => {
      if (email) {
        acc[email] = {
          name,
          userId,
          profilePicture
        };
      }

      return acc;
    },
    {}
  );

  // Filter publication records
  const publicationPosts = posts.filter(
    (post) => post.postType === 'publication'
  );

  // Prepare publications for Card component
  const articles = publicationPosts.map(({
    title,
    content,
    doi,
    year: publicationYear,
    _id,
    author,
    avatar,
    authors,
    userId,
    journal,
    slug,
    volume,
    page,
    fileUrl,
    createdAt
  }) => ({
    title,
    content,
    _id,
    doi,
    year: publicationYear,
    author,
    avatar,
    userId,
    journal,
    slug,
    volume,
    page,
    fileUrl,
    createdAt,

    authors: (Array.isArray(authors) ? authors : []).map(
      (entry) =>
        nameEmailMap[entry]
          ? { ...nameEmailMap[entry] }
          : { name: entry }
    )
  }));

  // Search publications
  const searchPost = (yearOverride) => {
  const searchText = search.trim();

  const selectedYear =
    typeof yearOverride === 'string'
      ? yearOverride.trim()
      : String(year || '').trim();

  if (searchText || selectedYear) {
    setIsSearching(true);

    dispatch(
      getPostsBySearch({
        search: searchText,
        year: selectedYear
      })
    );
  } else {
    clearSearch();
  }
};

  // Clear search and restore all publications
  const clearSearch = () => {
    setSearch('');
    setYear('');
    setIsSearching(false);
    setPageNumber(0);

    // If an active search is cleared, the effect
    // automatically reloads the first page.
    // If no search is active and page is already 0,
    // reload it directly.
    if (!isSearching && pageNumber === 0) {
      dispatch(getPublications(0));
    }
  };

  // Search when Enter is pressed
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchPost();
    }
  };

  return (
    <div>
      {/* Publication cover image */}
      <div className={styles.coverImg}>
        <img
          className={styles.img}
          src="https://res.cloudinary.com/wabis/image/upload/v1634134538/malimbus-special/Ibadan-Malimbe_eqy0sf.jpg"
          alt="Publications"
        />
      </div>

      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.topic}>
            <h1
              style={{
                padding: '40px',
                fontSize: '60px'
              }}
            >
              Publications
            </h1>

            <div>
              <p
                style={{
                  color: 'black',
                  paddingBottom: '20px'
                }}
              >
                Search and download full texts of previous publications
              </p>
            </div>

            {/* Subscription button */}
            {!user?.result?.isSubscriber && (
              <Link to="/auth">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ backgroundColor: 'green' }}
                  startIcon={<LockIcon />}
                >
                  Subscribe to access recent Publications
                </Button>
              </Link>
            )}
          </div>

          {/* Publication search bar */}
          <div className={styles.searchBar}>
            <input
              type="text"
              value={search}
              onKeyDown={handleKeyPress}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by author, title or keyword"
              aria-label="Search publications"
            />

            <button
              type="button"
              onClick={() => searchPost()}
            >
              Search
            </button>
          </div>

          {/* Clear search button */}
          {(search || year || isSearching) && (
            <div style={{ marginTop: '10px' }}>
              <button
                type="button"
                onClick={clearSearch}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #3e6947',
                  borderRadius: '25px',
                  backgroundColor: 'white',
                  color: '#3e6947',
                  cursor: 'pointer'
                }}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Search by publication year */}
          <div>
            <SearchByYear
              year={year}
              setYear={setYear}
              searchPost={searchPost}
            />
          </div>
        </div>

        {/* Publication results */}
        {isLoading ? (
          <p
            style={{
              textAlign: 'center',
              padding: '30px',
              color: '#555'
            }}
          >
            Loading publications...
          </p>
        ) : (
          <div className={styles.cardContainer}>
            {articles.length > 0 ? (
              articles.map((pub) => (
                <Card
                  key={pub._id}
                  pub={pub}
                />
              ))
            ) : (
              <p
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  color: '#555'
                }}
              >
                {isSearching
                  ? 'No publications found matching your search.'
                  : 'No publications available.'}
              </p>
            )}
          </div>
        )}

        {/* Pagination is hidden during searches */}
        {!isSearching && totalPages > 1 && (
          <div className={styles.pagination}>
            <IconButton
              onClick={gotoPrevious}
              disabled={pageNumber === 0}
              aria-label="Previous page"
            >
              <FirstPageIcon />
            </IconButton>

            {pages.map((pageIndex) => (
              <button
                className={styles.pageNum}
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex)}
                disabled={pageNumber === pageIndex}
              >
                {pageIndex + 1}
              </button>
            ))}

            <IconButton
              onClick={gotoNext}
              disabled={pageNumber >= totalPages - 1}
              aria-label="Next page"
            >
              <LastPageIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
