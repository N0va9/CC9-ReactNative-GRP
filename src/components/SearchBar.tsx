import { TextInput, StyleSheet } from "react-native";
import { Row } from "@/components/Row";
import { Image } from 'react-native';
import { useThemeColors } from "@/hooks/useThemeColors";


type Props = {
    value: string, 
    onChange: (s: string) => void
}

export function SearchBar({value, onChange}: Props) {
    const colors = useThemeColors();
    return <Row gap={8} style={[styles.wrapper, {backgroundColor: colors.whiteCustom}]}>
        <Image
            source={require("@/../assets/images/search.png")}
            style={{
                width: 16,
                height: 16, 
                tintColor: colors.redCustom
            }}
        />
        <TextInput 
            style={[styles.input]} 
            onChangeText={onChange} 
            value={value} 
            cursorColor={colors.blackCustom}
            placeholder="Rechercher via nom"
        />
    </Row>
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12,
    },
    input: {
        flex:1,
        lineHeight: 16,
        height: 40,
        fontSize: 10,
    }
})