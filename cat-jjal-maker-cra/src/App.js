import React from "react";
import "./App.css";
import Title from "./components/Title";
import Favorited from "./components/Favorited";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`); //
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

// const fetchingCat = async () => {
//   const OPEN_API_DOMAIN = "https://cataas.com";
//   const bbb = await fetch(`${OPEN_API_DOMAIN}/cat/says/?json=true`);
//   console.log(aaaaa)
//   console.log(aaaaa)
//   console.log(aaaaa)
//   const responseJson = await response.json();
// };

// const title = <h1>1번째 고양이 가라사대</h1>;
// title 엘리먼트 >컴포넌트화

// const form = (
//   <form>
//     <input
//       type="text"
//       name="name"
//       placeholder="영어 대사를 입력해주세요"
//     />
//     <button type="submit">생성</button>
//   </form>
// );
// form 엘리먼트 >컴포넌트화

// const favorites = (
//   <ul class="favorites">
//     <CatItem img="https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn" />
//     <CatItem img="https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript" />{" "}
//   </ul>
//   일단 이미지를 넘겨받았음 , CatItem 에서 인자로 받아서 보여줘야함
//   리액트에서 인자를 받는것을 props 라고함
// );

// 자바스크립트 변수를 리액트 문법안에서 쓰는 법은 {중괄호임}
// const mainCard = (
//   <div class="main-card">
//     <img
//       src="https://cataas.com/cat/60b73094e04e18001194a309/says/react"
//       alt="고양이"
//       width="400"
//     />
//     <button>🤍</button>
//   </div>
// );
// MainCard 엘리먼트 >컴포넌트화

// 리액트에 jsx 에서는 onClick 으로 대문자를 써줘야함
// 여기서 Props 를 안쓰고 오브젝트로 바로 쓸 수도 있음
// const MainCard = ({ img }) => (
// 오브젝트로 풀어버릴 수도 있음
// <img src = {img} />

// app 의 컴포넌트화
const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  // 카운터가 올라갈때마다 로컬 스토리지에 접근하니까 처음 한번만 접근할 수 있게
  // useState에 함수로 전달해줌 useState 얘가 초기한번만 실행하게 해주니까
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
    // favorites localStorage 가 null 값일때 []빈배열로 초기화를 해줘라
  });
  const alreadyFavorite = favorites.includes(mainCat);
  // includes는 뭐냐면
  // [1,2,3].includes(1) // ture
  // [1,2,3].includes(4) // false 임 ㅇㅋ?
  // 위 코드는 favorites 배열 안에 mainCat이 있는지로 하트 판별을 할거임

  async function setInitalCat() {
    const newCat = await fetchCat("First cat");
    console.log(newCat);
    setMainCat(newCat);
  }

  // setInitalCat();
  // 이 함수가 계속 불려서 끝나지 않는걸 해결하려면?
  React.useEffect(() => {
    setInitalCat();
  }, []);
  // 위의 문제를 해결하는데 왜 해결되는건지?
  // useEffect 가 뭔지?
  // 리액트 컴포넌트 안의 코드들은 UI가 실행될때마다 매번 불리는데
  // 그걸 useEffect의 2번째 인자로 제어할 수 있다.
  // 2번째 인자가 업데이트 될때마다 불리게 할 수 있음.
  // [counter] 라면 counter 가 올라갈때만 불리게됨
  // 상태변화가 상관없고 처음 호출된 모습으로만 사용하고 싶을땐 빈배열을 넣음

  async function updateMainCat(value) {
    // formSubmit 에 첫번째 인자로 event 가 들어오고
    // form 의 기본값을 event.preventDefault();으로 막는다
    const newCat = await fetchCat(value);
    setMainCat(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
    // 생성을 연타했을 때 순간적으로 리액트에서 카운터와 셋카운터가 바라보는게 달라짐
    // useState 에 이니셜state랑 setState에 값대신 함수를 넘긴거임
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
    // 위 문법은 기존에 있는 favorites 배열 초기값이 CAT1,CAT2을 펼쳐서 쓰고 CAT3를 그 뒤에 추가한다.
    // 그럼 위 배열안에 CAT1 CAT2 CAT3가 저장이 되는거임
  }
  const counterTitle = counter === null ? "" : counter + "번째 ";
  // counter 가 unll 일때 " "비워주고 null 이 아니라면 counter + " 번째 ";

  return (
    <div
      style={{
        position: "relative",
        margin: "0 auto",
        maxWidth: "428px",
        textAlign: "center",
      }}
    >
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorited favorites={favorites} />
    </div>
    // MainCard 에서 하트를 눌렀을 때 handleHeartClick 을 불러주는데 얘가 원래
    // MainCard 내부에 있었는데 상위에서도 handleHeartClick 을 공유하기 위헤서 함수를 한 단계 올려줌
    // 그래서 하트클릭을 하면 favorites 배열에 기존 초기값이 CAT3 를 더해서 favorites에 저장한거임
  );
};
export default App;
