import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';

const Container = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: ${p => p.type === 'primary'
    ? colors.FOCUS
    : (p.type === 'secondary' ? '#555' : '#fff')
  };
    color: ${p => p.type === 'tertiary' ? '#555' : '#fff'};
    border: 1px solid transparent;
    border-color: ${p => p.type === 'tertiary' ? '#555' : 'transparent'};
    height: 48px;
    padding: 0 15px;
    border-radius: 5px;
    cursor: pointer;
`;


export class Button extends React.Component {
  // Set default properties
  static defaultProps = {
    label: "Button",
    type: "primary",
  }

  render() {
    const { label, type } = this.props;
    return (
      <Container {...this.props} type={type}>
        {label}
      </Container>
    );
  }
}
