import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const products: Record<string, { name: string; price: string; description: string; image: string }> = {
  "1": { name: "Hamburguesa", price: "$5.99", description: "Deliciosa hamburguesa con queso y papas fritas.", image: "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/ZQUGSWWM2BBZXHEPBPMRIWX46U.jpg" },
  "2": { name: "Pizza", price: "$8.99", description: "Pizza de pepperoni con queso extra.", image: "https://www.saborusa.com/ni/wp-content/uploads/sites/19/2019/10/Disfruta-una-suculenta-pizza-al-estilo-New-York-en-Bogota-Foto-destacada.png" },
  "3": { name: "Sushi", price: "$12.99", description: "Sushi de salmón fresco con aguacate.", image: "https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/general/sushi-empanizado/main-header.jpg" }
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams();

  // Asegurarse de que id es un string
  const productId = Array.isArray(id) ? id[0] : id;

  const product = productId ? products[productId] : null;

  if (!product) {
    return <Text style={styles.errorText}>Producto no encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: "bold" },
  price: { fontSize: 18, color: "#888", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", paddingHorizontal: 20 },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 }
});
