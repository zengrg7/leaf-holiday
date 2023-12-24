import React, { useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Button from "react-bootstrap/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const BookingCard = ({ price }) => {
  const [showGroupPrice, setShowGroupPrice] = useState(false);
  const currentDate = new Date().toDateString();
  const [formData, setFormData] = useState({
    tripDate: dayjs(currentDate).format("ddd MMM DD, YYYY"),
    noOfGuests: 1,
    total: price,
  });

  const bookingDetail = {
    groupPrice: [
      {
        id: 1,
        maxNoOfPeople: 1,
        peopleRange: "1 - 1",
        price: 799,
      },
      {
        id: 2,
        maxNoOfPeople: 2,
        peopleRange: "2 - 2",
        price: 699,
      },
      {
        id: 3,
        maxNoOfPeople: 7,
        peopleRange: "3 - 7",
        price: 599,
      },
      {
        id: 4,
        maxNoOfPeople: 15,
        peopleRange: "8 - 15",
        price: 499,
      },
      {
        id: 5,
        maxNoOfPeople: 30,
        peopleRange: "16 - 30",
        price: 375,
      },
    ],
  };

  const priceCalculator = (priceRange, guestNumber) => {
    for (let i = 0; i < priceRange.length; i++) {
      if (guestNumber <= priceRange[i].maxNoOfPeople) {
        return priceRange[i].price;
      }
    }
  };
  return (
    <div className="sticky-top">
      <div className="d-flex booking-card-price-header">
        {/* <LocalOfferIcon /> */}
        <AttachMoneyIcon />
        <div>
          <p className="price-title m-0">Price Per Person</p>
          <p className="price-amount m-0">
            US ${priceCalculator(bookingDetail.groupPrice, formData.noOfGuests)}
          </p>
        </div>
      </div>
      <div className="booking-card-body mb-2">
        <div
          className="d-flex align-items-center mb-1"
          style={{ position: "relative" }}
        >
          <Button
            variant="light"
            size="sm"
            onClick={() => setShowGroupPrice(!showGroupPrice)}
            className="d-flex justify-content-between gap-5 w-100"
          >
            <p className="m-0">We Offer Group Prices</p>
            <ArrowDropDownIcon />
          </Button>
        </div>
        <div
          className={`${showGroupPrice ? "" : "d-none"} group-price-dropdown`}
        >
          <ul className="p-0 m-0">
            <li className="d-flex justify-content-between align-items-center">
              <p className="fs-14">No. of People</p>
              <p className="fs-14">Price per Person</p>
            </li>
            {bookingDetail.groupPrice.map((item) => (
              <li
                key={item.id}
                className="d-flex justify-content-between align-items-center fs-14"
              >
                <p>{item.peopleRange}</p>
                <p>US$ {item.price}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-light booking-card-inner-body">
          <div className="d-flex">
            <CalendarMonthIcon />
            <h6>Select Date</h6>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tripDate: dayjs(e).format("ddd MMM DD, YYYY"),
                  })
                }
                defaultValue={dayjs(formData.tripDate)}
              />
            </LocalizationProvider>
          </div>
          <div>
            <a
              href="#date-price"
              className="fs-14 text-theme-secondary text-decoration-none"
            >
              Or View Our Fixed Departure Dates
            </a>
          </div>
          <div>
            <p>No. of Guests</p>
            <input
              min={1}
              max={30}
              placeholder={0}
              type={"Number"}
              value={formData.noOfGuests}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  noOfGuests: e.target.value,
                  total:
                    priceCalculator(bookingDetail.groupPrice, e.target.value) *
                    e.target.value,
                });
              }}
            />
            <span className="d-flex justify-content-between ">
              <p>{`$${priceCalculator(
                bookingDetail.groupPrice,
                formData.noOfGuests
              )} x ${formData.noOfGuests}`}</p>
              <p>{formData.total}</p>
            </span>
            <span className="d-flex justify-content-between ">
              <p>Total</p>
              <p>{formData.total}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 flex-column">
        <div className="d-flex gap-2">
          <Button variant="success" className="w-100">
            Book Now
          </Button>
          <Button variant="success" className="w-100">
            Send Inquiry
          </Button>
        </div>
        <Button className="btn btn-theme-secondary w-100">
          Customize Trip
        </Button>
        <Button
          className="d-flex justify-content-center align-items-center gap-2"
          variant="success"
        >
          <PictureAsPdfIcon fontSize="large" />
          <p className="m-0">Download PDF</p>
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
