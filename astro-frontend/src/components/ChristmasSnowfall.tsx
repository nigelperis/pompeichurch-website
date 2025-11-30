import Snowfall from "react-snowfall";

export default function ChristmasSnowfall() {
  return (
    <Snowfall
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      snowflakeCount={150}
      speed={[0.5, 2]}
      wind={[-0.5, 1]}
      radius={[1, 4]}
    />
  );
}
