import React, { useState } from "react";
import { Box, VStack, Heading, Table, Thead, Tbody, Tr, Th, Td, IconButton, Select, Button, Input, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Workouts() {
  const [workouts, setWorkouts] = useState([
    { name: "Jumping Jacks", equipment: "Bodyweight Only" },
    { name: "Push-ups", equipment: "Bodyweight Only" },
    { name: "Burpees", equipment: "Bodyweight Only" },
    { name: "High Knees", equipment: "Bodyweight Only" },
    { name: "Mountain Climbers", equipment: "Bodyweight Only" },
    { name: "Plank", equipment: "Bodyweight Only" },
    { name: "Squats", equipment: "Bodyweight Only" },
    { name: "Lunges", equipment: "Bodyweight Only" },
    { name: "Kettlebell Swings", equipment: "Kettlebell" },
    { name: "Dumbbell Snatches", equipment: "Dumbbells" },
    { name: "Deadlifts", equipment: "Dumbbells" },
    { name: "Bench Press", equipment: "Dumbbells" },
    { name: "Pull-ups", equipment: "Pull-up Bar" },
    { name: "Dips", equipment: "Pull-up Bar" },
  ]);
  const [newWorkout, setNewWorkout] = useState({ name: "", equipment: "" });
  const toast = useToast();

  const [editingIndex, setEditingIndex] = useState(-1);
  const [equipmentFilter, setEquipmentFilter] = useState("");

  const handleNewWorkoutChange = (e) => {
    const { name, value } = e.target;
    if (editingIndex >= 0) {
      const updatedWorkouts = [...workouts];
      updatedWorkouts[editingIndex] = { ...updatedWorkouts[editingIndex], [name]: value };
      setWorkouts(updatedWorkouts);
    } else {
      setNewWorkout({ ...newWorkout, [name]: value });
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewWorkout(workouts[index]);
  };

  const handleFilterChange = (event) => {
    setEquipmentFilter(event.target.value);
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
    const workoutWithId = { ...newWorkout, id: new Date().getTime() };
    setWorkouts((prevWorkouts) => [...prevWorkouts, workoutWithId]);
    setNewWorkout({ name: "", equipment: "" });
  };

  const updateWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index] = newWorkout;
    setWorkouts(updatedWorkouts);
    setNewWorkout({ name: "", equipment: "" });
  };

  const deleteWorkout = (index) => {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== workouts[index].id);
    setWorkouts(updatedWorkouts);
  };

  return (
    <VStack>
      <Heading>Manage Workouts</Heading>
      <Box as="form" onSubmit={(e) => e.preventDefault()}>
        <VStack>
          <Input placeholder="Workout Name" name="name" value={newWorkout.name} onChange={handleNewWorkoutChange} />
          <Select placeholder="Select equipment" name="equipment" value={newWorkout.equipment} onChange={handleNewWorkoutChange}>
            <option value="Bodyweight Only">Bodyweight Only</option>
            <option value="Dumbbells">Dumbbells</option>
            <option value="Kettlebell">Kettlebell</option>
            <option value="Pull-up Bar">Pull-up Bar</option>
            <option value="Box">Box</option>
          </Select>
          <Button leftIcon={<FaPlus />} onClick={addWorkout} colorScheme="blue">
            Add Workout
          </Button>
        </VStack>
      </Box>
      <Select placeholder="Filter by equipment" onChange={handleFilterChange} value={equipmentFilter} mb="4">
        <option value="">All Equipment</option>
        <option value="Bodyweight Only">Bodyweight Only</option>
        <option value="Dumbbells">Dumbbells</option>
        <option value="Kettlebell">Kettlebell</option>
        <option value="Pull-up Bar">Pull-up Bar</option>
        <option value="Box">Box</option>
      </Select>
      <Table w="full">
        <Thead>
          <Tr>
            <Th>Workout Name</Th>
            <Th>Equipment</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workouts
            .filter((workout) => equipmentFilter === "" || workout.equipment === equipmentFilter)
            .map((workout, index) => (
              <Tr key={workout.id}>
                <Td>{workout.name}</Td>
                <Td>{workout.equipment}</Td>
                <Td>
                  <IconButton icon={<FaEdit />} onClick={() => handleEditClick(index)} aria-label="Edit workout" marginRight={2} />
                  <IconButton icon={<FaTrash />} onClick={() => deleteWorkout(index)} aria-label="Delete workout" colorScheme="red" />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      // This form has been removed as per the update request
    </VStack>
  );
}

export default Workouts;
