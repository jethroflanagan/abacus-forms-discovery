import * as React from 'react';
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { IconInfo } from './icons/IconInfo';
import { HelperText } from './shared/HelperText';
const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

const Box = styled.div`
    display: flex;
    position: relative;
    background: ${p => (p.disabled ? '#fafafa' : '#fff')};
    border: 1px solid ${p => (p.disabled ? '#ddd' : p.isFocused ? colors.FOCUS : p.statusColor)};
    border-radius: 5px;
    width: 100%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    padding: 0 5px;
`;

const Label = styled.div`
    color: ${colors.TEXT_NORMAL};
`;

const LabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
`;

const Input = styled.input`
    /* color: #555; */
    color: ${p => (p.disabled ? '#666' : colors.TEXT_NORMAL)};
    font-size: 16px;
    border: none;
    background: transparent;
    height: 100%;
    width: 100%;
    outline: none;
    &[type=number]::-webkit-inner-spin-button,
    &[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
`;
const Placeholder = styled.div`
    position: absolute;
    pointer-events: none;
    color: ${colors.TEXT_PLACEHOLDER};
    font-size: 16px;
    font-style: italic;
    transform: translateY(1px); //* weird */
`;
const Currency = styled.div`
    color: ${colors.TEXT_NORMAL};
    font-size: 16px;
    transform: translateY(1px); //* weird */
`;

const Icon = styled.div`
    display: flex;
    /* margin-left: auto; */
    width: 16px;
    height: 16px;
`;

export class InputField extends React.Component {
    // Set default properties
    static defaultProps = {
        label: 'Label',
        disabled: false,
        value: '',
        placeholder: '',
        helperText: '',
        disabled: false,
        type: 'text',
        infoText: '',
        alwaysShowHelperText: false,
        status: '',

        // size of everything
        width: '250px',
        // size of input
        fieldWidth: '100%',
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            isFocused: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { value } = this.props;
        if (value === prevProps.value) {
            return;
        }
        if (this.state.value !== value) {
            this.setState({ value });
        }
    }

    onFocus(e) {
        this.setState({
            isFocused: true,
        });
    }

    onBlur(e) {
        this.setState({
            isFocused: false,
        });
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({
            value,
        });
        if (this.props.onUpdateValue) {
            this.props.onUpdateValue(value);
        }
    }

    render() {
        const {
            disabled,
            label,
            helperText,
            status,
            placeholder,
            type,
            infoText,
            width,
            fieldWidth,
            alwaysShowHelperText, // Errors have breathing room
        } = this.props;
        const { isFocused, value } = this.state;

        let statusColor = '#555';
        switch (status) {
            case 'error':
                statusColor = colors.ERROR;
                break;
            case 'warning':
                statusColor = colors.WARNING;
                break;
            case 'success':
                statusColor = colors.SUCCESS;
                break;
        }
        return (
            <Container style={{ width }}>
                <LabelContainer>
                    <Label>{label}</Label>
                    {infoText ? (
                        <Icon>
                            <IconInfo />
                        </Icon>
                    ) : null}
                </LabelContainer>
                <Box disabled={disabled} isFocused={isFocused} statusColor={statusColor} style={{ width: fieldWidth }}>
                    { type === 'currency' ? <Currency>R</Currency> : null }
                    {value.length ? null : <Placeholder>{placeholder}</Placeholder>}
                    <Input
                        type={type ==='currency' ? 'number' : type}
                        onChange={e => this.onChange(e)}
                        value={value}
                        disabled={disabled}
                        onFocus={e => this.onFocus(e)}
                        onBlur={e => this.onBlur(e)}
                    />
                </Box>
                {helperText || alwaysShowHelperText ? (
                    <HelperText status={status} message={helperText} />
                ) : null}
            </Container>
        );
    }
}
