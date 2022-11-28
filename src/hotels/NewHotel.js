import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Autocomplete from "react-google-autocomplete";
import { publicKeyMap } from "../environment";
import { createHotel } from "../actions/hotel";
import { DatePicker, Select } from "antd";
import moment from "moment";

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

    let res = await createHotel(token, hotelData);
    console.log(res);
    toast.success("New hotel created");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleImageChange = async (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-secondary btn-block m-2 w-25 text-left'>
          Image
          <input
            type='file'
            name='image'
            onChange={handleImageChange}
            accept='image/*'
            hidden
          />
        </label>

        <input
          type='text'
          name='title'
          onChange={handleChange}
          placeholder='Title'
          className='form-control m-2'
          value={title}
        />

        <textarea
          name='content'
          onChange={handleChange}
          placeholder='Content'
          className='form-control m-2'
          value={content}
        />

        <Autocomplete
          className='form-control m-2'
          placeholder='Location'
          defaultValue={location}
          apiKey={publicKeyMap}
          onPlaceSelected={(place) => {
            setLocation(place.formatted_address);
          }}
          style={{ height: "50px" }}
        />

        <input
          type='number'
          name='price'
          onChange={handleChange}
          placeholder='Price'
          className='form-control m-2'
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className='w-100 m-2'
          size='large'
          placeholder='Beds'
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>

      <DatePicker
        placeholder='From'
        className='form-control m-2'
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <DatePicker
        placeholder='To'
        className='form-control m-2'
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <button className='btn btn-outline-primary m-2 w-100'>Save</button>
    </form>
  );

  return (
    <>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2>Add Hotel</h2>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-10'>
            <br />
            {hotelForm()}
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
