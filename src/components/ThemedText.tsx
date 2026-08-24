import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
    body3: {
        fontSize: 10,
        lineHeight: 16,
    },
    headline: {
        fontSize: 15,
        lineHeight: 26,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 8,
        lineHeight: 12,
    },
    subtitle1: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "bold",
    },
    subtitle2: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "bold",
    },
    subtitle3: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "bold",
    },
    formationTitle: {
        fontSize: 30,
        lineHeight:30,
        fontWeight: "bold",
    },
    emailStyle: {
        fontSize: 10,
        fontStyle: "italic"
     }
});

type Props = TextProps & {
    variant?: keyof typeof styles, 
    color?: keyof typeof Colors["light"]
}

export function ThemedText ({variant, color, style, ...rest}: Props) {
    const colors = useThemeColors();
    return <Text style={
        [styles[variant ?? 'body3'], 
        {color: colors[color ?? "blackCustom"]}, 
        style ]} {...rest} />
}

