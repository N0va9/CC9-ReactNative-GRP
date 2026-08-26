import { useCallback, useMemo, useState } from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { CalendarIcon, ChevronDownIcon } from './icons';

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

// on formate "à la main" plutôt que via Intl/Date : plus fiable, certains
// environnements RN/Hermes n'embarquent pas toutes les données ICU (locale fr)
function formatDisplayDate(iso: string) {
    const [year, month, day] = iso.split('-').map(Number);
    return `${day} ${MONTHS_FR[month - 1]} ${year}`;
}

interface Props {
    label: string;
    placeholder: string;
    value: string | null; // format ISO 'YYYY-MM-DD'
    onSelect: (isoDate: string) => void;
    minDate?: string;
}

export function DatePickerRow({ label, placeholder, value, onSelect, minDate }: Props) {
    const [open, setOpen] = useState(false);

    const marked = useMemo(() => {
        if (!value) return {};
        return { [value]: { selected: true, selectedColor: '#dc2626' } };
    }, [value]);

    const handleDayPress = useCallback(
        (day: DateData) => {
            onSelect(day.dateString);
            setOpen(false);
        },
        [onSelect],
    );

    return (
        <>
            <Pressable style={styles.row} onPress={() => setOpen(true)}>
                <View style={styles.iconWrap}>
                    <CalendarIcon />
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={[styles.value, value && styles.valueFilled]} numberOfLines={1}>
                        {value ? formatDisplayDate(value) : placeholder}
                    </Text>
                </View>
                <ChevronDownIcon />
            </Pressable>

            <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
                <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
                <SafeAreaView style={styles.sheet}>
                    <Text style={styles.sheetTitle}>{label}</Text>
                    <Calendar
                        current={value ?? undefined}
                        minDate={minDate ?? new Date().toISOString().split('T')[0]}
                        markedDates={marked}
                        onDayPress={handleDayPress}
                        firstDay={1}
                        theme={{
                            todayTextColor: '#dc2626',
                            selectedDayBackgroundColor: '#dc2626',
                            selectedDayTextColor: '#ffffff',
                            arrowColor: '#dc2626',
                            textMonthFontWeight: '700',
                            textDayFontSize: 15,
                            textMonthFontSize: 15,
                        }}
                        style={styles.calendar}
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
    sheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 20 },
    sheetTitle: { fontSize: 15, fontWeight: '700', padding: 20, paddingBottom: 4 },
    calendar: { paddingHorizontal: 12, paddingBottom: 8 },
});