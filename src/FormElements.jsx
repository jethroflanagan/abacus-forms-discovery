import React from "react";
import ReactDOM from "react-dom";
import { Stack } from './components/Stack';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { ToggleSwitch } from './components/ToggleSwitch';
import { RadioButtonGroup } from './components/RadioButtonGroup';
import { SegmentedControl } from './components/SegmentedControl';
import { ProgressIndicator } from './components/ProgressIndicator';

import {
  STRETCH_WIDTH,
  SINGLE_PAGE,
  FORCE_ERRORS,
  USE_GROUPS,
  MULTI_COLUMN,
} from './settings/Settings';


import "./styles.css";

export function FormElements(props) {
  return (
    <div>
      <h1>Form Elements</h1>
      <Stack>
        <Button label={'hello' + props[STRETCH_WIDTH]} type="primary" />
        <InputField />
        <ToggleSwitch />
        <SegmentedControl />
        <RadioButtonGroup options={['Yes', 'Ask later', 'Never']} value="Yes" />
        <ProgressIndicator step={1} totalSteps={3} />
      </Stack>
    </div>
  );
}
