import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Statut } from '../types';


const STATUTS: { value: Statut; label: string }[] = [
    { value: 'RH', label: 'Responsable RH/Formation' },
    { value: 'Salarie', label: 'Salarié' },
    { value: 'Particulier', label: 'Particulier' },
    { value: 'DemandeurEmploi', label: "Demandeur d'emploi" },
    { value: 'Autre', label: 'Autre' },
];

interface Props {
    value: Statut | null;
    onChange: (value: Statut) => void;
}

export function StatutList({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            {STATUTS.map(({ value: optionValue, label }) => {
                const selected = value === optionValue;
                return (
                    <Pressable
                        key={optionValue}
                        style={[styles.row, selected && styles.rowSelected]}
                        onPress={() => onChange(optionValue)}>
                        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
                        <View style={[styles.radio, selected && styles.radioSelected]} />
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 8 },
    row: {
        height: 48,
        borderRadius: 14,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5ea',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    rowSelected: { 
        backgroundColor: '#fdecec', 
        borderColor: '#dc2626', 
        borderWidth: 1.5 
    },
    label: { 
        fontSize: 14, 
        color: '#3a3a3c' 
    },
    labelSelected: { color: '#1c1c1e', fontWeight: '600' },
    radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: '#c7c7cc' },
    radioSelected: { borderWidth: 5, borderColor: '#dc2626', backgroundColor: '#fff' },
});