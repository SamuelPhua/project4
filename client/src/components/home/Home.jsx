import Featured from "../featured/Featured";
import NavBar from "../navbar/NavBar";
import List from "../list/List";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

//"proxy": "http://localhost:5001/api/"
//"proxy": "http://127.0.0.1:5001/api/"

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRkNjMzNDQ3NjYzOGFjOTY3NWQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NzY0NzE0NCwiZXhwIjoxNjc4MDc5MTQ0LCJqdGkiOiI4NDhmZWJmOC1lMTgzLTRlNzQtODZhNS1hYzJkZDVlNzNmYWEifQ.zmc4CvVjV4POhPuIVsFkzw7o2KX5Y-EYwcQ0_t_XpGs",
              // "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        );
        console.log(res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <NavBar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
