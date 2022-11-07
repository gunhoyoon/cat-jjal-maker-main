const Title = (props) => {
  return (
    <h1 style={{ fontSize: "30px", fontWeight: "bold", marginTop: "50px" }}>
      {props.children}
    </h1>
  );
};

export default Title;
