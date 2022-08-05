import { useState, useEffect } from "react";
import { getPhotosPage } from "../api/axios";

export interface PhotosList {
  alt_description: string;
  likes: number;
  user: {
    name: string;
    portfolio_url: string;
    profile_image: {
      medium: string;
    };
  };
  urls: {
    regular: string;
  };
}

export interface QueryList {
  results: PhotosList[];
}

export interface ErrorMsg {
  message: string;
}

const usePhotos = (page = 1, query: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<PhotosList[]>([]);
  const [error, setError] = useState<ErrorMsg>();
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError({} as any);
    setIsError(false);

    const controller = new AbortController();
    const { signal } = controller;

    getPhotosPage(page, query, { signal })
      .then((data) => {
        setPhotos((prevPhotos) => {
          if (!Array.isArray(data) && page === 1) {
            return data.results;
          } else if (Array.isArray(data)) {
            setHasNextPage(Boolean(data.length));
            return [...prevPhotos, ...data];
          } else {
            setHasNextPage(Boolean(data.results.length));
            return [...prevPhotos, ...data.results];
          }
        });

        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: err.message });
      });

    return () => controller.abort();
  }, [page, query]);

  return { loading, photos, error, isError, hasNextPage };
};

export default usePhotos;
