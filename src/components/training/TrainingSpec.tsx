import { Image, ImageSourcePropType, StyleSheet, View, type ViewProps } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Colors } from "@/constants/Colors";


const styles = StyleSheet.create({
    root: {
        alignItems: "flex-start",
        paddingHorizontal: '15%'
    },
    logoStyle: {
        width: 22, 
        height: 22,
        borderRadius: 4,
        marginRight: 10,
    },
    row: {
        alignItems: "flex-start",
        paddingBottom: 10
    }
})

type Props = ViewProps & {
    title: string;
    description?: string ;
    children?: React.ReactNode;
    image?: ImageSourcePropType;
    variant?: keyof typeof styles;
    color?: keyof typeof Colors["light"]
}

export function TrainingSpec({ variant, color, children, style, image, title, description, ...rest }: Props) {
    const colors = useThemeColors();
    if (!image) {
        image = require("@/../assets/images/square.png")
    }
    return <View style={[style, styles.root]} {...rest}>
        <Row style={styles.row}>
            {image && 
                <Image 
                    source={image} 
                    style={
                        [
                            styles[variant ?? 'logoStyle'], 
                            {tintColor: colors[color ?? "whiteCustom"]},
                            {backgroundColor: colors[color ?? "blackCustom"]}
                        ]
                    }
                />
            }

            <ThemedText>
                <ThemedText variant="subtitle2">{title} </ThemedText>
                 : {description ?? children }
            </ThemedText>
        </Row>
    </View>
}