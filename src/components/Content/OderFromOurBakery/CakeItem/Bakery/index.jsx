import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Bakery.css";
import Ads from "../../../../Ads";
import { CartContext } from "../../../../../context/CartApp";
import { addCakeToCart } from "../../../../../services/Redux/cartSlice";
import { useDispatch } from "react-redux";
function Bakery(props) {
  const param = useParams();
  const { listCake } = props;
  // const { addCakeToCart } = useContext(CartContext);
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [priceOp, setPriceOp] = useState(0);
  const [active, setActive] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    const findCake = listCake.find((cake) => cake.id == param.cakeId);

    setPriceOp(findCake.price);
    setImages([findCake.image, findCake.image1, findCake.image2, findCake.image3]);
    setData(findCake);
  }, []);

  useEffect(() => {
    if (images.length == 0) {
      return;
    }
    imageSlider(document.querySelector(".image-slider"), images);
  }, [images]);

  function imageSlider(parent, images) {
    let currentImage = 0;
    let slider = {
      parent: parent,
      images: parent.querySelector(".images"),
      thumbnails: parent.querySelector(".thumbnails"),
      backBtn: parent.querySelector(".back-btn"),
      nextBtn: parent.querySelector(".next-btn"),
    };

    slider.images.innerHTML = images
      .map(function (image) {
        return `<img src="${image}"/>`;
      })
      .join("");

    let imageNodes = slider.images.querySelectorAll("img");
    imageNodes[currentImage]?.classList?.add("active");

    slider.thumbnails.innerHTML = slider.images.innerHTML;

    let thumbnailNodes = slider.thumbnails.querySelectorAll("img");

    thumbnailNodes[currentImage].classList.add("active");
    for (let i = 0; i < thumbnailNodes.length; i++) {
      thumbnailNodes[i].addEventListener("click", function () {
        slider.thumbnails.querySelector("img.active").classList.remove("active");
        thumbnailNodes[i].classList.add("active");
        imageNodes[currentImage].classList.remove("active");
        currentImage = i;
        imageNodes[currentImage].classList.add("active");
      });
    }

    slider.backBtn.addEventListener("click", function () {
      imageNodes[currentImage].classList.remove("active");
      currentImage--;
      if (currentImage < 0) {
        currentImage = images.length - 1;
      }
      imageNodes[currentImage].classList.add("active");
      slider.thumbnails.querySelector("img.active").classList.remove("active");
      thumbnailNodes[currentImage].classList.add("active");
    });

    slider.nextBtn.addEventListener("click", function () {
      imageNodes[currentImage].classList.remove("active");
      currentImage = (currentImage + 1) % images.length;
      imageNodes[currentImage].classList.add("active");
      slider.thumbnails.querySelector("img.active").classList.remove("active");
      thumbnailNodes[currentImage].classList.add("active");
    });
  }

  const addClickOption = (price, index) => {
    setPriceOp(data.price + price);
    setActive(index);
  };

  return (
    <div>
      {data == undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div className="containerBakery">
          <div className="containerLeft">
            <div className="nameBakery">
              <h1>{data.name}</h1>
              <p>${priceOp}.00</p>
              <hr></hr>
            </div>

            <div className="cakeSize">
              <h3>Cake Size</h3>
              {data.option.map((op, index) => (
                <button
                  key={index}
                  className={active === index ? "active" : undefined}
                  onClick={() => {
                    addClickOption(op.priceOp, index);
                  }}>
                  {op.cakeSize}
                </button>
              ))}
            </div>
            <div className="addToCartBtn">
              {data.isSoldOut ? (
                <button>Sold Out</button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      addCakeToCart({
                        cakeID: data.id,
                        optionIndex: active,
                      })
                    )
                  }>
                  Add to cart
                </button>
              )}
              <div className="inf">
                <p>{data.inf}</p>
              </div>
            </div>
          </div>
          <div className="containerRight image-slider">
            <div className="images"></div>
            <div className="thumbnails"></div>
            <div className="back-btn">
              <ion-icon name="chevron-back-outline"> ◁ </ion-icon>
            </div>
            <div className="next-btn">
              <ion-icon name="chevron-forward-outline"> ▷ </ion-icon>
            </div>
          </div>
        </div>
      )}
      <Ads />
    </div>
  );
}

export default Bakery;
