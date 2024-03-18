import { NoteType } from '../types/NoteType';

const SET = 'notes/SET';
const DELETE = 'notes/DELETE';
const UPDATE = 'notes/UPDATE';
const SET_EDITING_NOTE = 'notes/SET_EDITING_NOTE';
const CLEAR_EDITING_NOTE = 'notes/CLEAR_EDITING_NOTE';
const SET_SELECTED_NOTE = 'notes/SET_SELECTED_NOTE';
const CLEAR_SELECTED_NOTE = 'notes/CLEAR_SELECTED_NOTE';

type SetNoteAction = { type: typeof SET; payload: NoteType[] };
type DeleteNoteAction = { type: typeof DELETE; payload: string };
type UpdateNoteAction = { type: typeof UPDATE; payload: NoteType };
type SetEditingNoteAction = {
  type: typeof SET_EDITING_NOTE;
  payload: NoteType | null;
};
type ClearEditingNoteAction = {
  type: typeof CLEAR_EDITING_NOTE;
};
type SetSelectedNoteAction = {
  type: typeof SET_SELECTED_NOTE;
  payload: NoteType | null;
};
type ClearSelectedNoteAction = {
  type: typeof CLEAR_SELECTED_NOTE;
};

const setNote = (notesValue: NoteType[]): SetNoteAction => ({
  type: SET,
  payload: notesValue,
});

const deleteNote = (noteId: string): DeleteNoteAction => ({
  type: DELETE,
  payload: noteId,
});

const updateNote = (note: NoteType): UpdateNoteAction => ({
  type: UPDATE,
  payload: note,
});

const setEditingNote = (note: NoteType | null): SetEditingNoteAction => ({
  type: SET_EDITING_NOTE,
  payload: note,
});

const clearEditingNote = (): ClearEditingNoteAction => ({
  type: CLEAR_EDITING_NOTE,
});

const setSelectedNote = (note: NoteType | null): SetSelectedNoteAction => ({
  type: SET_SELECTED_NOTE,
  payload: note,
});

const clearSelectedNote = (): ClearSelectedNoteAction => ({
  type: CLEAR_SELECTED_NOTE,
});

export const actions = {
  setNote,
  deleteNote,
  updateNote,
  setEditingNote,
  clearEditingNote,
  setSelectedNote,
  clearSelectedNote,
};

type Action =
  | SetNoteAction
  | DeleteNoteAction
  | UpdateNoteAction
  | SetEditingNoteAction
  | SetSelectedNoteAction
  | ClearSelectedNoteAction
  | ClearEditingNoteAction;

const initialState = {
  notes: [] as NoteType[],
  editingNote: null as NoteType | null,
  selectedNote: null as NoteType | null,
};

const notesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET:
      return { ...state, notes: action.payload };

    case DELETE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case UPDATE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note,
        ),
      };

    case SET_EDITING_NOTE:
      return { ...state, editingNote: action.payload };

    case CLEAR_EDITING_NOTE:
      return { ...state, editingNote: null };

    case SET_SELECTED_NOTE:
      return { ...state, selectedNote: action.payload };

    case CLEAR_SELECTED_NOTE:
      return { ...state, selectedNote: null };

    default:
      return state;
  }
};

export default notesReducer;
