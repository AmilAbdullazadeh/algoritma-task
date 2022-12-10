import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface LayoutProps {
    theme: DefaultTheme;
}

export const Layout = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100vh;
  min-width: 100%;
  background-color: ${props => props.theme.colors.main};
  font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
`;

