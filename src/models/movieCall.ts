import Movie from "./movie";

export default interface MovieCall {
  page: number,
  results: Movie[],
  total_pages: number
}