import { Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createHotel } from "../actions/hotel";
import HotelCreateForm from "../components/forms/HotelCreateForm";

const { Option } = Select;

const NewHotel = () => {
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

  const [location, setLocation] = useState("");
  const { title, content, image, price, from, to, bed } = values;

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
      let res = await createHotel(token, hotelData);
      console.log(res);
      toast.success("New hotel created");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = async (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2>Add Hotel</h2>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-10'>
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className='col-md-2'>
            <img
              src={preview}
              alt='image_preview'
              className='img img-fluid m-2'
            />
            <pre>{JSON.stringify(location, null, 4)}</pre>
            Image <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
