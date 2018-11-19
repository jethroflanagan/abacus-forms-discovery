import produce from "immer";

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
export const FORCE_ERRORS = { name: 'Force errors' };

// progress
export const PROGRESS_POSITION = { name: 'Progress in title', options: ['Above', 'In title', 'Hidden'] };
export const PROGRESS_TYPE = { name: 'Progress type', options: ['Progress indicator', 'Step indicator'] };
export const PROGRESS_ORIENTATION = { name: 'Progress orientation', options: ['Vertical', 'Horizontal', 'Mixed: main steps are horizontal', 'Mixed: main steps are vertical'] };

// flow
export const SHOW_SUMMARY = { name: 'Show summary / confirmation page' };
export const TYPEFORM = { name: 'Typeform mode' };

// help
export const INLINE_HELP = { name: 'Inline help', options: ['As helper text', 'As tooltip'] };

// todo
// async input
// wrapping labels

export const settings = {
  [STRETCH_WIDTH.name]: true,
  [SINGLE_PAGE.name]: false,
  [FORCE_ERRORS.name]: false,
  [ERROR_BREATHING_ROOM.name]: true,
  [USE_GROUPS.name]: true,
  [MULTI_COLUMN.name]: false,
  [FIELD_GAP.name]: 10,
  [GROUP_GAP.name]: 10,
  [ERRORS_EXPAND.name]: false,
  [PROGRESS_POSITION.name]: 0,
  [PROGRESS_TYPE.name]: 0,
  [PROGRESS_ORIENTATION.name]: 0,
  [INLINE_HELP.name]: 0,
  [SHOW_SUMMARY.name]: true,
  [TYPEFORM.name]: false,
}

// export const settings = (state, props) => ({
//   [STRETCH_WIDTH]: true,
//   [SINGLE_PAGE]: false,
//   [FORCE_ERRORS]: false,
//   [USE_GROUPS]: true,
// });

export const updateSetting = (name) => {
  return produce(settings, draft => {
    // console.log(settings, '|', name, '|', draft)
    draft[name] = true 
  });
}