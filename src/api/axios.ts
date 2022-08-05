import axios from "axios";
import { PhotosList, QueryList } from "../hooks/usePhotos"
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

export const api = axios.create({
  baseURL: "https://api.unsplash.com/"
})

export const getPhotosPage = async (page = 1, query: string = "", options = {}): Promise<PhotosList[] | QueryList> => {
  let url: string;
  const urlPage = `&page=${page}`;
  const urlQuery = `&query=${query}`
  const mainUrl = "photos/"
  const searchUrl = "search/photos/"

  if (query) {
    url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
  } else {
    url = `${mainUrl}${clientID}${urlPage}`;
  }


  const response = await api.get(url, options)
  const data: PhotosList[] | QueryList = response.data
  return data
}

