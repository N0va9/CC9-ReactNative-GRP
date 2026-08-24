
import React, { useRef, useCallback, useState } from 'react';
import { BottomSheetHandle } from "@/components/training/types";
import { Dimensions, View, Button, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TrainingBottomSheet } from './TrainingBottomSheet';
const { height: screenHeight } = Dimensions.get('window');

export function TrainingSpecButton() {
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
                <View>
                    <Button
                        title="Show Content"
                        onPress={() =>
                            openBottomSheet(
                                <View style={styles.content}>
                                    <Text style={styles.text}>Premier contenu</Text>
                                </View>
                            )
                        }
                    />
                    <TrainingBottomSheet
                        ref={bottomSheetRef}
                        activeHeight={screenHeight}
                        backDropColor="rgba(0,0,0,0.5)"
                        backgroundColor='red'>
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