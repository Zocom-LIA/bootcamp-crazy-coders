import companyLogo from './assets/Logo.svg';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <img src={companyLogo} alt="company-logo" />;
    </Link>
  );
};
