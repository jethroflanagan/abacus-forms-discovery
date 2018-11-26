import * as React from "react";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    > * {
      margin-bottom: 10px;
      &:last-child {
        margin: 0;
      }
    }
`;

export class Stack extends React.Component {
  render() {
    const { children, gap, layout } = this.props;
    return (
      <Container {...this.props}>
        {children}
      </Container>
    );
  }
}
