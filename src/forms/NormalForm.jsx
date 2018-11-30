import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Stack } from "../components/Stack";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { Dropdown } from "../components/Dropdown";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { Checkbox } from "../components/Checkbox";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { SegmentedControl } from "../components/SegmentedControl";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { MinimalProgressIndicator } from "../components/MinimalProgressIndicator";
import { GroupHeading } from "../components/GroupHeading";
import { ThankYou } from './ThankYou';

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
const ButtonRow = styled.div`
  display: flex;
  /* padding: 20px; */
  justify-content: flex-end;
  & > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export class NormalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      language: "English (ZA)",
      isComplete: false,
      formValues: {},
    };
  }
  onUpdateLanguage(language) {
    this.setState({
      language
    });
  }

  onUpdateValue(id, value) {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [id]: value,
      },
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
    const idPrefix = preferredOptions.idPrefix ? preferredOptions.idPrefix : '';
    const id = idPrefix + (preferredOptions.id || preferredOptions.label);
    return (
      <FieldContainer {...options.container} key={id} >
        <Field {...options.field} onUpdateValue={(value) => this.onUpdateValue(id, value)} value={this.state.formValues[id]} />
      </FieldContainer>
    );
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

  // buttons
  createButtonRow(...buttons) {
    return (
      <ButtonRow key='button row'>
        { buttons.map(({ label, action, type }) => (
          <Button type={type || 'primary'} label={label || 'Submit'} onClick={action || (() => this.submit())} key={label} />
        ))}
      </ButtonRow>
    );
  }

  submit() {
    console.log('submit');
    this.setState({ isComplete: true });
  }

  // TODO: pass in as ...{ fields, buttonRow }
  resolvePaging(...pages) {
    const { SINGLE_PAGE } = this.props;

    const submitButton = { label: 'Send', action: () => this.submit() };

    if (SINGLE_PAGE) {
      return _.flatten([...pages, this.createButtonRow(submitButton)]);
    }

    const { page } = this.state;
    const fields = pages[page];
    // return fields;
    const buttons = [
    ];
    if (page > 0) {
      buttons.push({ label: 'Previous', type: 'tertiary', action: () => this.previousPage() });
    }
    if (page + 1 < pages.length) {
      buttons.push({ label: 'Next', action: () => this.nextPage() });
    }
    if (page + 1 === pages.length) {
      buttons.push(submitButton);
    }

    const { PROGRESS_TYPE } = this.props;
    const progressBarOptions = {
      'Progress indicator': { field: ProgressIndicator },
      'Minimal progress indicator': { field: MinimalProgressIndicator },
      'Step indicator': { field: ProgressIndicator },
      'None': null,
    }[PROGRESS_TYPE];
    const progressBar = progressBarOptions
      ? this.createField({ ...progressBarOptions, step: page + 1, totalSteps: pages.length })
      : null;
    return [
      progressBar,
      ...fields,
      this.createButtonRow(...buttons)
    ];
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
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  reset() {
    this.setState({
      page: 0,
      formValues: {},
      isComplete: false,
    });
  }

  render() {
    const { isComplete } = this.state;
    const styles = {};
    if (this.props.UPSIDE_DOWN) {
      styles.transform = "rotate(180deg)";
    }

    const asField = (...args) => this.createField(...args);
    const asPages = (...args) => this.resolvePaging(...args);
    const asColumns = (...args) => this.resolveMultiColumn(...args);
    const asDisclosure = (...args) => this.resolveProgressiveDisclosure(...args);

    const createSendNotice = (idPrefix) => ({
      'None': null,
      'SMS': [
        asField({ field: InputField, idPrefix, label: 'Cellphone number' }),
      ],
      'Email': [
        asField({ field: InputField, idPrefix, label: 'Name', placeholder: 'Beneficiary' }),
        asField({ field: InputField, idPrefix, label: 'Email', placeholder: 'e.g. beneficiary@email.com' }),
      ],
      'Fax': [
        asField({ field: InputField, idPrefix, label: 'Fax number' }),
      ],
    });

    const fields = [
      ...asPages([
        asField({ field: GroupHeading, label: 'Payment details' }),
        asColumns(
          asField({ field: InputField, label: 'Beneficiary name', width: '300px' }),
          asField({ field: Dropdown, label: 'Bank', width: '200px', options: ['Absa', 'Capitec', 'First National Bank', 'Nedbank', 'Standard Bank'] }),
          asField({ field: InputField, label: 'Branch', width: '150px' }),
          asField({ field: InputField, label: 'Account number', width: '200px', type: 'number' }),
          asField({ field: Dropdown, label: 'Account type', width: '200px', options: ['Cheque', 'Savings'] }),
          asField({ field: InputField, label: 'Amount', width: '150px', type: 'number' }),
        ),
        asField({ field: Checkbox, label: 'Immediate Interbank Payment', helperText: ({ checked }) => checked ? 'You have selected to pay a beneficiary at another bank. IIP is more expensive but if you choose to make an IIP the payment will be cleared immediately.' : '' }),
      ],

      [
        asField({ field: GroupHeading, label: 'Notice of payment details' }),
        asColumns(
          asField({ field: InputField, label: 'My reference', width: '240px' }),
          asField({ field: InputField, label: 'Beneficiary reference', width: '240px' }),
          asField(
            asDisclosure({ field: RadioButtonGroup, label: 'Send me a notice of payment by', options: ["None", "SMS", "Email", "Fax"], active: 0, tabs: createSendNotice('send me') })
          ),
          asField(
            asDisclosure({ field: SegmentedControl, label: 'Send beneficiary a notice of payment by', options: ["None", "SMS", "Email", "Fax"], active: 0, tabs: createSendNotice('send beneficiary') })
          ),
        ),
      ]),
    ];

    const formContent = isComplete ? <ThankYou reset={() => this.reset()}/> : fields;

    return (
      <FormContainer width={this.props.FORM_WIDTH}>
        <Stack style={styles}>
          {formContent}
        </Stack>
      </FormContainer>
    );
  }
}
