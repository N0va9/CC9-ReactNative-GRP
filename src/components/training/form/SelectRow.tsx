import { useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ChevronDownIcon } from './icons';

interface Props {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    value: string | null;
    options: string[];
    onSelect: (value: string) => void;
}

export function SelectRow({ icon, label, placeholder, value, options, onSelect }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Pressable style={styles.row} onPress={() => setOpen(true)}>
                <View style={styles.iconWrap}>{icon}</View>
                <View style={styles.textWrap}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={[styles.value, value && styles.valueFilled]} numberOfLines={1}>
                        {value ?? placeholder}
                    </Text>
                </View>
                <ChevronDownIcon />
            </Pressable>

            <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
                <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
                <SafeAreaView style={styles.sheet}>
                    <Text style={styles.sheetTitle}>{label}</Text>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.option}
                                onPress={() => {
                                    onSelect(item);
                                    setOpen(false);
                                }}>
                                <Text style={styles.optionText}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, paddingHorizontal: 16 },
    iconWrap: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#fdecec', alignItems: 'center', justifyContent: 'center' },
    textWrap: { flex: 1, gap: 2 },
    label: { fontSize: 11, fontWeight: '600', color: '#8e8e93' },
    value: { fontSize: 15, color: '#c7c7cc' },
    valueFilled: { color: '#1c1c1e' },
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
    sheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%', paddingBottom: 12 },
    sheetTitle: { fontSize: 15, fontWeight: '700', padding: 20, paddingBottom: 8 },
    option: { paddingHorizontal: 20, paddingVertical: 14, borderTopWidth: 1, borderColor: '#f0f0f2' },
    optionText: { fontSize: 16, color: '#1c1c1e' },
});