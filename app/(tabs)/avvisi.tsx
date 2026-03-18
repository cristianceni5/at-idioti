import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const serviceAreas = [
  "Arezzo",
  "Firenze",
  "Grosseto",
  "Livorno",
  "Lucca",
  "Massa Carrara",
  "Pisa",
  "Pistoia",
  "Prato",
  "Siena",
];

export default function AvvisiScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.segmented}>
        <View style={styles.segmentActive}>
          <Text style={styles.segmentActiveText}>In corso</Text>
        </View>
        <View style={styles.segmentInactive}>
          <Text style={styles.segmentInactiveText}>Prossimamente</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Linee preferite</Text>
      <View style={styles.cardMuted}>
        <Text style={styles.mutedText}>
          Trova qui le informazioni sul traffico delle tue linee preferite
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Stato del servizio</Text>
        <Text style={styles.statusCount}>10 / 10</Text>
      </View>

      {serviceAreas.map((city) => (
        <View key={city} style={styles.cityRow}>
          <Text style={styles.cityLabel}>{city}</Text>
          <View style={styles.alertCircle}>
            <Ionicons name="warning" size={13} color="#fff" />
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
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    gap: 8,
  },
  segmented: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 3,
    backgroundColor: "#d5d5d8",
  },
  segmentActive: {
    flex: 1,
    borderRadius: 9,
    paddingVertical: 8,
    backgroundColor: "#f0f0f1",
    alignItems: "center",
  },
  segmentInactive: {
    flex: 1,
    borderRadius: 9,
    paddingVertical: 8,
    alignItems: "center",
  },
  segmentActiveText: {
    fontSize: 15,
    fontWeight: "700",
  },
  segmentInactiveText: {
    fontSize: 15,
    color: "#171717",
  },
  sectionTitle: {
    marginTop: 6,
    fontSize: 19,
    fontWeight: "700",
    color: "#2a2f36",
  },
  cardMuted: {
    borderRadius: 12,
    backgroundColor: "#f2f2f3",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  mutedText: {
    fontSize: 14,
    lineHeight: 16 * 1.45,
    fontStyle: "italic",
    color: "#666a71",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
  },
  statusCount: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2a2f36",
  },
  cityRow: {
    borderRadius: 12,
    backgroundColor: "#f5f5f6",
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#30333a",
  },
  alertCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ee7b00",
  },
});
