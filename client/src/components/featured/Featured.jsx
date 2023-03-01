import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";

const Featured = ({ type }) => {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure"></option>
            <option value="animation"></option>
            <option value="comedy"></option>
            <option value="crime"></option>
            <option value="documentary"></option>
            <option value="drama"></option>
            <option value="fantasy"></option>
            <option value="historical"></option>
            <option value="horror"></option>
            <option value="romance"></option>
            <option value="sci-fi"></option>
            <option value="thriller"></option>
            <option value="western"></option>
          </select>
        </div>
      )}
      <div className="info">
        <span className="desc">hello</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
