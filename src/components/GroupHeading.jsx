import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';

const Container = styled.h2`
    padding: 0;

    font-size: 24px;
    font-width: 600;
    text-align: left;
    color: ${colors.TEXT_NORMAL};
`;


export class GroupHeading extends React.Component {
  // Set default properties
  static defaultProps = {
    label: "Hello",
  }

  render() {
    const { label } = this.props;
    return (
      <Container>
        {label}
      </Container>
    );
  }
}
