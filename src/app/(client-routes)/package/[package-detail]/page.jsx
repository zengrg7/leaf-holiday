"use client";

import { packageNavItems, pkgDetail } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import MapIcon from "@mui/icons-material/Map";
import BookingCard from "@/components/BookingCard";
import { CalendarMonth } from "@mui/icons-material";
import SelectComponent from "@/components/FormElements/SelectComponent";
import DateTable from "@/components/DateTable";
import { Container } from "react-bootstrap";

const PackageDetail = () => {
  const [showItineraryDetails, setShowItineraryDetails] = useState({});
  const [expandOrCollapse, setExpandOrCollapse] = useState(false);
  const [showCostInclude, setShowConstInclude] = useState(true);

  useEffect(() => {
    if (
      Object.keys(showItineraryDetails).length === pkgDetail.itinerary.length
    ) {
      setExpandOrCollapse(
        Object.values(showItineraryDetails).every((value) => value)
      );
    }
  }, [showItineraryDetails]);

  const handleToggle = (id) => {
    setShowItineraryDetails((prevShowItineraryDetails) => ({
      ...prevShowItineraryDetails,
      [id]: !prevShowItineraryDetails[id],
    }));
  };

  const handleExpandCollapse = () => {
    pkgDetail.itinerary.map((item) =>
      setShowItineraryDetails((prevShowItineraryDetails) => ({
        ...prevShowItineraryDetails,
        [item.id]: expandOrCollapse ? false : true,
      }))
    );
  };

  return (
    <div className="main-div">
      <div>
        <Image
          src={pkgDetail.headerImage}
          width={1519}
          height={800}
          alt="header image"
        />
        <div className="container d-flex justify-content-between ">
          <h1 className="single-trip-title">{pkgDetail.headerTitle}</h1>
          <div className="">
            <Button>Book Now</Button>
            <Button>Send Inquiry</Button>
          </div>
        </div>
      </div>

      <Container className="single-trip">
        <div className="bg-white d-flex gap-5 single-trip-nav">
          {packageNavItems.map((item) => (
            <a key={item.id} href={item.path}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="row content-div">
          <div className="col-9 pt-3">
            <div className="row d-flex gap-5 trip-fact my-4">
              {pkgDetail.packageInformation.map((item) => (
                <div key={item.id} className="col d-flex">
                  <div className="trip-fact-icon">{item.icon}</div>
                  <div>
                    <p className="trip-fact-title m-0 text-muted">
                      {item.label}
                    </p>
                    <p className="trip-fact-detail m-0">{item.information}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="title">{pkgDetail.overviewTitle}</h4>
              <p>{pkgDetail.overviewContent}</p>
              <Button size="sm" variant="success">
                Read More
              </Button>
            </div>
            <div className="mt-5">
              <div className="d-flex justify-content-between mb-3">
                <h4 className="title">
                  <ModeOfTravelIcon />
                  Itinerary
                </h4>
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleExpandCollapse}
                >
                  {expandOrCollapse ? "Collapse All -" : "Expand All +"}
                </Button>
              </div>
              <div className="d-flex gap-3 flex-column">
                {pkgDetail.itinerary.map((item) => (
                  <div key={item.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="d-flex align-items-center gap-2">
                        <span className="text-success">
                          <LocationOnIcon />
                        </span>
                        <p className="m-0 itinerary-title text-success">
                          {item.title}
                        </p>
                      </span>

                      <Button
                        variant="success"
                        size="sm"
                        className="itinerary-expand-btn"
                        onClick={() => handleToggle(item.id)}
                      >
                        {showItineraryDetails[item.id] ? "-" : "+"}
                      </Button>
                    </div>
                    <p
                      className={`${
                        showItineraryDetails[item.id] ? "" : "d-none "
                      }`}
                    >
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
              <div className="cost-IE-container mt-5">
                <div className="cost-IE-header d-flex align-items-center gap-2">
                  <Button
                    variant="success"
                    size="sm"
                    className="d-flex align-items-center"
                    onClick={() => setShowConstInclude(true)}
                  >
                    <span className="me-1">
                      <CheckCircleOutlineIcon fontSize="small" />
                    </span>
                    Cost Include
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="d-flex align-items-center"
                    onClick={() => setShowConstInclude(false)}
                  >
                    <span className="me-1">
                      <CancelIcon fontSize="small" />
                    </span>
                    Cost Exclude
                  </Button>
                </div>
                <div className="const-IE-content mt-1 mt-md-3">
                  <ul>
                    {showCostInclude
                      ? pkgDetail.costInclude.map((item) => (
                          <li key={item.id}>{item.content}</li>
                        ))
                      : pkgDetail.costExclude.map((item) => (
                          <li key={item.id}>{item.content}</li>
                        ))}
                  </ul>
                </div>
              </div>
              <div className="map-container mt-5">
                <h4 className="title">
                  <MapIcon />
                  Trip Map
                </h4>
                <div className="map-image">
                  <Image
                    src={pkgDetail.mapImage}
                    width={611}
                    height={897}
                    alt="map"
                  />
                </div>
              </div>
              <div className="date-price-container mt-5" id="date-price">
                <h4 className="title">
                  <CalendarMonth />
                  Dates & Price
                </h4>
                <div className="mb-3">
                  <SelectComponent
                    options={[
                      { id: 1, label: "June 2023" },
                      { id: 2, label: "July 2023" },
                    ]}
                  />
                </div>
                <DateTable />
              </div>
            </div>
          </div>
          <div className="col-3 booking-card">
            <BookingCard price={1290} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PackageDetail;
