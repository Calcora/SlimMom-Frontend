import { useNavigate } from 'react-router-dom';
import mobilLogo from "./assets/logo.png";
import tabletLogo from "./assets/logo.png";

const Logo = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/diary');
  };

  return (
    <picture onClick={handleClick} style={{ cursor: 'pointer' }}>
      {/* 1200px+ için */}
      <source
        media="(min-width: 1200px)"
        srcSet={tabletLogo}
      />
      {/* 768px+ için */}
      <source
        media="(min-width: 768px)"
        srcSet={tabletLogo}
      />
      {/* Default: mobil */}
      <img
        src={mobilLogo}
        alt="SlimMom"
        className={className}
        decoding="async"
      />
    </picture>
  );
};

export default Logo;