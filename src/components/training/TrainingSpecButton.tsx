
import { BottomSheetHandle } from "@/components/training/types";
import React, { useCallback, useRef, useState } from 'react';
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
                    <Button
                        title="Show Content"
                        onPress={() =>
                            openBottomSheet(
                                <TrainingForm
                                    key={Date.now()}
                                    onSubmit={async (data) => {
                                        await sendEmail(data, formationName);
                                        bottomSheetRef.current?.closeSheet();
                                    }}
                                    onCancel={() => bottomSheetRef.current?.closeSheet()}
                                />
                            )
                        }
                    />

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
    button: {
        flex: 1,
        padding: 10,
    }
})