import './App.css'
import { URL } from './API/URL';
import { useEffect, useState } from 'react';

function App() {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [japaneseTitle, setJapaneseTitle] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const getAnimePicture = async () => {
    const chooseRandomAnime = Math.floor(Math.random() * 100);
    const response = await fetch(`${URL}${chooseRandomAnime}/full`);
    const data = (await response.json()).data;
    console.log(data, data.trailer.url);
    setTitle(data.title);
    setJapaneseTitle(data.title_japanese);
    setPicture(data.images.jpg.large_image_url);
    setEpisodes(data.episodes);
    setSynopsis(data.synopsis);
    setVideoUrl(`https://www.youtube.com/embed/${data.trailer.youtube_id}`);
  }

  useEffect(() => {
    getAnimePicture();
  }, [])

  return (
    <>
      <div className='card'>
        <img src={picture} alt="Example" />
        <div className='titles'>
          <h1>{title}</h1>
          <h3>{japaneseTitle}</h3>
        </div>
        <div className='other_infos'>
          <h4>Episodes: {episodes}</h4>
          <p>{synopsis}</p>
          <iframe src={videoUrl} className='video'></iframe>
        </div>
      </div>
    </>
  )
}

export default App
