import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { RadioButton } from './RadioButton';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;

const List = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    & > * {
      margin-right: 30px;
      margin-bottom: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
`;
const Label = styled.div`
    color: ${colors.TEXT_NORMAL};
    margin-bottom: 5px;
    font-weight: 600;
`;
export class RadioButtonGroup extends React.Component {
  static defaultProps = {
    disabled: false,
    value: '',
    label: '',
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
    if (this.props.onUpdateValue) {
      this.props.onUpdateValue(value);
    }
  }

  render() {
    const { disabled, label, options } = this.props;
    const { value } = this.state;
    return (
      <Container>
        { label ? <Label>{label}</Label> : null }
        <List>
          { options.map(label => <RadioButton label={label} checked={value===label} disabled={disabled} onClick={() => this.toggle(label)} />)}
        </List>
      </Container>
    );
  }
}
