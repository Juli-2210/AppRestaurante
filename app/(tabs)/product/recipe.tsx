import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const foodItems = [
  {
    id: "1",
    recipe: "Cocina la carne, tuesta el pan, agrega los ingredientes y disfruta.",
  },
  {
    id: "2",
    recipe: "Extiende la masa, agrega los ingredientes y hornea a 220°C por 15 minutos.",
  },
  {
    id: "3",
    recipe: "Enrolla los ingredientes en el alga y corta en piezas pequeñas.",
  },
  {
    id: "4",
    recipe: "Mezcla los ingredientes y añade el aderezo al final.",
  },
];

export default function RecipeScreen() {
  const { id } = useLocalSearchParams();
  const product = foodItems.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receta</Text>
      <Text style={styles.recipe}>{product.recipe}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  recipe: { fontSize: 16, color: "#555", textAlign: "center" },
});
