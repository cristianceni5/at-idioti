import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTicketFlow } from "@/state/ticket-flow-context";
import { getTicketDateLabels } from "@/ui/ticket-date-labels";
import { HEADER_TOKENS } from "@/ui/tokens";

export default function ViaggioDettaglioScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state } = useTicketFlow();
  const labels = getTicketDateLabels(new Date(), state.activationStartedAt);

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

      <View style={styles.qrCard}>
        <Ionicons name="qr-code-outline" size={210} color="#0f1116" />
      </View>

      <Text style={styles.lastUpdate}>Ultimo aggiornamento a {labels.lastUpdateLabel}</Text>
      <View style={styles.divider} />

      <Text style={styles.ticketName}>URBANO CAPOLUOGO A TEMPO</Text>

      <Text style={styles.blockLabel}>DATA DI CONVALIDA</Text>
      <Text style={styles.blockValue}>{labels.activationDateLabel}</Text>

      <Text style={styles.blockLabel}>FINE VALIDITÀ</Text>
      <Text style={styles.blockValue}>{labels.expiryDateLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f6",
  },
  closeButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
    marginBottom: 1,
    marginTop: -20,
  },
  qrCard: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 340,
    height: 300,
    marginBottom: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 12,
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
