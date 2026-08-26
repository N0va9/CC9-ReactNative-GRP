import { ComponentProps } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

type Props = {
    label: string;
    containerStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

export function FormField({ label, containerStyle, ...rest }: Props) {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} placeholderTextColor="#c7c7cc" {...rest} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 6 },
    label: { fontSize: 12, fontWeight: '600', color: '#8e8e93' },
    input: {
        height: 48,
        borderRadius: 14,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5ea',
        paddingHorizontal: 14,
        fontSize: 15,
        color: '#1c1c1e',
    },
});