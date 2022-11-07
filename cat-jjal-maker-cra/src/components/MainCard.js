const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";
  return (
    <div className="main-card">
      <div>
        <img src={img} alt="고양이" width="400" />

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
