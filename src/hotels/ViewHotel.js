import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, diffDays } from "../actions/hotel";
import { apiUrl } from "../environment";
import moment from "moment";
import { useSelector } from "react-redux";

const ViewHotel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellersHotel();
  }, []);

  const { hotelId } = params;
  const loadSellersHotel = async () => {
    let res = await read(hotelId);
    setHotel(res.data);
    setImage(`${apiUrl}/hotel/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!auth) navigate("/login");
    // TODO: handle click 
    console.log("get session data");
  };

  return (
    <>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2>{hotel.title}</h2>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <br />
            <img src={image} alt={hotel.title} className='img img-fluid m-2' />
          </div>

          <div className='col-md-6'>
            <br />
            <p>{hotel.content}</p>
            <p className='alert alert-info mt-3'>${hotel.price}</p>
            <p className='card-text'>
              <span className='float-right text-primary'>
                For {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.frootelm, hotel.to) <= 1 ? "day" : "days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMM Do YYYY h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMM Do YYYY h:mm:ss a")}
            </p>
            <p>{hotel.location}</p>
            <i>Posed by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className='btn btn-block btn-lg btn-primary mt-3'
            >
              {auth && auth.token ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
