
import { BottomSheetHandle } from "@/components/training/types";
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toast, ToastHandle } from "../Toast";
import { TrainingBottomSheet } from './TrainingBottomSheet';
import { TrainingForm } from "./form/TrainingForm";
import { sendEmail } from "./form/sendEmail";

const { height: screenHeight } = Dimensions.get('window');
interface TrainingSpecButtonProps {
    formationName: string;
}

export function TrainingSpecButton({ formationName }: TrainingSpecButtonProps) {
    const bottomSheetRef = useRef<BottomSheetHandle>(null)
    const [content, setContent] = useState<React.ReactNode>(null);
    const toastRef = useRef<ToastHandle>(null);

    const openBottomSheet = useCallback(
        (newContent: React.ReactNode) => {
            setContent(newContent);
            if (bottomSheetRef.current) {
                bottomSheetRef.current.openSheet();
            }
        },
        [],
    );

    return (
        <GestureHandlerRootView style={styles.root}>
                <View style={styles.container}>
                    <Pressable
                        style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaButtonPressed]}
                        onPress={() =>
                            openBottomSheet(
                                <TrainingForm
                                    key={Date.now()}
                                    onSubmit={async (data) => {
                                        await sendEmail(data, formationName);
                                        bottomSheetRef.current?.closeSheet();
                                        toastRef.current?.show('Demande de devis bien envoyée');
                                    }}
                                    onCancel={() => bottomSheetRef.current?.closeSheet()}
                                />
                            )
                        }
                    >
                        <Text style={styles.ctaButtonText}>Demander un devis</Text>
                    </Pressable>
                    <Toast ref={toastRef} />
                    <TrainingBottomSheet
                        ref={bottomSheetRef}
                        activeHeight={screenHeight}
                        backDropColor="rgba(0,0,0,0.5)"
                        blurIntensity={100}
                        blurTint="light">
                        {content}
                    </TrainingBottomSheet>

                </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    ctaButton: {
        backgroundColor: '#dc2626',
        borderRadius: 14,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#dc2626',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    ctaButtonPressed: { opacity: 0.85 },
    ctaButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
})