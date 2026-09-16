import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getTraffic } from "../services/trafficService";
import { getWeather } from "../services/weatherService";

export default function TaskDetailScreen({ route }) {
  const { task } = route.params;

  const [weather, setWeather] = useState(null);
  const [traffic, setTraffic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const city = task?.locationArea?.trim() || "Karachi";

      const weatherData = await getWeather(city);
      setWeather(weatherData);

      const trafficData = getTraffic(city);
      setTraffic(trafficData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "High":
        return "#EF4444";
      case "Medium":
        return "#F59E0B";
      default:
        return "#10B981";
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading Task Details...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Task Card */}
      <View style={styles.mainCard}>
        <Text style={styles.taskTitle}>{task.title}</Text>

        <Text style={styles.label}>
          📚 Subject: <Text style={styles.value}>{task.subject}</Text>
        </Text>

        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor() },
          ]}
        >
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>

        <Text style={styles.label}>
          📍 Area: <Text style={styles.value}>{task.locationArea}</Text>
        </Text>

        <Text style={styles.label}>
          📅 Due Date:{" "}
          <Text style={styles.value}>
            {task.dueDate || "Not specified"}
          </Text>
        </Text>
      </View>

      {/* Weather Card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>🌤 Weather Information</Text>

        {weather ? (
          <>
            <Text style={styles.info}>
              🌡 Temperature: {weather.temp}°C
            </Text>

            <Text style={styles.info}>
              ☁ Condition: {weather.condition}
            </Text>

            <Text style={styles.info}>
              🏙 City: {weather.city}
            </Text>
          </>
        ) : (
          <Text style={styles.error}>
            Weather information unavailable
          </Text>
        )}
      </View>

      {/* Traffic Card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>🚦 Traffic Status</Text>

        {traffic ? (
          <>
            <Text style={styles.info}>
              Traffic Level: {traffic.level}
            </Text>

            <Text style={styles.info}>
              {traffic.message}
            </Text>

            {traffic.level === "Heavy" && (
              <View style={styles.warningBox}>
                <Text style={styles.warningText}>
                  ⚠ Heavy Traffic! Leave early for travel.
                </Text>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.error}>
            Traffic information unavailable
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 15,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
  },

  mainCard: {
    backgroundColor: "#4F46E5",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },

  label: {
    color: "#fff",
    marginTop: 5,
    fontSize: 15,
  },

  value: {
    fontWeight: "bold",
  },

  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginVertical: 10,
  },

  priorityText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
  },

  cardHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },

  info: {
    fontSize: 15,
    marginBottom: 6,
    color: "#374151",
  },

  error: {
    color: "red",
  },

  warningBox: {
    marginTop: 10,
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 10,
  },

  warningText: {
    color: "#B91C1C",
    fontWeight: "bold",
  },
});