import Autocomplete from "react-google-autocomplete";
import { publicKeyMap } from "../../environment";
import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const HotelCreateForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
  location,
  setLocation,
}) => {
  const { title, content, price } = values;
  return (
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
};

export default HotelCreateForm;
