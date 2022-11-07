export default function CatItem(props) {
  return (
    <li style={{ listStyle: "none" }}>
      <img src={props.img} style={{ width: "150px" }}></img>
    </li>
  );
}
