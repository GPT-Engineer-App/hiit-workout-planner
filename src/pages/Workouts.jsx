import React, { useState } from "react";
import { Box, VStack, Heading, Table, Thead, Tbody, Tr, Th, Td, IconButton, Select, Button, HStack, Input, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ name: "", equipment: "" });
  const toast = useToast();

  const handleNewWorkoutChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout({ ...newWorkout, [name]: value });
  };

  const addWorkout = () => {
    if (!newWorkout.name || !newWorkout.equipment) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setWorkouts([...workouts, newWorkout]);
    setNewWorkout({ name: "", equipment: "" });
  };

  const updateWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index] = newWorkout;
    setWorkouts(updatedWorkouts);
    setNewWorkout({ name: "", equipment: "" });
  };

  const deleteWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
  };

  return (
    <VStack>
      <Heading>Manage Workouts</Heading>
      <Table w="full">
        <Thead>
          <Tr>
            <Th>Workout Name</Th>
            <Th>Equipment</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workouts.map((workout, index) => (
            <Tr key={index}>
              <Td>{workout.name}</Td>
              <Td>{workout.equipment}</Td>
              <Td>
                <IconButton icon={<FaEdit />} onClick={() => setNewWorkout(workouts[index])} aria-label="Edit workout" />
                <IconButton icon={<FaTrash />} onClick={() => deleteWorkout(index)} aria-label="Delete workout" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box as="form" onSubmit={(e) => e.preventDefault()}>
        <VStack>
          <Input placeholder="Workout Name" name="name" value={newWorkout.name} onChange={handleNewWorkoutChange} />
          <Select placeholder="Select equipment" name="equipment" value={newWorkout.equipment} onChange={handleNewWorkoutChange}>
            <option value="Bodyweight Only">Bodyweight Only</option>
            <option value="Dumbbells">Dumbbells</option>
            <option value="Kettlebell">Kettlebell</option>
            <option value="Pull-up Bar">Pull-up Bar</option>
          </Select>
          <Button leftIcon={<FaPlus />} onClick={addWorkout} colorScheme="blue">
            Add Workout
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
}

export default Workouts;
