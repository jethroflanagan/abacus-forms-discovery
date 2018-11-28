import * as React from "react";
import styled from 'styled-components';
import { ReactComponent as Icon } from '../../assets/icons/danger.svg';
const Container = styled.div`
  width: 16px;
  height: 16px;
`;
export const IconError = (props) => {
  return (
    <Container>
        <Icon />
    </Container>
  );
};
