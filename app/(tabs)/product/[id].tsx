import { View, Text, Image, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const foodItems = [
  {
    id: "1",
    name: "Hamburguesa Clásica",
    description: "Deliciosa hamburguesa con carne jugosa, queso y vegetales frescos.",
    image: "https://media.gq.com.mx/photos/649391b89ec62ce6c5b091a5/16:9/w_2560%2Cc_limit/mejores-hamburguesas.jpg",
    ingredients: ["Carne", "Pan", "Lechuga", "Tomate", "Queso", "Salsa"],
    recipe: "Cocina la carne, tuesta el pan, agrega los ingredientes y disfruta.",
  },
  {
    id: "2",
    name: "Pizzas",
    description: "Pizza tradicional italiana con tomate, mozzarella y albahaca.",
    image: "https://www.saborusa.com/ni/wp-content/uploads/sites/19/2019/10/Disfruta-una-suculenta-pizza-al-estilo-New-York-en-Bogota-Foto-destacada.png",
    ingredients: ["Masa", "Tomate", "Queso Mozzarella", "Albahaca"],
    recipe: "Extiende la masa, agrega los ingredientes y hornea a 220°C por 15 minutos.",
  },
  {
    id: "3",
    name: "Sushi Variado",
    description: "Selección de sushi fresco con pescado y vegetales.",
    image: "https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/general/sushi-empanizado/main-header.jpg",
    ingredients: ["Arroz", "Alga", "Salmón", "Aguacate", "Salsa de Soja"],
    recipe: "Enrolla los ingredientes en el alga y corta en piezas pequeñas.",
  },
  {
    id: "4",
    name: "Panzerotti",
    description: "Delicioso pan relleno con queso y tomate, acompañado de salsa especial.",
    image: "https://criderfoods.com/wp-content/uploads/2015/05/ckn-e48-chicken-panzerotti-006.jpg",
    ingredients: ["Lechuga", "Pollo", "Crutones", "Queso Parmesano", "Aderezo César"],
    recipe: "Mezcla los ingredientes y añade el aderezo al final.",
  },
];

export default function ProductScreen() {
  const { id } = useLocalSearchParams(); // Obtiene el id del producto
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
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* ✅ Configuración de las Tabs */}
      <Tabs>
        <Tabs.Screen name="ingredients" options={{ title: "Ingredientes" }} />
        <Tabs.Screen name="recipe" options={{ title: "Receta" }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  image: { width: 250, height: 200, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: "bold" },
  description: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 10 },
});
