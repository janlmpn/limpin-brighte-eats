import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <h2 style={{cursor: "pointer"}} onClick={() => navigate(`/`)}>Brighte Eats</h2>
    </HeaderContainer>
  );
};

export default Header;
