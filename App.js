import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TaskProvider } from "./src/context/TaskContext";

import AddTaskScreen from "./src/screens/AddTaskScreen";
import TaskDetailScreen from "./src/screens/TaskDetailScreen";
import TaskListScreen from "./src/screens/TaskListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4F46E5",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Tasks"
            component={TaskListScreen}
            options={{ title: "Study Tasks" }}
          />

          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{
              title: "Add Task",
              presentation: "modal", // assignment requirement
            }}
          />

          <Stack.Screen
            name="Details"
            component={TaskDetailScreen}
            options={{ title: "Task Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}