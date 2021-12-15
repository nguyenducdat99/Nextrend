import React from "react";
import RequestAQuotePopUp from "../../../common/RequestAQuotePopUp";
import "./styles.scss";

function TopHeader({ onHandleModal, showRequestAQuote, width }) {
  return (
    <div className='container-fluid header__top'>
      <div className='container'>
        <div className='row justify-content-between align-items-center'>
          <a className='header-top-left' href={`tel:+1300 559 965`}>
            1300 559 965 -{" "}
            <span className='header-top-left__side-right'>
              Servicing Australia Wide
            </span>
          </a>
          <button
            type='button'
            className='header-top-right d-flex justify-content-center align-items-center'
            onClick={() =>
              onHandleModal({
                type: "OPEN_MODAL",
                payload: "request-quote",
              })
            }
          >
            <p>REQUEST A QUOTE</p>
          </button>
          <RequestAQuotePopUp
            showRequestAQuote={showRequestAQuote}
            handleCloseModal={onHandleModal}
            width={width}
          />
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
