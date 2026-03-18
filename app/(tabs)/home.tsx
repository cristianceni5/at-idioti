import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, type Region } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

import { PALETTE } from "@/ui/tokens";

const INITIAL_REGION: Region = {
  latitude: 43.6587,
  longitude: 11.4558,
  latitudeDelta: 0.022,
  longitudeDelta: 0.015,
};

const busStops = [
  { id: "bus-1", latitude: 43.6602, longitude: 11.4534, icon: "bus-outline" as const },
  { id: "bus-2", latitude: 43.6569, longitude: 11.4516, icon: "ticket-outline" as const },
  { id: "bus-3", latitude: 43.6548, longitude: 11.4571, icon: "bus-outline" as const },
  { id: "bus-4", latitude: 43.6526, longitude: 11.4541, icon: "ticket-outline" as const },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        <Marker coordinate={{ latitude: 43.6587, longitude: 11.4558 }}>
          <View style={styles.userMarkerWrap}>
            <View style={styles.userMarkerDot} />
          </View>
        </Marker>

        {busStops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
          >
            <View style={styles.stopMarker}>
              <Ionicons
                name={stop.icon}
                size={15}
                color={stop.icon === "bus-outline" ? "#1f4db5" : "#e4ac00"}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.sheet}>
        <View style={styles.dragHandle} />
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={26} color={PALETTE.BIANCO} />
          <Text style={styles.searchText}>Pianifica il tuo viaggio</Text>
        </View>
        <Text style={styles.sectionTitle}>Andiamo?</Text>
        <View style={styles.quickCard}>
          <Ionicons name="locate-outline" size={18} color={PALETTE.BIANCO} />
          <Text style={styles.quickText}>Fermate vicino a te</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e8e2",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  userMarkerWrap: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PALETTE.BLU_PRINCIPALE,
  },
  userMarkerDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#ffffff",
  },
  stopMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#d6d9e0",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
  },
  dragHandle: {
    alignSelf: "center",
    width: 44,
    height: 3,
    borderRadius: 999,
    marginBottom: 9,
    backgroundColor: "#8fa8dd",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: "#0d2f69",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchText: {
    color: PALETTE.BIANCO,
    fontSize: 14,
  },
  sectionTitle: {
    color: PALETTE.BIANCO,
    fontWeight: "700",
    fontSize: 27,
    marginTop: 12,
  },
  quickCard: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "#1a4ca3",
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quickText: {
    color: PALETTE.BIANCO,
    fontSize: 13,
    fontWeight: "600",
  },
});

