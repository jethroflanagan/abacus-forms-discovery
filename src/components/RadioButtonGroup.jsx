import * as React from "react";
import styled from 'styled-components';
import { RadioButton } from './RadioButton';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    & > * {
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
`;

export class RadioButtonGroup extends React.Component {
  static defaultProps = {
    disabled: false,
    value: '',
    label: 'hello',
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (value === prevProps.value) return;
    if (this.state.value !== value) {
      this.setState({ value });
    }
  }

  toggle(value) {
    this.setState({
      value,
    });
  }

  render() {
    const { disabled, label, options } = this.props;
    const { value } = this.state;
    return (
      <Container>
      { options.map(label => <RadioButton label={label} checked={value===label} disabled={disabled} onClick={() => this.toggle(label)} />)}
      </Container>
    );
  }
}
