import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ACTIVATION_DATE_LABEL,
  EXPIRY_DATE_LABEL,
  LAST_UPDATE_LABEL,
} from "@/state/ticket-flow-context";
import { HEADER_TOKENS } from "@/ui/tokens";

export default function ViaggioDettaglioScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + HEADER_TOKENS.TOP_OFFSET,
          paddingHorizontal: HEADER_TOKENS.HORIZONTAL_PADDING + 10,
        },
      ]}
    >
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={56 / 1.9} color="#000" />
      </Pressable>

      <View style={styles.middleSpacer} />

      <Text style={styles.lastUpdate}>Ultimo aggiornamento a {LAST_UPDATE_LABEL}</Text>
      <View style={styles.divider} />

      <Text style={styles.ticketName}>URBANO CAPOLUOGO A TEMPO</Text>

      <Text style={styles.blockLabel}>DATA DI CONVALIDA</Text>
      <Text style={styles.blockValue}>{ACTIVATION_DATE_LABEL}</Text>

      <Text style={styles.blockLabel}>FINE VALIDITÀ</Text>
      <Text style={styles.blockValue}>{EXPIRY_DATE_LABEL}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f6",
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -4,
  },
  middleSpacer: {
    height: 300,
  },
  lastUpdate: {
    textAlign: "center",
    fontSize: 16,
    color: "#8d8f96",
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: "#d4d6da",
    marginTop: 12,
    marginBottom: 14,
  },
  ticketName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#06090f",
    marginBottom: 18,
  },
  blockLabel: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#8a8d95",
  },
  blockValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: "#06090f",
  },
});
