import { useContext } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskContext } from "../context/TaskContext";

export default function TaskListScreen({ navigation }) {
  const { tasks, deleteTask } = useContext(TaskContext);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#EF4444";
      case "Medium":
        return "#F59E0B";
      default:
        return "#10B981";
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>📚 Smart Student Assistant</Text>

        <View style={styles.counterCard}>
          <Text style={styles.counterNumber}>{tasks.length}</Text>
          <Text style={styles.counterText}>Total Tasks</Text>
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.addBtnText}>+ Add New Task</Text>
      </TouchableOpacity>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📖</Text>
          <Text style={styles.emptyTitle}>No Study Tasks</Text>
          <Text style={styles.emptySub}>
            Tap the button above to create your first task.
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.taskCard}
              onPress={() =>
                navigation.navigate("Details", { task: item })
              }
              onLongPress={() =>
                Alert.alert(
                  "Delete Task",
                  `Delete "${item.title}"?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => deleteTask(item.id),
                    },
                  ]
                )
              }
            >
              <View style={styles.taskTop}>
                <Text style={styles.taskTitle}>{item.title}</Text>

                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor: getPriorityColor(
                        item.priority
                      ),
                    },
                  ]}
                >
                  <Text style={styles.priorityText}>
                    {item.priority}
                  </Text>
                </View>
              </View>

              <Text style={styles.subject}>
                📚 {item.subject}
              </Text>

              <Text style={styles.area}>
                📍 {item.locationArea}
              </Text>

              <Text style={styles.date}>
                📅 {item.dueDate}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 15,
  },

  header: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 15,
  },

  counterCard: {
    backgroundColor: "#4F46E5",
    padding: 18,
    borderRadius: 18,
  },

  counterNumber: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  counterText: {
    color: "#E0E7FF",
    marginTop: 4,
  },

  addBtn: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },

  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  taskCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 4,
  },

  taskTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },

  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  priorityText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  subject: {
    marginTop: 10,
    color: "#4B5563",
  },

  area: {
    marginTop: 5,
    color: "#4B5563",
  },

  date: {
    marginTop: 5,
    color: "#4B5563",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptySub: {
    marginTop: 8,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});