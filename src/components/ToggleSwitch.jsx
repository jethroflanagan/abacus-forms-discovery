import * as React from "react";
import styled from "styled-components";
import * as colors from "../global/Colors";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 23px;
  max-height: 23px;
  cursor: pointer;
`;

const ToggleTrack = styled.div`
  border-radius: 20px;
  border: 1px solid
    ${({ disabled }) => (disabled ? colors.TEXT_DISABLED : colors.TEXT_NORMAL)};
  background: ${({ checked, disabled }) =>
    checked
      ? disabled
        ? colors.TEXT_DISABLED
        : colors.TEXT_NORMAL
      : disabled
      ? "#fafafa"
      : "#fff"};
  width: 43px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? "flex-end" : "flex-start")};
  padding: 0 3px;
`;

// const ToggleTrack

const ToggleButton = styled.div`
  border-radius: 20px;
  width: 15px;
  height: 15px;
  background: ${({ checked, disabled }) =>
    checked ? "#fff" : disabled ? colors.TEXT_DISABLED : colors.TEXT_NORMAL};

`;

const Label = styled.div`
  color: ${colors.TEXT_NORMAL};
  margin-left: 9px;
  text-align: left;
`;

export class ToggleSwitch extends React.Component {
  // Set default properties
  static defaultProps = {
    label: "Label",
    disabled: false,
    checked: false,
    height: 23,
    width: 200,
    onUpdateValue: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      isHover: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { checked } = this.props;
    if (checked === prevProps.checked) return;
    if (this.state.checked !== checked) {
      this.setState({ checked });
    }
  }

  toggle() {
    if (this.props.disabled) return;
    const checked = !this.state.checked;
    this.setState({
      checked
    });
    this.props.onUpdateValue(checked);
  }

  onHover() {
    this.setState({ isHover: true });
  }
  onBlur() {
    this.setState({ isHover: false });
  }

  render() {
    const { disabled, label } = this.props;
    const { checked } = this.state;
    return (
      <Container checked={checked} onClick={() => this.toggle()} onMouseOver={() => this.onHover()} onBlur={() => this.onBlur()}>
        <ToggleTrack checked={checked} disabled={disabled}>
          <ToggleButton checked={checked} disabled={disabled} />
        </ToggleTrack>
        <Label>{label}</Label>
      </Container>
    );
  }
}
