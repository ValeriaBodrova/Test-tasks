import { create } from 'zustand';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  addTodo: (text) => set((state) => {
    const newTodo = { id: Date.now(), text, completed: false };
    const updatedTodos = [...state.todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    return { todos: updatedTodos };
  }),
  removeTodo: (id) => set((state) => {
    const updatedTodos = state.todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    return { todos: updatedTodos };
  }),
  toggleTodo: (id) => set((state) => {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    return { todos: updatedTodos };
  }),
  editTodo: (id, text) => set((state) => {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    return { todos: updatedTodos };
  }),
}));

export default useTodoStore;
