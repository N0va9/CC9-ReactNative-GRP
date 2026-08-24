import { ViewStyle, Image, View, Pressable, StyleSheet} from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { printDuration, customSlice } from "@/utils/format";


type Props = {
    style?: ViewStyle,
    name: string,
    slug: string,
    duration: string,
    objectives: string,

}

export function TrainingCard ({style, name, slug, duration, objectives }: Props) {
    const colors = useThemeColors()
    return <Link href={{pathname: "/formation/[slug]", params: {slug: slug}}} asChild>
        <Pressable android_ripple={{color: colors.greenCustom2, foreground: true}} style={style}>
            <Card style={[styles.card, {height: 160}]}>

                <View style= {{alignItems: "center",}} >
                    <ThemedText variant="subtitle3" style={{textAlign: 'center'}}>{customSlice(name, 60)}</ThemedText>
                    <ThemedText variant="caption" style={{textAlign: 'center'}}>{customSlice(objectives, 100-customSlice(name, 60).length)}</ThemedText>
                </View>


                <View style={[styles.shadow, styles.cardFooter, {backgroundColor: colors.beigeCustom}]}>
                    <Image source={require("@/../assets/images/logo-calendar.png")} style={[styles.logo, { tintColor: colors.greenCustom }]}/>
                    <ThemedText variant="caption"> {printDuration(duration)}</ThemedText>
                </View>
                
            </Card>
        </Pressable>
    </Link>
}

const styles = StyleSheet.create({
    shadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 22,
        borderRadius: 7
    }, 
    cardFooter: {
        flexDirection: 'row', 
        alignItems: "center",  
        justifyContent: 'flex-end', 
        paddingRight: 5
    },
    logo: {
        height: 16,
        width: 16,
    },
    card: {
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative',
        overflow: 'hidden',
    },
})