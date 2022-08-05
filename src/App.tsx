import React, { useState, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import usePhotos from "./hooks/usePhotos";

function App() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const { loading, isError, error, photos, hasNextPage } = usePhotos(
    page,
    query
  );

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastPhotoRef = useCallback(
    (photo: any) => {
      if (loading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("we are near the last post");
          setPage((oldPage) => {
            return oldPage + 1;
          });
        }
      });
      if (photo) intObserver.current.observe(photo);
    },
    [loading, hasNextPage]
  );

  if (isError) return <p>Error: {error?.message}</p>;

  const content = photos.map((image, index) => {
    if (photos.length === index + 1) {
      return <Photo ref={lastPhotoRef} key={index} {...image} />;
    }
    return <Photo key={index} {...image} />;
  });
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">{content}</div>
        {/* loading */}
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
