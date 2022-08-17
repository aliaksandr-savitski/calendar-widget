import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 1.875rem;
  margin-bottom: 3.5rem;
`;

export const NavigationDate = styled.div`
  display: flex;
  color: #333333;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavigationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  transition: background-color 0.2s ease;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: rgba(51, 51, 51, 0.1);
  }
`;

export const NavigationButtonArrow = styled.div`
  width: 8px;
  height: 8px;
  border: 2px solid #333333;
  transform: rotate(-45deg);
  flex: none;
  order: 0;
  flex-grow: 0;

  ${({ direction }) =>
    direction === 'right'
      ? `
      border-left: none;
      border-top: none;
    `
      : `
      border-right: none;
      border-bottom: none;
    `}
`;
