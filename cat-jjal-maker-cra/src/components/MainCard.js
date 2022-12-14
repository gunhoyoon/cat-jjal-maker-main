const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "đ" : "đ¤";
  return (
    <div className="main-card">
      <div>
        <img src={img} alt="ęł ěě´" width="400" />

        <button
          style={{ position: "absolute", top: 45, right: 70 }}
          onClick={onHeartClick}
        >
          {heartIcon}
        </button>
      </div>
    </div>
  );
};

export default MainCard;
