import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import toast from "react-hot-toast";
import Autocomplete from "react-google-autocomplete";
import { read } from "../actions/hotel";
import { apiUrl } from "../environment";
import HotelEditForm from "../components/forms/HotelEditForm";

const { Option } = Select;

const EditHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const { title, content, location, image, price, from, to, bed } = values;

  const params = useParams();

  useEffect(() => {
    loadSellersHotel();
  }, []);

  const loadSellersHotel = async () => {
    const { hotelId } = params;
    let res = await read(hotelId);
    setValues({ ...values, ...res.data });
    setPreview(`${apiUrl}/hotel/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    e.preventDefault();
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  return (
    <>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2>Edit Hotel</h2>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-10'>
            <br />
            <HotelEditForm
              values={values}
              setValues={setValues}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              location={location}
            />
          </div>
          <div className='col-md-2'>
            <img
              src={preview}
              alt='image_preview'
              className='img img-fluid m-2'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
