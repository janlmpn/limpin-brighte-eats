/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Header from './Header';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full height of the viewport */
  width: 100%;
  background-color: #f9f9f9; /* Optional background color */
`;

const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
