import * as React from "react";
import styled from "styled-components";
import { ReactComponent as Tick } from "../assets/icons/tick.svg";
import * as colors from "../global/Colors";

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    cursor: pointer;
`;

const Label = styled.div`
    color: ${colors.TEXT_NORMAL};
    margin-bottom: 5px;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
`;

const Box = styled.div`
    display: flex;
    position: relative;
    background: ${p => (p.disabled ? "#fafafa" : "#fff")};
    border: 1px solid
        ${p =>
            p.disabled ? "#ddd" : p.isFocused ? colors.FOCUS : p.statusColor};
    border-radius: 5px;
    width: 80px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
`;

const LabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
`;

const NumberInput = styled.input`
    /* color: #555; */
    color: ${p => (p.disabled ? "#666" : colors.TEXT_NORMAL)};
    font-size: 16px;
    border: none;
    background: transparent;
    line-height: 40px;
    width: 100%;
    outline: none;
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const Placeholder = styled.div`
    color: #888;
    font-size: 16px;
    font-style: italic;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translate(0, -50%);
    pointer-events: none;
`;

export class RangeSlider extends React.Component {
    static defaultProps = {
        label: "Label",
        disabled: false,
        value: 0,
        step: 1,
        min: 0,
        max: 10,
        height: 23,
        width: 200
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { checked } = this.props;
        if (checked === prevProps.checked) return;
        if (this.state.checked !== checked) {
            this.setState({ checked });
        }
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({
            value
        });
        if (this.props.onUpdateValue) {
            this.props.onUpdateValue(value);
        }
    }
    onFocus(e) {
        this.setState({
            isFocused: true
        });
    }

    onBlur(e) {
        this.setState({
            isFocused: false
        });
    }

    render() {
        const { disabled, label, step, min, max } = this.props;
        const { checked, value } = this.state;
        return (
            <Container {...this.props}>
                <Label>{label}</Label>
                <Box disabled={disabled}>
                    <NumberInput
                        type="number"
                        onChange={e => this.onChange(e)}
                        value={value}
                        disabled={disabled}
                        onFocus={e => this.onFocus(e)}
                        onBlur={e => this.onBlur(e)}
                    />
                </Box>
                <Input
                    type="range"
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    onChange={e => this.onChange(e)}
                />
            </Container>
        );
    }
}
