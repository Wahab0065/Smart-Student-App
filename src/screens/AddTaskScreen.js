import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskContext } from "../context/TaskContext";

export default function AddTaskScreen({ navigation }) {
  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [area, setArea] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const scaleValue = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const saveTask = () => {
    if (!title || !subject || !area || !dueDate) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }

    const task = {
      id: Date.now().toString(),
      title,
      subject,
      priority,
      dueDate,
      locationArea: area,
    };

    addTask(task);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.header}>📚 New Study Task</Text>

        <TextInput
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
          style={styles.input}
        />

        <TextInput
          placeholder="Area (DHA, Gulshan...)"
          value={area}
          onChangeText={setArea}
          style={styles.input}
        />

        <TextInput
          placeholder="Due Date (e.g. 15 June)"
          value={dueDate}
          onChangeText={setDueDate}
          style={styles.input}
        />

        <Text style={styles.label}>Priority</Text>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
          >
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        </View>

        <Animated.View
          style={{
            transform: [{ scale: scaleValue }],
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              animatePress();
              saveTask();
            }}
          >
            <Text style={styles.buttonText}>Save Task</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4338CA",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#374151",
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },

  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});