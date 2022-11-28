import { Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import SmallCard from "../components/cards/SmallCard";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { sellerHotels } from "../actions/hotel";
import { useState, useEffect } from "react";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState("");

  useEffect(() => {
    const loadSellersHotels = async () => {
      let res = await sellerHotels(auth.token);
      setHotels(res.data);
    };

    loadSellersHotels();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again");
      setLoading(false);
    }
  };

  let dataArr = Array.from(hotels);

  const connected = () => (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-10'>
          <h2>Your Hotels</h2>
        </div>
        <div className='col-md-2'>
          <Link to={`/hotels/new`} className='btn btn-primary'>
            + Add New
          </Link>
        </div>
      </div>

      <div className='row'>
        {dataArr.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
  const notConnected = () => (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-center'>
          <div className='pointer'>
            <HomeOutlined className='h1' />
            <h4>Set up payments to begin adding hotels.</h4>
            <p className='lead'>
              MERN and Stripe collaborate to transfer profits to your bank
              account.
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className='btn btn-primary mb-3'
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className='text-muted'>
              <small>
                You will be directed to Stripe to finish the onboarding process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='container-fluid bg-secondary p-5'>
        <ConnectNav />
      </div>

      <div className='container-fluid p-4'>
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
