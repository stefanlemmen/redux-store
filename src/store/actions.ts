export const ADD_TODO = '[TODO] Add Todo';
export const REMOVE_TODO = '[TODO] Remove Todo';

export class AddTodo {
  readonly type = ADD_TODO;
  constructor(private payload: any) {
  }
}
export class RemoveTodo {
  readonly type = REMOVE_TODO;
  constructor(private payload: any) {
  }
}
