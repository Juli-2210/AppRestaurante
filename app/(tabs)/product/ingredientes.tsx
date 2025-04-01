import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const API_DETAIL_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export default function IngredientesScreen() {
  const { id } = useLocalSearchParams(); // Obtener el ID del producto
  const [meal, setMeal] = useState<{ strMeal: string; strMealThumb: string } | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Evita que la API se llame sin ID válido

    fetch(`${API_DETAIL_URL}${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          const mealData = data.meals[0];

          // Extraer ingredientes y medidas
          const extractedIngredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            const measure = mealData[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
              extractedIngredients.push(`${measure} ${ingredient}`);
            }
          }

          setMeal(mealData);
          setIngredients(extractedIngredients);
        }
      })
      .catch(error => console.error("Error al obtener los ingredientes:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#ff6347" style={styles.loader} />;

  return (
    <ImageBackground 
      source={{ uri: "https://static.vecteezy.com/system/resources/previews/007/591/385/non_2x/hand-drawn-fast-food-decorative-background-vector.jpg" }}
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {meal ? (
          <>
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

            <View style={styles.ingredientsContainer}>
              <Text style={styles.subtitle}>Ingredientes:</Text>
              {ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredientText}>• {ingredient}</Text>
              ))}
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>No se encontraron ingredientes 1.</Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 }, // ✅ Imagen de fondo repetida
  container: { padding: 15, alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.9)" }, // ✅ Leve transparencia para mejor lectura
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10, color: "#ff6347" },
  image: { width: "90%", height: 200, borderRadius: 10, marginBottom: 10 },
  ingredientsContainer: { width: "100%", paddingHorizontal: 20, marginTop: 10 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  ingredientText: { fontSize: 16, marginBottom: 5, textAlign: "left" },
  errorText: { fontSize: 18, color: "red", marginTop: 20 },
  loader: { marginTop: 50 },
});
