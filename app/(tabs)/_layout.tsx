import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADER_TOKENS, PALETTE, getHeaderHeight } from "@/ui/tokens";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: PALETTE.BLU_PRINCIPALE,
          height: getHeaderHeight(insets.top),
        },
        headerTintColor: PALETTE.BIANCO,
        headerTitleAlign: "center",
        headerShadowVisible: true,
        headerLeftContainerStyle: {
          paddingLeft: HEADER_TOKENS.HORIZONTAL_PADDING,
        },
        headerRightContainerStyle: {
          paddingRight: HEADER_TOKENS.HORIZONTAL_PADDING,
        },
        headerTitleStyle: {
          color: PALETTE.BIANCO,
          fontWeight: "700",
          fontSize: HEADER_TOKENS.TITLE_SIZE,
        },
        tabBarActiveTintColor: PALETTE.AZZURRINO_TABBAR,
        tabBarInactiveTintColor: PALETTE.TABBAR_INATTIVO,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
        tabBarItemStyle: {
          paddingVertical: 1,
        },
        tabBarStyle: {
          backgroundColor: PALETTE.BIANCO,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#d1d1d6",
          height: 95,
          paddingTop: 2,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.05,
          shadowRadius: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orari"
        options={{
          title: "Orari",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="acquiesta"
        options={{
          title: "I miei acquisti",
          tabBarLabel: "Acquista",
          headerRight: () => (
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={PALETTE.BIANCO}
            />
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "ticket" : "ticket-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="avvisi"
        options={{
          title: "Avvisi",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="notifications-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
