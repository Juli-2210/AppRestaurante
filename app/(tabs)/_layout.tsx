import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // ✅ Oculta el encabezado para evitar "index" arriba
        tabBarStyle: { backgroundColor: "#000", paddingBottom: 5 }, // Ajuste de diseño
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: "#00FA9A", // Color verde neón
        tabBarInactiveTintColor: "#888",
      }}
    >
      {/* ✅ Mantiene solo la pestaña Home */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false, // ✅ Evita que aparezca el título "index" arriba
        }}
      />

      {/* ✅ Oculta las demás pestañas completamente */}
      <Tabs.Screen name="product" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="product/recipe" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="product/ingredientes" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="product/[id]" options={{ href: null, headerShown: false }} />

    </Tabs>
  );
}
