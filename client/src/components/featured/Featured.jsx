import axios from 'axios';
import { useEffect, useState } from 'react';
import './featured.scss';
import { Link } from 'react-router-dom';
import constructUrl from '../../authContext/ConstructUrl';
import {
  PlayArrow,
  InfoOutlined,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';

export default function Featured({ type, setGenre }) {
  const [isOpenInfos, setIsOpenInfos] = useState(false);
  const [content, setContent] = useState({});
  const [defaultType, setDefaultType] = useState('');
  /*const interfaceAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  */

  useEffect(() => {
    const getRandomContent = async () => {
      if (!type) {
        setDefaultType('movies');
      } else {
        setDefaultType(type);
      }
      try {
        console.log(
          'new random movies url >> ',
          constructUrl(`movies/random?type=${defaultType}`)
        );
        const res = await axios.get(
          constructUrl(`movies/random?type=${defaultType}`),
          {
            headers: {
              token:
                'Bearer ' +
                JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        );
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type, defaultType]);
  const openInfos = () => {
    setIsOpenInfos(!isOpenInfos);
    console.log('click open info');
  };
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <Link to={{ pathname: '/watch', movie: content }}>
              <PlayArrow />
              <span>Play</span>
            </Link>
          </button>
          <button className="more" onClick={openInfos}>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
      {isOpenInfos && (
        <div className="bigInfos">
          <video src={content.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{content.duration}</span>
              <span className="limit">+{content.limit}</span>
              <span>{content.year}</span>
            </div>
            <div className="desc">{content.desc}</div>
            <div className="genre">{content.genre}</div>
          </div>
        </div>
      )}
    </div>
  );
}
