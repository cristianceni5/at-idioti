import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  HISTORY_DAY_LABEL,
  HISTORY_TIME_LABEL,
  useTicketFlow,
} from "@/state/ticket-flow-context";
import { HEADER_TOKENS, PALETTE, getHeaderHeight } from "@/ui/tokens";

function formatRemaining(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

export default function ViaggioScreen() {
  const router = useRouter();
  const { state } = useTicketFlow();
  const [qrOpen, setQrOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const headerHeight = getHeaderHeight(insets.top);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            height: headerHeight,
            paddingTop: insets.top + HEADER_TOKENS.TOP_OFFSET,
            paddingBottom: HEADER_TOKENS.BOTTOM_PADDING,
            paddingHorizontal: HEADER_TOKENS.HORIZONTAL_PADDING,
          },
        ]}
      >
        <Pressable style={styles.headerBack} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
          <Text style={styles.headerBackText}>Indietro</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Il mio viaggio</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inUseRow}>
          <Text style={styles.inUseText}>In uso</Text>
          <Ionicons name="hourglass-outline" size={28} color="#7789a8" />
        </View>

        <Pressable style={styles.ticketCard} onPress={() => router.push("/viaggio-dettaglio")}>
          <View style={styles.ticketTop}>
            <View style={styles.brandRow}>
              <Image source={require("../ui/logo-at-white.png")} style={styles.brandIcon} />
              <Text style={styles.brand}>at-bus.it</Text>
            </View>
            <View style={styles.ticketTitleRow}>
              <Text style={styles.ticketTitle}>Biglietto</Text>
              <Text style={styles.ticketTitleEn}>Ticket</Text>
            </View>
            <Text style={styles.ticketSub}>Urbano capoluogo</Text>
          </View>

          <View style={styles.ticketBottom}>
            <Text style={styles.ticketBottomLabel}>Fine della validità:</Text>
            <Text style={styles.ticketBottomTime}>{formatRemaining(state.remainingSeconds)}</Text>
          </View>
        </Pressable>

        <View style={styles.historyWrap}>
          <Text style={styles.historyTitle}>Storico biglietti</Text>
          <View style={styles.dayPill}>
            <Text style={styles.dayPillText}>{HISTORY_DAY_LABEL}</Text>
          </View>

          <View style={styles.historyRow}>
            <View>
              <Text style={styles.historySmall}>1 convalida</Text>
              <Text style={styles.historyMain}>URBANO CAPOLUOGO A TEMPO</Text>
            </View>
            <Text style={styles.historyTime}>{HISTORY_TIME_LABEL}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.qrWrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable style={styles.qrButton} onPress={() => setQrOpen(true)}>
          <Text style={styles.qrText}>Visualizza il QR code</Text>
        </Pressable>
      </View>

      <Modal
        visible={qrOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setQrOpen(false)}
      >
        <View style={styles.qrModalRoot}>
          <View style={styles.qrModalHeader}>
            <Text style={styles.qrModalTitle}>QR code</Text>
            <Pressable onPress={() => setQrOpen(false)}>
              <Ionicons name="close" size={30} color="#0f1116" />
            </Pressable>
          </View>
          <View style={styles.qrCard}>
            <Ionicons name="qr-code-outline" size={220} color="#0f1116" />
          </View>
          <Text style={styles.qrCaption}>Mostra questo codice al controllo.</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8eb",
  },
  header: {
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.28)",
  },
  headerBack: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: HEADER_TOKENS.SIDE_SLOT_WIDTH,
    height: HEADER_TOKENS.CONTENT_HEIGHT,
  },
  headerBackText: {
    color: "#fff",
    fontSize: HEADER_TOKENS.BACK_LABEL_SIZE,
    marginLeft: -2,
    fontWeight: "500",
  },
  headerTitle: {
    color: "#fff",
    fontSize: HEADER_TOKENS.TITLE_SIZE,
    fontWeight: "700",
  },
  headerSpacer: {
    minWidth: HEADER_TOKENS.SIDE_SLOT_WIDTH,
    height: HEADER_TOKENS.CONTENT_HEIGHT,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 16,
  },
  inUseRow: {
    marginTop: 14,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inUseText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#355280",
  },
  ticketCard: {
    alignSelf: "center",
    width: 300,
    backgroundColor: "#ffffff",
    marginTop: 12,
    marginHorizontal: 18,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  ticketTop: {
    backgroundColor: "#33b2a3",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  brandIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  brand: {
    fontSize: 10,
    color: "#e8fffb",
    fontWeight: "700",
  },
  ticketTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ticketTitle: {
    fontSize: 16,
    color: "#f4fffe",
    fontWeight: "700",
  },
  ticketTitleEn: {
    fontSize: 16,
    color: "#f4fffe",
    fontStyle: "italic",
  },
  ticketSub: {
    marginTop: 3,
    color: "#eafffc",
    fontSize: 12,
  },
  ticketBottom: {
    backgroundColor: "#000",
    paddingVertical: 8,
    alignItems: "center",
  },
  ticketBottomLabel: {
    color: "#8f9196",
    fontSize: 14,
  },
  ticketBottomTime: {
    marginTop: 2,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  historyWrap: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#cfd3d8",
    paddingTop: 18,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3a3d42",
    textAlign: "center",
    marginBottom: 10,
  },
  dayPill: {
    alignSelf: "flex-start",
    marginLeft: 18,
    borderRadius: 8,
    backgroundColor: "#d3d4d8",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  dayPillText: {
    color: "#4f535a",
    fontSize: 13,
  },
  historyRow: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d8dade",
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historySmall: {
    fontSize: 14,
    color: "#33363d",
  },
  historyMain: {
    marginTop: 2,
    fontSize: 17,
    fontWeight: "700",
    color: "#21242a",
  },
  historyTime: {
    fontSize: 17,
    fontWeight: "700",
    color: "#272a2f",
  },
  qrWrap: {
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  qrButton: {
    height: 62,
    borderRadius: 14,
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    alignItems: "center",
    justifyContent: "center",
  },
  qrText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  qrModalRoot: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    paddingTop: 56,
    paddingHorizontal: 20,
  },
  qrModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qrModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f1116",
  },
  qrCard: {
    marginTop: 34,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d9dce2",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
  },
  qrCaption: {
    marginTop: 16,
    fontSize: 14,
    color: "#515662",
    textAlign: "center",
  },
});
