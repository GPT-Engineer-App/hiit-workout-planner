import React, { useState } from "react";
import { Box, Button, Checkbox, CheckboxGroup, Container, FormControl, FormLabel, Heading, Select, Stack, Text, VStack, Divider, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaDumbbell, FaRunning, FaClock, FaCheckCircle } from "react-icons/fa";

const workouts = {
  noEquipment: [
    { name: "Jumping Jacks", equipment: "None" },
    { name: "Push-ups", equipment: "None" },
    { name: "Burpees", equipment: "None" },
    { name: "High Knees", equipment: "None" },
    { name: "Mountain Climbers", equipment: "None" },
    { name: "Plank", equipment: "None" },
    { name: "Squats", equipment: "None" },
    { name: "Lunges", equipment: "None" },
  ],
  withEquipment: [
    { name: "Kettlebell Swings", equipment: "Kettlebell" },
    { name: "Dumbbell Snatches", equipment: "Dumbbells" },
    { name: "Deadlifts", equipment: "Dumbbells" },
    { name: "Bench Press", equipment: "Dumbbells" },
    { name: "Pull-ups", equipment: "Pull-up Bar" },
    { name: "Dips", equipment: "Pull-up Bar" },
  ],
};

const Index = () => {
  const [workoutTime, setWorkoutTime] = useState(0);
  const [equipment, setEquipment] = useState([]);
  const [generatedWorkout, setGeneratedWorkout] = useState([]);

  const handleTimeChange = (event) => {
    setWorkoutTime(event.target.value);
  };

  const handleEquipmentChange = (event) => {
    const { value } = event.target;
    setEquipment((prevEquipment) => (prevEquipment.includes(value) ? prevEquipment.filter((item) => item !== value) : [...prevEquipment, value]));
  };

  const generateWorkout = () => {
    const workoutTypes = equipment.includes("Bodyweight Only") ? workouts.noEquipment : workouts.withEquipment;
    const filteredWorkouts = workoutTypes.filter((w) => equipment.length === 0 || equipment.includes(w.equipment));
    const roundTime = 2;
    const rounds = Math.floor(workoutTime / (workoutTypes.length * roundTime));
    const routine = [];

    for (let round = 0; round < rounds; round++) {
      const shuffledExercises = [...filteredWorkouts].sort(() => 0.5 - Math.random());
      shuffledExercises.forEach((exercise) => {
        // Reset the routine array to ensure a fresh workout is generated
        routine.push({
          name: exercise.name,
          duration: 0.5,
          rest: 0.25,
        });
      });
    }

    setGeneratedWorkout(routine);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading>HIIT Workout Generator</Heading>

        <FormControl>
          <FormLabel htmlFor="workout-time">
            <Stack direction="row" align="center">
              <FaClock />
              <Text>Workout Time (minutes):</Text>
            </Stack>
          </FormLabel>
          <Select id="workout-time" placeholder="Select workout time" value={workoutTime} onChange={handleTimeChange}>
            <option value="7">7 minutes - 2 rounds</option>
            <option value="13">13 minutes - 4 rounds</option>
            <option value="19">19 minutes - 6 rounds</option>
            <option value="25">25 minutes - 8 rounds</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>
            <Stack direction="row" align="center">
              <FaDumbbell />
              <Text>Equipment:</Text>
            </Stack>
          </FormLabel>
          <CheckboxGroup value={equipment} onChange={(values) => setEquipment(values)}>
            <Stack direction="column">
              <Checkbox value="Bodyweight Only">Bodyweight Only</Checkbox>
              <Checkbox value="Dumbbells">Dumbbells</Checkbox>
              <Checkbox value="Kettlebell">Kettlebell</Checkbox>

              <Checkbox value="Pull-up Bar">Pull-up Bar</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <Button colorScheme="blue" onClick={() => generateWorkout()} leftIcon={<FaRunning />}>
          Generate Workout
        </Button>

        {generatedWorkout.length > 0 && (
          <>
            <Divider />
            <Heading size="md">Your Workout Routine:</Heading>
            <List spacing={3}>
              {generatedWorkout.map((exercise, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {exercise.name} - {exercise.duration} mins
                </ListItem>
              ))}
            </List>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
