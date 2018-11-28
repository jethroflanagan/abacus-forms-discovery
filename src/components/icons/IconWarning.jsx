import * as React from "react";
import styled from 'styled-components';
import { ReactComponent as Icon } from '../../assets/icons/warning.svg';

const Container = styled.div`
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
