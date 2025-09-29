const style = {
  mais: { fill: "white" }
};

export function LogoSvg() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Retângulo traseiro */}
      <rect
        x="60"
        y="20"
        width="80"
        height="110"
        rx="15"
        ry="15"
        stroke="#0d3d80"
        strokeWidth="10"
        fill="none"
      />
      {/* Retângulo frontal */}
      <rect
        x="90"
        y="10"
        width="80"
        height="110"
        rx="15"
        ry="15"
        stroke="#1e73e6"
        strokeWidth="10"
        fill="none"
      />
      {/* Símbolo de + */}
      <rect x="135" y="30" width="15" height="50" style={style.mais} />
      <rect x="118" y="48" width="50" height="15" style={style.mais} />
    </svg>
  );
}
