import { NoteType } from '../types/NoteType';

const SET = 'notes/SET';
const DELETE = 'notes/DELETE';
const UPDATE = 'notes/UPDATE';
const SET_EDITING_NOTE = 'notes/SET_EDITING_NOTE';

type SetNoteAction = { type: typeof SET; payload: NoteType[] };
type DeleteNoteAction = { type: typeof DELETE; payload: string };
type UpdateNoteAction = { type: typeof UPDATE; payload: NoteType };
type SetEditingNoteAction = {
  type: typeof SET_EDITING_NOTE;
  payload: NoteType | null;
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

export const actions = { setNote, deleteNote, updateNote, setEditingNote };

type Action =
  | SetNoteAction
  | DeleteNoteAction
  | UpdateNoteAction
  | SetEditingNoteAction;

const initialState = {
  notes: [] as NoteType[],
  editingNote: null as NoteType | null,
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
    default:
      return state;
  }
};

export default notesReducer;
