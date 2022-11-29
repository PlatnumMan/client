import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { read, diffDays } from "../actions/hotel";
import { apiUrl } from "../environment";
import moment from "moment";

const ViewHotel = () => {
  const params = useParams();

  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState({});

  useEffect(() => {
    loadSellersHotel();
  }, []);

  const { hotelId } = params;
  const loadSellersHotel = async () => {
    let res = await read(hotelId);
    setHotel(res.data);
    setImage(`${apiUrl}/hotel/image/${res.data._id}`);
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
            <button className='btn btn-block btn-lg btn-primary mt-3'>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
