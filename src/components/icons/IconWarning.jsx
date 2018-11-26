import * as React from "react";
import styled from 'styled-components';
import * as colors from '../../global/Colors';
import { ReactComponent as Icon } from '../../assets/icons/warning.svg';

const Container = styled.div`
  background: ${colors.WARNING};
  width: 16px;
  height: 16px;
`;
export const IconWarning = (props) => {
  return (
    <Container>
      <Icon />
    </Container>
  );
};
