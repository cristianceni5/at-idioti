import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PALETTE } from "@/ui/tokens";

const menuItems = [
  { label: "Cristian Ceni", icon: "person-circle" as const },
  { label: "Preferiti", icon: "heart" as const },
  { label: "Mappe delle reti", icon: "map" as const },
  { label: "Link utili", icon: "link" as const },
  { label: "Parla con at", icon: "mail" as const },
  { label: "Informativa sulla privacy", icon: "document-text" as const },
  { label: "Impostazioni", icon: "settings" as const },
];

export default function MenuScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBg} />
      <View style={styles.bottomBg} />
      <Image source={require("../../ui/logo-at-sega.png")} style={styles.waves} />

      <Image source={require("../../ui/logo-at-full.png")} style={styles.logo} />

      <View style={styles.panel}>
        {menuItems.map((item, index) => (
          <Pressable
            key={item.label}
            style={[styles.row, index < menuItems.length - 1 && styles.rowBorder]}
          >
            <View style={styles.rowLeft}>
              <Ionicons name={item.icon} size={34} color={PALETTE.AZZURRINO_TABBAR} />
              <Text style={styles.rowLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={PALETTE.AZZURRINO_TABBAR} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe0e2",
  },
  content: {
    minHeight: "100%",
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  topBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: "#e5e5e7",
  },
  bottomBg: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 290,
    backgroundColor: PALETTE.BLU_PRINCIPALE,
  },
  waves: {
    position: "absolute",
    width: 300,
    height: 300,
    right: -56,
    bottom: 0,
    opacity: 0.36,
    resizeMode: "contain",
  },
  logo: {
    alignSelf: "center",
    width: 120,
    height: 80,
    resizeMode: "contain",
    marginBottom: 12,
  },
  panel: {
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#f7f7f8",
  },
  row: {
    height: 74,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#d4d8dc",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#36404d",
  },
});
