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
import { GroupHeading } from "../components/GroupHeading";
import * as _ from 'lodash';

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
  PROGRESSIVE_DISCLOSURE,
  INLINE_HELP,
} from "../settings/Settings";

// import "./styles.css";

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

const Column = styled.div`
  margin-right: 10px;
  &(:last-child) {
    margin-right: 0;
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

  createColumns(columns) {
    return (<div style={{display: 'flex'}}>
      {columns.map(fields => {
        console.log('fields', fields)
      return (
        <Column>
          {fields.map(field => this.createField(field))}
        </Column>
      );
      })}
      </div>
    );
  }

  resolveMultiColumn(columns) {
    const { [MULTI_COLUMN.name]: multiColumn, } = this.props;
    if (multiColumn) {
      return this.createColumns(columns);
    }
    const fields = _.flatten(columns);//sections.reduce((current, column) => current.concat(column))
    return fields.map(field => this.createField(field))
  }

  resolveProgressiveDisclosure(preferredOptions) {
    const { [PROGRESSIVE_DISCLOSURE.name]: progressiveDisclosure, } = this.props;
    const field = {
      Radio: { ...preferredOptions, field: RadioButtonGroup },
      'Segmented Control': { ...preferredOptions, field: SegmentedControl },
    }[progressiveDisclosure];
    console.log('progressiveDisclosure', progressiveDisclosure)
    console.log('FIELD', field)
    return null;//this.createField(field);
  }

  render() {
    const styles = {};
    if (this.state.language === "English (AU)") {
      styles.transform = "rotate(180deg)";
    }

    let sectionPaymentDetails = [
      [
        { field: InputField, label: 'Beneficiary name', width: '300px' },
        { field: InputField, label: 'Bank', width: '240px' },
        { field: InputField, label: 'Branch', width: '240px' },     
      ],
      [
        { field: InputField, label: 'Account number', width: '240px' },
        { field: InputField, label: 'Account type', width: '240px' },
        { field: InputField, label: 'Amount', width: '240px' },
      ]
    ];

    let sectionNotices = [
      [
        { field: InputField, label: 'My reference', width: '240px' },
        { field: InputField, label: 'Beneficiary reference', width: '240px' },
      ],
      [
        { field: RadioButtonGroup, label: 'Send me a notice of payment by', options: ["None", "SMS", "Email", "Fax"], value: "None" },
        { field: SegmentedControl, label: 'Send beneficiary a notice of payment by', segments: ["None", "SMS", "Email", "Fax"], value: "None" },
      ],
    ];

    const fields = [
      this.createField({ field: ProgressIndicator, step: 1, totalSteps: 3 }),
      this.createField({ field: GroupHeading, label: 'Payment details' }),
      this.resolveMultiColumn([
        [
          { field: InputField, label: 'Beneficiary name', width: '300px' },
          { field: InputField, label: 'Bank', width: '240px' },
          { field: InputField, label: 'Branch', width: '240px' },
        ],
        [
          { field: InputField, label: 'Account number', width: '240px' },
          { field: InputField, label: 'Account type', width: '240px' },
          { field: InputField, label: 'Amount', width: '240px' },
        ]
      ]),
      this.createField({ field: Checkbox, label: 'Immediate Interbank Payment ' }),
      this.createField({ field: GroupHeading, label: 'Notice of payment details' }),
      this.resolveMultiColumn([
        [
          { field: InputField, label: 'My reference', width: '240px' },
          { field: InputField, label: 'Beneficiary reference', width: '240px' },
        ],
        [
          // this.resolveProgressiveDisclosure({ field: RadioButtonGroup, label: 'Send me a notice of payment by', options: ["None", "SMS", "Email", "Fax"], value: "None" }),
          // this.resolveProgressiveDisclosure({ field: SegmentedControl, label: 'Send beneficiary a notice of payment by', options: ["None", "SMS", "Email", "Fax"], value: "None" }),
        ],
      ])
    ]

    // let formContent = fields.map(field => this.createField(field))
    const formContent = fields;

    return (
      <FormContainer style={styles}>
        <Stack>
          {formContent}
        </Stack>
      </FormContainer>
    );

    // const fields = [
    //   { field: ProgressIndicator, step: 1, totalSteps: 3 },
    //   { field: GroupHeading, label: 'Payment details' },
    //   { field: InputField, label: 'Beneficiary name', width: '300px' },
    //   { field: InputField, label: 'Bank', width: '240px' },
    //   { field: InputField, label: 'Branch', width: '240px' },
    //   { field: InputField, label: 'Account number', width: '240px' },
    //   { field: InputField, label: 'Account type', width: '240px' },
    //   { field: InputField, label: 'Amount', width: '240px' },
    //   { field: Checkbox, label: 'Immediate Interbank Payment ' },
    //   { field: GroupHeading, label: 'Notice of payment details' },
    //   { field: InputField, label: 'My reference', width: '240px' },
    //   { field: InputField, label: 'Beneficiary reference', width: '240px' },
    //   { field: RadioButtonGroup, label: 'Send me a notice of payment by', options: ["None", "SMS", "Email", "Fax"], value: "None" },
    //   { field: SegmentedControl, label: 'Send beneficiary a notice of payment by', segments: ["None", "SMS", "Email", "Fax"], value: "None" },
    //   // { field: SegmentedControl, segments: ['Hello', 'Goodbye'], value: 'Hello' },
    // ];

    // return (
    //   <FormContainer style={styles}>
    //     <Stack>
    //       { fields.map(field => this.createField(field)) }
    //     </Stack>
    //   </FormContainer>
    // );

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
