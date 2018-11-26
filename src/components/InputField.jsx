import * as React from 'react';
import styled from 'styled-components';
// import { IconInfo, IconError, IconSuccess, IconWarning } from './icons';
import { IconError } from './icons/IconError';
import { IconWarning } from './icons/IconWarning';
import { IconInfo } from './icons/IconInfo';
import * as colors from '../global/Colors';

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
    flex-direction: column;
    justify-content: center;
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
const HelperTextContainer = styled.div`
    display: flex;
    margin-top: 5px;
`;

const StatusIcon = styled.div`
    margin-right: 5px;
    width: 16px;
    height: 16px;
`;

const Input = styled.input`
    /* color: #555; */
    color: ${p => (p.disabled ? '#666' : colors.TEXT_NORMAL)};
    font-size: 16px;
    border: none;
    background: transparent;
    line-height: 40px;
    width: 100%;
    outline: none;
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

const HelperText = styled.div`
    color: ${p => p.statusColor};
    font-size: 14px;
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
        isPassword: false,
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
            isPassword,
            infoText,
            width,
            fieldWidth,
            alwaysShowHelperText, // Errors have breathing room
        } = this.props;
        const { isFocused, value } = this.state;

        let statusColor = '#555';
        let statusIcon = null;
        switch (status) {
            case 'error':
                statusColor = colors.ERROR;
                statusIcon = <IconError />;
                break;
            case 'warning':
                statusColor = colors.WARNING;
                statusIcon = null; //<IconWarning />;
                break;
            case 'success':
                statusColor = colors.SUCCESS;
                statusIcon = null; //<IconSuccess />;
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
                    {value.length ? null : <Placeholder>{placeholder}</Placeholder>}
                    <Input
                        type={isPassword ? 'password' : 'text'}
                        onChange={e => this.onChange(e)}
                        value={value}
                        disabled={disabled}
                        onFocus={e => this.onFocus(e)}
                        onBlur={e => this.onBlur(e)}
                    />
                </Box>
                {helperText || alwaysShowHelperText ? (
                    <HelperTextContainer>
                        {statusIcon ? <StatusIcon>{statusIcon}</StatusIcon> : null}
                        <HelperText statusColor={statusColor}>{helperText}&nbsp;</HelperText>
                    </HelperTextContainer>
                ) : null}
            </Container>
        );
    }
}
