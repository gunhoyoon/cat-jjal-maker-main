import CatItem from "./CatItem";

export default function Favorited({ favorites }) {
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }
  // 조건부 랜더링
  //if (favorites.length === 0) 일땐 사진 위 하트를 눌러 고양이 사진을 저장해봐요! 리턴
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
    // 여기서 key = {cat} 키 값을 넣어주는건 키 값이 있어야 리액트에서 최적화를 잘해서 보여주기때문이다
  );
  // 위의 favorites 를 엘리먼트 >컴포넌트화
}
