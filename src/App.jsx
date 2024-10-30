import { useEffect, useState } from "react";

import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  console.log(searchData);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    if (value === "") return setSearchData([]);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
 
      setSearchData(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
        // Add more URLs here...
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const fetchMovies = async (url) => {
        return await fetch(url, options).then((response) => response.json());
      };

      try {
        const response = await Promise.all(urls.map(fetchMovies));

        setTrendingMovies(response[0].results);
        setTopRatedMovies(response[1].results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const fetchMovie = async () => {
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  //       }
  //   };
  //   const url_1 = "https://api.themoviedb.org/3/trending/movie/day?language=vi";
  //   const url_2 =  "https://api.themoviedb.org/3/movie/top_rated?language=vi";

  //   const response_1 = await fetch(url_1, options);
  //   const response_2 = await fetch(url_2, options);

  //   const data_1 = await response_1.json();
  //   const data_2 = await response_2.json();

  //   setTrendingMovies(data_1.results);
  //   setTopRatedMovies(data_2.results);

  // }
  // fetchMovie();
  // }, []);
  // cách này xem để hiểu cách fetch api

  return (
    <>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 realative">
          <Header onSearch={handleSearch} />
          <Banner />
          {searchData.length === 0 && (
            <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
          )}
          {searchData.length === 0 && (
            <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          )}

          {searchData.length > 0 && <MovieSearch data={searchData} />}
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
