// import produce from "immer";

// layout
export const STRETCH_WIDTH = { name: 'Stretch to fill width' };
export const SINGLE_PAGE = { name: 'Single page' };
export const USE_GROUPS = { name: 'Group fields' };
export const MULTI_COLUMN = { name: 'Multiple columns' };
export const FIELD_GAP = { name: 'Gap between fields', type: 'number' };
export const GROUP_GAP = { name: 'Gap between groups', type: 'number' };

// errors
export const ERRORS_EXPAND = { name: 'Errors tap to expand' };
export const ERROR_BREATHING_ROOM = { name: 'Errors have breathing room' };
export const FORCE_ERRORS = { name: 'Show dummy errors' };

// progress
export const PROGRESS_POSITION = { name: 'Progress position', options: ['Above', 'In title', 'Hidden'] };
export const PROGRESS_TYPE = { name: 'Progress type', options: ['Progress indicator', 'Step indicator'] };
export const PROGRESS_ORIENTATION = { name: 'Progress orientation', options: ['Vertical', 'Horizontal', 'Mixed: main steps are horizontal', 'Mixed: main steps are vertical'] };
export const SEPARATE_PAGES_FOR_PROGRESS = { name: 'Progress bar sub items', options: ['Anchors in page', 'Separate pages'] };

// flow
export const SHOW_SUMMARY = { name: 'Show summary / confirmation page' };
export const TYPEFORM = { name: 'Typeform mode' };
export const HIDDEN_FIELDS = { name: 'Hidden fields', options: ['None (show as disabled)', 'Allow'] };
export const PROGRESSIVE_DISCLOSER = { name: 'Progressive disclosure type', options: ['Radio', 'Segmented Control', 'Tabbed Radio header jam'] };
export const INLINE_HELP = { name: 'Inline help', options: ['As helper text', 'As tooltip'] };


// export const SETTINGS = {
//   STRETCH_WIDTH: {},
//   SINGLE_PAGE: {},
//   USE_GROUPS: {},
//   MULTI_COLUMN: {}, 
//   FIELD_GAP: { type: 'number' },
//   GROUP_GAP: { type: 'number' }, 
//   ERRORS_EXPAND: {}, 
//   ERROR_BREATHING_ROOM: {}, 
//   FORCE_ERRORS: {}, 
//   PROGRESS_POSITION: {}, 
//   PROGRESS_TYPE: {}, 
//   PROGRESS_ORIENTATION: {}, 
//   SEPARATE_PAGES_FOR_PROGRESS: {}, 
//   SHOW_SUMMARY: {}, 
//   TYPEFORM: {}, 
//   HIDDEN_FIELDS: {}, 
//   PROGRESSIVE_DISCLOSER: {}, 
//   INLINE_HELP: {}, 
// };


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