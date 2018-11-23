import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Stack } from "../components/Stack";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { Checkbox } from "../components/Checkbox";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { SegmentedControl } from "../components/SegmentedControl";
import { ProgressIndicator } from "../components/ProgressIndicator";

import {
  STRETCH_WIDTH,
  SINGLE_PAGE,
  USE_GROUPS,
  MULTI_COLUMN,
  FIELD_GAP,
  GROUP_GAP,

  ERRORS_EXPAND,
  ERROR_BREATHING_ROOM,
  FORCE_ERRORS,

  PROGRESS_POSITION,
  PROGRESS_TYPE,
  PROGRESS_ORIENTATION,
  SEPARATE_PAGES_FOR_PROGRESS,

  SHOW_SUMMARY,
  TYPEFORM,
  HIDDEN_FIELDS,
  PROGRESSIVE_DISCLOSER,
  INLINE_HELP,
} from "../settings/Settings";

// import "./styles.css";

const Heading = styled.h2``;

const FormContainer = styled.div`
  max-width: 580px;
  padding: 20px;
`;

const FieldContainer = styled.div`
  width: 100%;
  margin-bottom: ${ p => p.fieldGap }px;
  &(:last-child){
    margin-bottom: 0;
  }
`;

export class NormalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "English (ZA)"
    };
  }
  onUpdateLanguage(language) {
    console.log(language);
    this.setState({
      language
    });
  }

  getOptions(preferred) {
    const { 
      [STRETCH_WIDTH.name]: stretchWidth,
      [ERROR_BREATHING_ROOM.name]: errorsHaveBreathingRoom,
      [FIELD_GAP.name]: fieldGap,
    } = this.props;
    return {
      field: {
        ...preferred,
        width: stretchWidth ? '100%': preferred.width,
        alwaysShowHelperText: errorsHaveBreathingRoom,
      },
      container: {
        fieldGap,
      }
    };
  }
  
  createField(preferredOptions) {
    const options = this.getOptions(preferredOptions);
    const Field = preferredOptions.field;
    console.log(options.container)
    <FieldContainer fieldGap="10" />
    return (
      <FieldContainer {...options.container}>
        <Field {...options.field} />
      </FieldContainer>
    );
    // switch (options.field) {
    //   case 'Input': 
    //     return <InputField {...options} />;
    //   case 'Checkbox':
    //     return <Checkbox {...options} />;
    //   case 'Radio':
    //     return <RadioButtonGroup {...options} />;
    //   case 'ToggleSwitch':
    //     return <RadioButtonGroup {...options} />;
    //   case 'SegmentedControl':
    //     return <SegmentedControl {...options} />;
    //   default:
    //     console.warn('not found');
    //     return null;
    // }
  }

  render() {
    const styles = {};
    if (this.state.language === "English (AU)") {
      styles.transform = "rotate(180deg)";
    }

    const fields = [
      // {
      //   columns: [
            [
              { field: InputField, label: 'Beneficiary name', width: '300px' },
              { field: InputField, label: 'Bank', width: '240px' },
            ],
            [
              { field: InputField, label: 'Branch', width: '240px' },
              { field: InputField, label: 'Account number', width: '240px' },
            ]
      //   ],
      // },
      { field: InputField, label: 'Beneficiary name', width: '300px' },
      { field: InputField, label: 'Bank', width: '240px' },
      { field: InputField, label: 'Branch', width: '240px' },
      { field: InputField, label: 'Account number', width: '240px' },
      { field: InputField, label: 'Account type', width: '240px' },
      { field: InputField, label: 'Amount', width: '240px' },
      { field: Checkbox, label: 'Agree' },
      { field: RadioButtonGroup, label: 'Agree', options: ["Yes", "Ask later", "Never"], value: "Yes" },
      { field: SegmentedControl, segments: ['Hello', 'Goodbye'], value: 'Hello' },
      { field: ProgressIndicator, step: 1, totalSteps: 3 },
    ];

    return (
      <FormContainer style={styles}>
        <Stack>
          <Heading>Payment details</Heading>
          { fields.map(field => this.createField(field)) }
        </Stack>
      </FormContainer>
    );

    // return (
    //   <FormContainer style={styles}>
    //     <Stack>
    //       <Heading>Payment details</Heading>
    //       <RadioButtonGroup
    //         label="Language"
    //         options={["English (ZA)", "English (AU)", "Afrikaans"]}
    //         value="English (ZA)"
    //         onUpdateValue={v => this.onUpdateLanguage(v)}
    //       />
    //       <InputField label="Beneficiary name" {...this.getOptions({width: '240px'})} />
    //       <InputField label="Bank" />
    //       <InputField label="Branch" />
    //       <InputField label="Account number" />
    //       <InputField label="Account type" />
    //       <InputField label="Amount" />
    //       <Checkbox />

    //       <ToggleSwitch />
    //       <SegmentedControl />
    //       <RadioButtonGroup
    //         options={["Yes", "Ask later", "Never"]}
    //         value="Yes"
    //       />
    //       <ProgressIndicator step={1} totalSteps={3} />
    //     </Stack>
    //   </FormContainer>
    // );
  }
}
