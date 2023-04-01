import { useRef } from "react";
const Item = () => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src="Images/image1.png" className="product-thumb" alt="" />
      </div>
      <div className="product-info">
        <h2 className="product-short-des">Từ TP. Hồ Chí Minh đến Hà Nội</h2>
        <p className="product-short-description">1 chiều / Phổ thông</p>
        <span className="price">1.590.000 VNĐ </span>
        <span className="departure_date">19/05/2023</span>
      </div>
    </div>
  );
};
const Slider_product = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="product">
      <button
        onClick={() => {
          // let containerDimensions =
          //   containerRef?.current?.getBoundingClientRect();
          // let containerWidth = containerDimensions?.width || 0;
          // // containerRef?.current.scrollLeft -= containerWidth;
          // console.log("qua trai");
        }}
        className="pre-btn"
      >
        <img src="Images/arrow.png" alt="" />
      </button>
      <button
        onClick={() => {
          // let containerDimensions =
          //   containerRef.current.getBoundingClientRect();
          // let containerWidth = containerDimensions.width;
          // containerRef.current.scrollLeft += containerWidth;
          // console.log("qua phai");
        }}
        className="nxt-btn"
      >
        <img src="Images/arrow.png" alt="" />
      </button>
      <div ref={containerRef} className="product-container">
        {[...Array(10)].map((i, index) => (
          <Item key={index} />
        ))}
      </div>
    </section>
  );
};

export default Slider_product;
