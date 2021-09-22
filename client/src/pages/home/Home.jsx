import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import './home.scss';
import List from '../../components/list/List';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  /*const interfaceAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  */

  useEffect(() => {
    const getRandomLists = async () => {
      var t = type ? '?type=' + type : '?type=';
      var g = genre ? '&genre=' + genre : '&genre=';
      console.log('type generate :', t, '  genre  : ', g);
      var url = `lists${t}${g}`;
      try {
        const res = await axios.get(url, {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        setLists(res.data);
        console.log('setList : ', res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, index) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
