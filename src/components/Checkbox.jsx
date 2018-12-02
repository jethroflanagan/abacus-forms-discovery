import * as React from "react";
import styled from 'styled-components';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';
import * as colors from '../global/Colors';
import { HelperText } from './shared/HelperText';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;
const Field = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
`;

const Radio = styled.div`
    border-radius: 4px;
    border: 1px solid ${({ disabled }) => disabled ? '#ccc' : '#555'};
    background: ${({ disabled }) => (disabled ? 'fafafa' : '#fff')};
    width: 23px;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RadioSignal = styled.div`
    margin-top: -9px;
    width: 11px;
    height: 9px;
    opacity: ${p => p.disabled ? .5 : 1};

    display: ${p => p.checked
        ? 'block'
        : 'none'
    };
`;

const Label = styled.div`
    color: ${colors.TEXT_NORMAL};
    margin-left: 9px;
    text-align: left;
`;

export class Checkbox extends React.Component {
    static defaultProps = {
        label: "Label",
        disabled: false,
        checked: true,
        height: 23,
        width: 200,
        helperText: '',
        status: '',
        alwaysShowHelperText: false,
        onUpdateValue: () => {},
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

    toggle() {
      const checked = !this.state.checked;
      this.setState({
        checked,
      });
      // this.props.onUpdateValue({ checked });
    }

    render() {
        const { disabled, label, helperText, alwaysShowHelperText, status } = this.props;
        const { checked } = this.state;
        let helperTextMessage = helperText;
        if (typeof(helperTextMessage) === 'function') {
          helperTextMessage = helperText(this.state);
        }
        return (
          <Container>
            <Field onClick={() => this.toggle()}>
                <Radio checked={checked} disabled={disabled}>
                  <RadioSignal checked={checked} disabled={disabled} >
                    <Tick />
                  </RadioSignal>
                </Radio>
                <Label>{label}</Label>

            </Field>
            {helperText || alwaysShowHelperText ? (
                <HelperText status={status} message={helperTextMessage} />
            ) : null}
          </Container>
        );
    }
}
