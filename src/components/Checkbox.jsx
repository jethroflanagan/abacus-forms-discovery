import * as React from "react";
import styled from 'styled-components';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';
import * as colors from '../global/Colors';

const Container = styled.div`
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
      this.setState({
        checked: !this.state.checked,
      });
    }

    render() {
        const { disabled, label } = this.props;
        const { checked } = this.state;
        return (
            <Container {...this.props} onClick={() => this.toggle()}>
                <Radio checked={checked} disabled={disabled}>
                  <RadioSignal checked={checked} disabled={disabled} >
                    <Tick />
                  </RadioSignal>
                </Radio>
                <Label>{label}</Label>
            </Container>
        );
    }
}
