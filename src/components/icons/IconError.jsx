import * as React from "react";
import styled from 'styled-components';
import * as colors from '../../global/Colors';

const Container = styled.div`
  background: ${colors.ERROR};
  width: 16px;
  height: 16px;
`;
export const IconError = (props) => {
  return (
    <Container>
    </Container>
  );
};