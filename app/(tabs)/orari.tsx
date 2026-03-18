import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const departures = [
  { line: "A1", route: "Stazione FS -> Centro", eta: "3 min" },
  { line: "8", route: "Ospedale -> Duomo", eta: "7 min" },
  { line: "12", route: "Ponte Nuovo -> Stazione", eta: "11 min" },
  { line: "S5", route: "Scuole -> Terminal", eta: "18 min" },
];

export default function OrariScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.searchCard}>
        <Ionicons name="search-outline" size={20} color="#6d7685" />
        <Text style={styles.searchText}>Trova linea o fermata</Text>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.filterActive}>
          <Text style={styles.filterActiveText}>Urbano</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Extraurbano</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Scolastico</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Prossime partenze</Text>

      {departures.map((departure) => (
        <View key={departure.line} style={styles.departureCard}>
          <View style={styles.linePill}>
            <Text style={styles.linePillText}>{departure.line}</Text>
          </View>
          <View style={styles.departureInfo}>
            <Text style={styles.departureRoute}>{departure.route}</Text>
            <Text style={styles.departureEta}>{departure.eta}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8eb",
  },
  content: {
    padding: 12,
    gap: 8,
    paddingBottom: 16,
  },
  searchCard: {
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d8dde5",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchText: {
    fontSize: 14,
    color: "#5f6774",
  },
  filterRow: {
    marginTop: 2,
    flexDirection: "row",
    gap: 5,
  },
  filterActive: {
    borderRadius: 9,
    backgroundColor: "#143f8e",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  filter: {
    borderRadius: 9,
    backgroundColor: "#f2f2f4",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  filterActiveText: {
    color: "#fff",
    fontWeight: "700",
  },
  filterText: {
    color: "#404652",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c313a",
    marginTop: 4,
    marginBottom: 4,
  },
  departureCard: {
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e5ea",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 8,
  },
  linePill: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16ab97",
  },
  linePillText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  departureInfo: {
    flex: 1,
  },
  departureRoute: {
    fontSize: 13,
    color: "#2d3139",
    fontWeight: "600",
  },
  departureEta: {
    marginTop: 2,
    color: "#616b79",
    fontSize: 12,
  },
});
