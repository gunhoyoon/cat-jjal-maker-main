import React from "react";

const Form = ({ updateMainCat }) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const userValue = e.target.value;
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    }
    setValue(userValue.toUpperCase());
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (value === "") {
      setErrorMessage("빈 값은 입력할 수 없습니다.");
      return;
    }
    updateMainCat(value);
  }
  // counterState를 2개의 구조로 나눌꺼임
  // const counter = counterState[0];
  // const setCounter = counterState[1];
  // counter 는 counterState 의 0번째 인덱스로 받고
  // setcounter 는 counterState 의 1번째 인덱스를 받는다
  // 이렇게 2개를 쓸수도 있지만 좀 더 깔끔한 코드는 합쳐서 {0 , 1} 로 작성 가능

  // Form 에서 handleFormSubmit이 없으니까 props 로 받아오는거임
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
        style={{ margin: "10px" }}
      />
      <button type="submit">생성</button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

export default Form;
