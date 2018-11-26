import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
`;

const Radio = styled.div`
    border-radius: 20px;
    border: 1px solid ${({ disabled }) => disabled ? '#ccc' : '#555'};
    background: ${({ disabled }) => (disabled ? 'fafafa' : '#fff')};
    width: 23px;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RadioSignal = styled.div`
    border-radius: 20px;
    width: 15px;
    height: 15px;
    background: ${({ checked, disabled }) => (checked
    ? (disabled ? '#ccc' : '#555')
    : 'transparent'
  )};
`;

const Label = styled.div`
    color: ${p => p.disabled ? colors.TEXT_DISABLED : colors.TEXT_NORMAL};
    margin-left: 9px;
    text-align: left;
`;

export class RadioButton extends React.Component {
  static defaultProps = {
    label: "Label",
    disabled: false,
    checked: true,
    height: 23,
    width: 200,
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { checked } = this.props;
    if (checked === prevProps.checked) return;
    if (this.state.checked !== checked) {
      this.setState({ checked });
    }
  }

  // toggle() {
  //   this.setState({
  //     checked: !this.state.checked,
  //   });
  // }

  render() {
    const { disabled, label } = this.props;
    const { checked } = this.state;
    return (
      // onClick={() => this.toggle()}>
      <Container {...this.props}>
        <Radio checked={checked} disabled={disabled}>
          <RadioSignal checked={checked} disabled={disabled} />
        </Radio>
        <Label disabled={disabled}>{label}</Label>
      </Container>
    );
  }
}
