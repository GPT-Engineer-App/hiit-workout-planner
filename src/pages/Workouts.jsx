import React, { useState } from "react";
import { Box, VStack, Heading, List, ListItem, ListIcon, IconButton, Input, Button, HStack, useToast } from "@chakra-ui/react";
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
      <List w="full">
        {workouts.map((workout, index) => (
          <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {workout.name} - {workout.equipment}
            </Box>
            <HStack>
              <IconButton icon={<FaEdit />} onClick={() => setNewWorkout(workouts[index])} aria-label="Edit workout" />
              <IconButton icon={<FaTrash />} onClick={() => deleteWorkout(index)} aria-label="Delete workout" />
            </HStack>
          </ListItem>
        ))}
      </List>
      <Box as="form" onSubmit={(e) => e.preventDefault()}>
        <VStack>
          <Input placeholder="Workout Name" name="name" value={newWorkout.name} onChange={handleNewWorkoutChange} />
          <Input placeholder="Equipment" name="equipment" value={newWorkout.equipment} onChange={handleNewWorkoutChange} />
          <Button leftIcon={<FaPlus />} onClick={addWorkout} colorScheme="blue">
            Add Workout
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
}

export default Workouts;
