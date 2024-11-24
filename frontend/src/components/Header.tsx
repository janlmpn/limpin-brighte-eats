/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h2>Brighte Eats</h2>
    </HeaderContainer>
  );
};

export default Header;
