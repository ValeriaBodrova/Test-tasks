import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Heading,
  Text,
  Checkbox,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import useTodoStore from './store';

const App: React.FC = () => {
  const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const toast = useToast();

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      toast({
        title: 'Todo text is required',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    addTodo(newTodo);
    setNewTodo('');
  };

  const handleEditTodo = (id: number, text: string) => {

    setIsEditing(id);
    setEditingText(text);
  };

  const handleSaveEdit = (id: number) => {
   
    if (editingText.trim() === '') {
      toast({
        title: 'Todo text is required',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
   
    editTodo(id, editingText);
    setIsEditing(null);
    setEditingText('');
    console.log(editingText);
  };

  return (
    <Box p={4} maxW="600px" mx="auto">
      <VStack spacing={4}>
        <Heading>Todo App</Heading>
        <HStack w="100%">
          <Input
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button onClick={handleAddTodo}>Add</Button>
        </HStack>

        <VStack spacing={4} align="stretch" w="100%">
          <Heading size="md">Uncompleted</Heading>
          {todos
          
            .filter((todo) => !todo.completed)
            .map((todo) => (
              
              <HStack key={todo.id} justify="space-between">
                <Checkbox
                  isChecked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
               >  </Checkbox>
                  
                  {isEditing === todo.id ? (
                    <Input
                      placeholder="change your value"
                      value={editingText}
                     onChange={(e) => setEditingText(e.target.value)}
                    />
                    
                  ) : (
                    <Text>{todo.text}</Text>
                  )}
             
                <HStack>
               
                  {isEditing === todo.id ? (
                    <Button onClick={() => handleSaveEdit(todo.id)}>Save</Button>
                  ) : (
                    <>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => removeTodo(todo.id)}
                      />
                    </>
                  )}
                </HStack>
              </HStack>
            ))}
        </VStack>

        <VStack spacing={4} align="stretch" w="100%">
          <Heading size="md">Completed</Heading>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <HStack key={todo.id} justify="space-between">
                <Checkbox
                  isChecked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                >
                  
                </Checkbox>
               
                <HStack>
                {isEditing === todo.id ? (
                    <Input
                    type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  ) : (
                    <Text as="s">{todo.text}</Text>
                  )}
                  </HStack>
                <HStack>
                
                  {isEditing === todo.id ? (
                    <Button onClick={() => handleSaveEdit(todo.id)}>Save</Button>
                  ) : (
                    <>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => removeTodo(todo.id)}
                      />
                    </>
                  )}
                </HStack>
              </HStack>
            ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default App;
