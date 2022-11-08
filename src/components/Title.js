import "./Title.css";

export default function Title(props) {
  var startingPosition = Math.floor(Math.random() * 101);
  const changingPosition = () => {
    fluke.style.setProperty("--animation-time", startingPosition + "px");
  };
  return (
    <>
      <div className="title">
        {props.text.split("").map((l) => (
          <>
            <span id="fluke">{l}</span>
          </>
        ))}
      </div>
    </>
  );
}
