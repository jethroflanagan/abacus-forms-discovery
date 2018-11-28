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

// import "./styles.css";

const FormContainer = styled.div`
  width: ${ p => p.width + 'px' || '100%' };
  padding: 20px;
`;

const FieldContainer = styled.div`
  width: 100%;
  margin-bottom: ${ p => p.FIELD_GAP || 0 }px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  column-gap: ${p => p.COLUMN_GAP}px;
`;
const TableColumnLayout = styled(Table)`
  display: grid;
  grid-template-rows: repeat(${ p => p.rows}, 1fr);
  grid-auto-flow: column;
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
      STRETCH_WIDTH,
      ERROR_BREATHING_ROOM,
      FIELD_GAP,
    } = this.props;
    return {
      field: {
        ...preferred,
        width: STRETCH_WIDTH ? '100%': preferred.width,
        alwaysShowHelperText: ERROR_BREATHING_ROOM,
      },
      container: {
        FIELD_GAP,
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

  createColumns(direction, fields) {
    const options = { COLUMN_GAP: this.props.COLUMN_GAP };
    if (direction === 'Newspaper columns') {
      return (
        <TableColumnLayout rows={Math.ceil(fields.length / 2)} {...options}>
          {fields}
        </TableColumnLayout>
      );
    }
    return (
      <Table {...options}>
        {fields}
      </Table>
    );
  }

  resolveMultiColumn(...fields) {
    const { MULTI_COLUMN } = this.props;
    if (MULTI_COLUMN !== 'Single') {
      return this.createColumns(MULTI_COLUMN, fields);
    }
    return fields;
  }

  resolveProgressiveDisclosure(preferredOptions) {
    const { PROGRESSIVE_DISCLOSURE } = this.props;
    const field = {
      Radio: { ...preferredOptions, field: RadioButtonGroup },
      'Segmented Control': { ...preferredOptions, field: SegmentedControl },
    }[PROGRESSIVE_DISCLOSURE];
    return field;
//     return this.createField(field);
  }

  render() {
    const styles = {};
    if (this.props.UPSIDE_DOWN) {
      styles.transform = "rotate(180deg)";
    }

//     let sectionPaymentDetails = [
//       [
//         { field: InputField, label: 'Beneficiary name', width: '300px' },
//         { field: InputField, label: 'Bank', width: '240px' },
//         { field: InputField, label: 'Branch', width: '240px' },     
//       ],
//       [
//         { field: InputField, label: 'Account number', width: '240px' },
//         { field: InputField, label: 'Account type', width: '240px' },
//         { field: InputField, label: 'Amount', width: '240px' },
//       ]
//     ];

//     let sectionNotices = [
//       [
//         { field: InputField, label: 'My reference', width: '240px' },
//         { field: InputField, label: 'Beneficiary reference', width: '240px' },
//       ],
//       [
//         { field: RadioButtonGroup, label: 'Send me a notice of payment by', options: ["None", "SMS", "Email", "Fax"], value: "None" },
//         { field: SegmentedControl, label: 'Send beneficiary a notice of payment by', segments: ["None", "SMS", "Email", "Fax"], value: "None" },
//       ],
//     ];

    const fields = [
      this.createField({ field: ProgressIndicator, step: 1, totalSteps: 3 }),
      this.createField({ field: GroupHeading, label: 'Payment details' }),
      this.resolveMultiColumn(
        this.createField({ field: InputField, label: 'Beneficiary name', width: '300px' }),
        this.createField({ field: InputField, label: 'Bank', width: '200px' }),
        this.createField({ field: InputField, label: 'Branch', width: '150px' }),
        this.createField({ field: InputField, label: 'Account number', width: '200px' }),
        this.createField({ field: InputField, label: 'Account type', width: '200px' }),
        this.createField({ field: InputField, label: 'Amount', width: '150px' }),
      ),
      this.createField({ field: Checkbox, label: 'Immediate Interbank Payment' }),
      this.createField({ field: GroupHeading, label: 'Notice of payment details' }),
      this.resolveMultiColumn(
        this.createField({ field: InputField, label: 'My reference', width: '240px' }),
        this.createField({ field: InputField, label: 'Beneficiary reference', width: '240px' }),
        this.createField(this.resolveProgressiveDisclosure({ field: RadioButtonGroup, label: 'Send me a notice of payment by', options: ["None", "SMS", "Email", "Fax"], value: "None" })),
        this.createField(this.resolveProgressiveDisclosure({ field: SegmentedControl, label: 'Send beneficiary a notice of payment by', options: ["None", "SMS", "Email", "Fax"], value: "None" })),
      ),
      <Button type="primary" label="Pay" />
    ]

    // let formContent = fields.map(field => this.createField(field))
    const formContent = fields;

    return (
      <FormContainer width={this.props.FORM_WIDTH}>
        <Stack style={styles}>
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
