// import produce from "immer";
import * as _ from 'lodash';
// layout
export const STRETCH_WIDTH = 'Stretch to fill width';
export const SINGLE_PAGE = 'Single page';
export const USE_GROUPS = 'Group fields';
export const MULTI_COLUMN = 'Multiple columns';
export const FIELD_GAP = 'Gap between fields';
export const GROUP_GAP = 'Gap between groups';

// errors
export const ERRORS_EXPAND = 'Errors tap to expand';
export const ERROR_BREATHING_ROOM = 'Errors have breathing room';
export const FORCE_ERRORS = 'Show dummy errors';

// progress
export const PROGRESS_POSITION = 'Progress position';
export const PROGRESS_TYPE = 'Progress type';
export const PROGRESS_ORIENTATION = 'Progress orientation';
export const SEPARATE_PAGES_FOR_PROGRESS = 'Progress bar sub items';

// flow
export const SHOW_SUMMARY = 'Show summary / confirmation page';
export const TYPEFORM = 'Typeform mode';
export const HIDDEN_FIELDS = 'Hidden fields';
export const PROGRESSIVE_DISCLOSURE = 'Progressive disclosure type';
export const INLINE_HELP = 'Inline help';

const list = (config) => ({ ...config, value: config.options[config.value] });

export const settings = {
  STRETCH_WIDTH: { value: false },
  SINGLE_PAGE: { value: true },
  USE_GROUPS: { value: true },
  MULTI_COLUMN: { value: false }, 
  FIELD_GAP: { value: 10, type: 'number' },
  GROUP_GAP: { value: 20, type: 'number' }, 
  ERRORS_EXPAND: { value: true }, 
  ERROR_BREATHING_ROOM: { value: true }, 
  FORCE_ERRORS: { value: false }, 
  PROGRESS_POSITION: list({ value: 0, options: ['Above', 'In title', 'Hidden'] }), 
  PROGRESS_TYPE: list({ value: 0, options: ['Progress indicator', 'Step indicator'] }), 
  PROGRESS_ORIENTATION: list({ value: 0, options: ['Vertical', 'Horizontal', 'Mixed: main steps are horizontal', 'Mixed: main steps are vertical'] }), 
  SEPARATE_PAGES_FOR_PROGRESS: list({ value: 0, options: ['Anchors in page', 'Separate pages'] }), 
  SHOW_SUMMARY: { value: true }, 
  TYPEFORM: { value: false }, 
  HIDDEN_FIELDS: list({ value: 0, options: ['None (show as disabled)', 'Allow'] }), 
  PROGRESSIVE_DISCLOSER: list({ value: 0, options: ['Radio', 'Segmented Control', 'Tabbed Radio header jam'] }), 
  INLINE_HELP: list({ value: 0, options: ['As helper text', 'As tooltip'] }), 
};

// Add 'key' name to settings for reference
_.map(settings, (setting, key) => { settings[key] = { ...setting, name: key } });

console.log('fix', settings)

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