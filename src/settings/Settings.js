import produce from "immer";

export const STRETCH_WIDTH = 'Stretch to fill width';
export const SINGLE_PAGE = 'Single page';
export const FORCE_ERRORS = 'Force errors';
export const ERROR_BREATHING_ROOM = 'Errors breathing room'; // have a gap left for them

export const USE_GROUPS = 'Group fields';
export const MULTI_COLUMN = 'Multiple columns';
export const GAP = 'gap';
export const GROUP_GAP = 'Gap between groups';

'Errors tap to expand'
'Progress in title'
'Hide progress'
'Use Step indicator instead of progress bar'
'Vertical mode': 'Only vertical', 'Horizontal for main', 'Vertical for main'
'Inline help': 'As helper text', 'As tooltip'
'Show summary/confirmation page'
'Typeform mode'

// todo
// async input
// wrapping labels

export const settings = {
  [STRETCH_WIDTH]: true,
  [SINGLE_PAGE]: false,
  [FORCE_ERRORS]: false,
  [USE_GROUPS]: true,
  [GAP]: 10,
}

// export const settings = (state, props) => ({
//   [STRETCH_WIDTH]: true,
//   [SINGLE_PAGE]: false,
//   [FORCE_ERRORS]: false,
//   [USE_GROUPS]: true,
// });