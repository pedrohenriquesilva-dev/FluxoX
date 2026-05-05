import PropTypes from "prop-types";
import "./Skeleton.css";

export default function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  className = "",
  ...props
}) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...props.style
      }}
      {...props}
    />
  );
}

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};