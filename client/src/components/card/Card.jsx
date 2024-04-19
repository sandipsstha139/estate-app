import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "./card.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from '../../lib/apiRequest';

function Card({ item }) {
  const post = useLoaderData();
  console.log(post);
  console.log(item);
  const [saved, setSaved] = useState(item.isSaved);
  const { currentUser } = useContext(AuthContext);
  // console.log(post);

  const navigate = useNavigate();

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.post("/users/save", { postId: item.id});
    } catch (err) {
      console.log(err);

      setSaved((prev) => !prev);
    }
  };
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img
          src={
            item.images[0] ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjmShM7-kNHf5kT6L2xWZDEJkXZ456TfFWyO49MJePmA&s"
          }
          alt=""
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
              <div className="icon">
                <img src="/save.png" alt="" onClick={handleSave} style={{backgroundColor: saved ? 'yellow' : 'white'}} />
              </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
