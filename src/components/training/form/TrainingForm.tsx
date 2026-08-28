import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Civilite, initialFormData, InscriptionFormData } from '../types';
import { DatePickerRow } from './DatePickerRow';
import { FormField } from './FormField';
import { ChevronLeftIcon, PinIcon } from './icons';
import { SelectRow } from './SelectRow';
import { StatutList } from './StatutList';



const LIEUX = ['Bordeaux','Bruxelles','Distance','Genève','Lille','Luxembourg','Lyon','Marseille','Montpellier','Mantes','Nice','Paris','Rennes','Strasbourg','Toulouse'];

interface Props {
    onSubmit: (data: InscriptionFormData) => void;
    onCancel?: () => void;
}

function isFormValid(data: InscriptionFormData) {
    return (
        !!data.lieu &&
        !!data.date &&
        !!data.civilite &&
        !!data.nom.trim() &&
        !!data.prenom.trim() &&
        /\S+@\S+\.\S+/.test(data.email) &&
        !!data.statut
    );
}

export function TrainingForm({ onSubmit, onCancel }: Props) {
    const [formData, setFormData] = useState<InscriptionFormData>(initialFormData);

    const updateForm = useCallback((patch: Partial<InscriptionFormData>) => {
        setFormData((prev) => ({ ...prev, ...patch }));
    }, []);

    const canSubmit = useMemo(() => isFormValid(formData), [formData]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" >

                <View style={styles.header}>
                    {onCancel && (
                        <Pressable onPress={onCancel} hitSlop={12} style={styles.backButton}>
                            <ChevronLeftIcon />
                            <Text style={styles.eyebrow}>Formation</Text>
                        </Pressable>
                    )}
                    <Text style={styles.title}>Demander un devis</Text>
                    <Text style={styles.subtitle}>Renseignez vos coordonnées, notre équipe revient vers vous sous 48h.</Text>
                </View>

                <View style={styles.card}>
                    <SelectRow
                        icon={<PinIcon />}
                        label="Lieu"
                        placeholder="Choisissez un lieu"
                        value={formData.lieu}
                        options={LIEUX}
                        onSelect={(v) => updateForm({ lieu: v })}
                    />
                    <View style={styles.divider} />
                    <DatePickerRow
                        label="Date"
                        placeholder="Choisissez une date"
                        value={formData.date}
                        onSelect={(v) => updateForm({ date: v })}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.sectionLabel}>Civilité</Text>
                    <View style={styles.civiliteRow}>
                        {(['M.', 'Mme'] as Civilite[]).map((option) => {
                            const selected = formData.civilite === option;
                            return (
                                <Pressable
                                    key={option}
                                    style={[styles.civiliteChip, selected && styles.civiliteChipSelected]}
                                    onPress={() => updateForm({ civilite: option })}>
                                    <Text style={[styles.civiliteText, selected && styles.civiliteTextSelected]}>{option}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.row2}>
                    <FormField label="Nom" placeholder="Dupont" value={formData.nom} onChangeText={(v) => updateForm({ nom: v })} containerStyle={styles.flex1} />
                    <FormField label="Prénom" placeholder="Jean" value={formData.prenom} onChangeText={(v) => updateForm({ prenom: v })} containerStyle={styles.flex1} />
                </View>

                <FormField
                    label="E-mail"
                    placeholder="jdupont@mail.com"
                    value={formData.email}
                    onChangeText={(v) => updateForm({ email: v })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <FormField
                    label="Téléphone"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.telephone}
                    onChangeText={(v) => updateForm({ telephone: v })}
                    keyboardType="phone-pad"
                />

                <View style={styles.field}>
                    <Text style={styles.sectionLabel}>Votre statut</Text>
                    <StatutList value={formData.statut} onChange={(statut) => updateForm({ statut })} />
                </View>

                <View style={styles.field}>
                    <Text style={styles.sectionLabel}>Commentaires</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder="Votre message (facultatif)"
                        placeholderTextColor="#c7c7cc"
                        value={formData.commentaires}
                        onChangeText={(v) => updateForm({ commentaires: v })}
                        multiline
                    />
                </View>

                <Text style={styles.legal}>
                    Les données collectées par ce formulaire ne seront transmises à aucun tiers. Elles ne serviront qu'à répondre à votre demande 
                    et effectuer le suivi de notre relation commerciale.
                </Text>
                <Text style={styles.legal}>
                    Conformément à la loi du 10 janvier 1978 relative à l’Informatique, aux Fichiers et aux Libertés, 
                    vous pouvez exercer à tout moment, sous réserve de justification de votre identité, 
                    vos droits (information, accès, opposition, rectification) aux données personnelles vous concernant via notre formulaire de contact.
                </Text>
                <Text style={styles.legal}>
                    Plus de détail sur les mentions légales. 
                </Text>

                <Pressable
                    style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
                    onPress={() => canSubmit && onSubmit(formData)}
                    disabled={!canSubmit}>
                    <Text style={styles.submitText}>Envoyer</Text>
                </Pressable>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        paddingBottom: 60,
    },
    scroll: { flex: 1 },
    scrollContent: { 
        padding: 20, 
        paddingBottom: 110, 
        gap: 22 
    },
    header: { gap: 6 },
    backButton: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
    eyebrow: { fontSize: 12, fontWeight: '700', color: '#8e8e93', letterSpacing: 0.5, textTransform: 'uppercase' },
    title: { fontSize: 27, fontWeight: '700', letterSpacing: -0.2, color: '#1c1c1e' },
    subtitle: { fontSize: 14, color: '#6e6e73', lineHeight: 20 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    divider: { height: 1, backgroundColor: '#eeeef0', marginHorizontal: 16 },
    field: { gap: 10 },
    sectionLabel: { fontSize: 13, fontWeight: '600', color: '#3a3a3c' },
    civiliteRow: { flexDirection: 'row', gap: 8 },
    civiliteChip: { flex: 1, height: 44, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e5ea', alignItems: 'center', justifyContent: 'center' },
    civiliteChipSelected: { backgroundColor: '#1c1c1e', borderColor: '#1c1c1e' },
    civiliteText: { fontSize: 14, fontWeight: '600', color: '#3a3a3c' },
    civiliteTextSelected: { color: '#fff' },
    row2: { flexDirection: 'row', gap: 12 },
    flex1: { flex: 1 },
    textarea: {
        minHeight: 96,
        borderRadius: 14,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5ea',
        padding: 14,
        fontSize: 14,
        color: '#1c1c1e',
        textAlignVertical: 'top',
    },
    legal: { fontSize: 11, color: '#a1a1a6', lineHeight: 16 },
    submitButton: { height: 52, borderRadius: 14, backgroundColor: '#dc2626', alignItems: 'center', justifyContent: 'center' },
    submitButtonDisabled: { opacity: 0.4 },
    submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },

    
});