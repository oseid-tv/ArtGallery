import styled from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";

export const HeaderComponent = styled.View.attrs({
  testID: "HeaderComponent",
})`
  width: 84%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PageTitle = styled.Text.attrs({
  testID: "PageTitle",
})`
  text-align: center;
  color: #fff;
  font-family: "Poppins_500Medium";
  font-size: 19px;
`;

export const IconWrapper = styled.TouchableOpacity.attrs({
  testID: "IconWrapper",
})`
  padding: 6px;
  border: 2px solid #fff;
  border-radius: 10px;
`;

export const ArrowIcon = styled(Icon).attrs({
  testID: "ArrowIcon",
})``;

export const PlaceholderView = styled.View.attrs({
  testID: "PlaceholderView",
})`
  width: 40px;
  height: 1px;
`;
