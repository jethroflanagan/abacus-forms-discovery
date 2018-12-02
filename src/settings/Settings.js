// import produce from "immer";
import * as _ from 'lodash';

const list = (config) => ({ ...config, value: config.options[config.value] });

export const settings = {
  FORM: list({ label: '', value: 0, options: ['Connected Banking', 'DSP'] }),

  // layout
  FORM_WIDTH: { label: 'Form width', value: 580, type: 'number', min: 320, max: 1920, step: 1 },
  STRETCH_WIDTH: { label: 'Stretch to fill width', value: false },
  SINGLE_PAGE: { label: 'Single page', value: false },
  USE_GROUPS: { label: 'Group fields', value: true },
  MULTI_COLUMN: list({ label: 'Multiple columns', value: 0, options: ['Single', 'Z-pattern', 'Newspaper columns'] }),
  COLUMN_GAP: { label: 'Gap between columns', value: 10, type: 'number', min: 0, max: 50, step: 1 },
  FIELD_GAP: { label: 'Gap between fields', value: 10, type: 'number', min: 0, max: 50, step: 1 },
  GROUP_GAP: { label: 'Gap between groups', value: 20, type: 'number', min: 0, max: 50, step: 1 },

  // errors
  ERRORS_EXPAND: { label: 'Errors tap to expand', value: false },
  ERROR_BREATHING_ROOM: { label: 'Errors have breathing room', value: true },
  FORCE_ERRORS: { label: 'Show dummy errors', value: false },

  // progress
  PROGRESS_TYPE: list({ label: 'Progress type', value: 0, options: ['Progress indicator', 'Minimal progress indicator', 'Vertical step indicator', 'Step indicator', 'None'] }),
  // PROGRESS_POSITION: list({ label: 'Progress position', value: 0, options: ['Above', 'With title', 'Bottom', 'Side'] }),
  // PROGRESS_ORIENTATION: list({ label: 'Progress orientation', value: 0, options: ['Vertical', 'Horizontal', 'Mixed: main steps are horizontal', 'Mixed: main steps are vertical'] }),
  SEPARATE_PAGES_FOR_PROGRESS: list({ label: 'Progress bar sub items', value: 0, options: ['Anchors in page', 'Separate pages'] }),

  // flow
  SHOW_SUMMARY: { label: 'Show summary page', value: false },
  TYPEFORM: { label: 'Typeform mode', value: false },
  HIDDEN_FIELDS: list({ label: 'Hidden fields', value: 0, options: ['None (show as disabled)', 'Allow'] }),
  PROGRESSIVE_DISCLOSURE: list({ label: 'Progressive disclosure', value: 1, options: ['Radio', 'Segmented control', 'Tabbed radio'] }),
  INLINE_HELP: list({ label: 'Inline help', value: 0, options: ['As helper text', 'As tooltip'] }),
  UPSIDE_DOWN: { label: 'Demogorgon lair', value: false },
};

// Add 'key' name to settings for reference
_.map(settings, (setting, key) => { settings[key] = { ...setting, name: key } });


// todo
// async input
// wrapping labels

// export let settings = {
//   [STRETCH_WIDTH.name]: true,
//   [SINGLE_PAGE.name]: false,
//   [FORCE_ERRORS.name]: false,
//   [ERROR_BREATHING_ROOM.name]: true,
//   [USE_GROUPS.name]: true,
//   [MULTI_COLUMN.name]: false,
//   [FIELD_GAP.name]: 10,
//   [GROUP_GAP.name]: 10,
//   [ERRORS_EXPAND.name]: false,
//   [PROGRESS_POSITION.name]: 0,
//   [PROGRESS_TYPE.name]: 0,
//   [PROGRESS_ORIENTATION.name]: 0,
//   [INLINE_HELP.name]: 0,
//   [SHOW_SUMMARY.name]: true,
//   [TYPEFORM.name]: false,
// };

// export const updateSetting = (name, value) =>
//     settings = {
//         ...settings,
//         [name]: value,
//     }

// export const settings = (state, props) => ({
//   [STRETCH_WIDTH]: true,
//   [SINGLE_PAGE]: false,
//   [FORCE_ERRORS]: false,
//   [USE_GROUPS]: true,
// });

// export const updateSetting = (name, value) => {
//   return produce(settings, draft => {
//     console.log(settings, '|', name, '|', value)
//     draft[name] = value 
//   });
// }
