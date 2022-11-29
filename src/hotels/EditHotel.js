import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import toast from "react-hot-toast";
import Autocomplete from "react-google-autocomplete";
import { read, updateHotel } from "../actions/hotel";
import { apiUrl } from "../environment";
import HotelEditForm from "../components/forms/HotelEditForm";

const { Option } = Select;

const EditHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    content: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const { title, content, location, price, from, to, bed } = values;

  const params = useParams();

  useEffect(() => {
    loadSellersHotel();
  }, []);

  const { hotelId } = params;
  const loadSellersHotel = async () => {
    let res = await read(hotelId);
    setValues({ ...values, ...res.data });
    setPreview(`${apiUrl}/hotel/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    console.log([...hotelData]);

    try {
      let res = await updateHotel(token, hotelData, hotelId);
      console.log(res);
      toast.success(`"${res.data.title}" updated`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    e.preventDefault();
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
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
