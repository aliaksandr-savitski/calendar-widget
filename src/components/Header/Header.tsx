import {
  HeaderContainer,
  NavigationDate,
  NavigationWrapper,
  NavigationButton,
  NavigationButtonArrow,
} from './Header.styles';

interface HeaderProps {
  navigationDate: string;
  onBack: Function;
  onForward: Function;
}

const Header = ({ navigationDate, onBack, onForward }: HeaderProps) => (
  <HeaderContainer>
    <NavigationDate>{navigationDate}</NavigationDate>
    <NavigationWrapper>
      <NavigationButton onClick={onBack}>
        <NavigationButtonArrow />
      </NavigationButton>
      <NavigationButton onClick={onForward}>
        <NavigationButtonArrow direction="right" />
      </NavigationButton>
    </NavigationWrapper>
  </HeaderContainer>
);

export default Header;
