import PropTypes from "prop-types";
import "./PageHeader.css";

export default function PageHeader({ title, subtitle, rightSlot }) {
  return (
    <header className="page-header">
      <div className="page-header__main">
        <h1 className="page-header__title">{title}</h1>
        {subtitle ? <p className="page-header__subtitle text-muted">{subtitle}</p> : null}
      </div>
      {rightSlot ? <div className="page-header__right">{rightSlot}</div> : null}
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  rightSlot: PropTypes.node
};
