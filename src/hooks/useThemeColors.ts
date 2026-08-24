import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export function useThemeColors () { // Renvoie les couleurs selon le thème choisi par l'utilisateur
    const theme = useColorScheme() ?? "light"; // Utilise le thème light par défaut
    return Colors[theme];
}