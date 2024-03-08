import React, { useState } from "react";
import { Box, Button, Checkbox, CheckboxGroup, Container, FormControl, FormLabel, Heading, Input, Stack, Text, VStack, Divider, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaDumbbell, FaRunning, FaClock, FaCheckCircle } from "react-icons/fa";

const workouts = {
  noEquipment: ["Jumping Jacks", "Push-ups", "Burpees", "High Knees", "Mountain Climbers", "Plank", "Squats", "Lunges"],
  withEquipment: ["Kettlebell Swings", "Dumbbell Snatches", "Barbell Squats", "Deadlifts", "Bench Press", "Pull-ups", "Dips", "Barbell Rows"],
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
    const availableWorkouts = equipment.length > 0 ? workouts.withEquipment : workouts.noEquipment;
    const workoutLength = availableWorkouts.length;
    const routine = [];
    const interval = Math.max(Math.floor(workoutTime / workoutLength), 1);

    for (let i = 0; i < workoutLength; i++) {
      routine.push({
        name: availableWorkouts[i % workoutLength],
        duration: interval,
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
          <Input id="workout-time" type="number" value={workoutTime} onChange={handleTimeChange} />
        </FormControl>

        <FormControl>
          <FormLabel>
            <Stack direction="row" align="center">
              <FaDumbbell />
              <Text>Equipment:</Text>
            </Stack>
          </FormLabel>
          <CheckboxGroup value={equipment}>
            <Stack direction="row">
              <Checkbox value="Dumbbells" onChange={handleEquipmentChange}>
                Dumbbells
              </Checkbox>
              <Checkbox value="Kettlebell" onChange={handleEquipmentChange}>
                Kettlebell
              </Checkbox>
              <Checkbox value="Barbell" onChange={handleEquipmentChange}>
                Barbell
              </Checkbox>
              <Checkbox value="Pull-up Bar" onChange={handleEquipmentChange}>
                Pull-up Bar
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <Button colorScheme="blue" onClick={generateWorkout} leftIcon={<FaRunning />}>
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
