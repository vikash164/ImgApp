import React, { useState, useEffect } from "react";
import "./homepage.css";
import Modal from "react-bootstrap/Modal";
import astronautHeader from "../../img/astronoimg.jpg";

const My_Key_NASA = "3PVomsvKGw5CkxFwyOMKCPNA4fASj1ulMj2NUHtU";

function Homepage({ setLoginUser }) {
  const [show, setShow] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    async function fetchPhotoDay() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${My_Key_NASA}`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
    fetchPhotoDay();
  }, []);

  if (!photoData) {
    return <div />;
  }

  return (
    <div className="homepage">
      <h1>Day Of Picture</h1>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton variant="primary" className="Modal-Info">
          <Modal.Title id="example-custom-modal-styling-title" className="Modal-Info">
            Photo of the day <img src={astronautHeader} alt="Astronaut" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Modal-Info">
          <p className="Modal-Info">
            This section shows an image every day the image is updated
          </p>
        </Modal.Body>
      </Modal>

      <div>
        <h1 className="date">{photoData.date}</h1>
        <div className="Photo_Day">
          {photoData.media_type === "image" ? (
            <img src={photoData.url} alt={photoData.title} className="photo" />
          ) : (
            <iframe
              title="space-video"
              src={photoData.url}
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
              className="photo"
            />
          )}
        </div>
        <div>
          <h1>{photoData.title}</h1>
          <br />
          <p className="explanation">{photoData.explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
