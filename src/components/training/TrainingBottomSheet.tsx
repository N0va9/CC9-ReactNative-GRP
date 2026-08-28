import { BottomSheetHandle, BottomSheetProps } from '@/components/training/types';
import { BlurView } from 'expo-blur';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import { Dimensions, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TrainingBottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(
    (
        {
            activeHeight,
            children,
            backDropColor = 'rgba(0,0,0,0.5)',
            backgroundColor = 'rgba(255, 242, 223, 0.7)',
            blurIntensity = 50,
            blurTint = 'light',
        },
        ref,
    ) => {
        const safeAreaInsets = useSafeAreaInsets();
        const { height: screenHeight } = Dimensions.get('screen');
        const closedPositionY = screenHeight;
        const openPositionY = screenHeight - activeHeight;



        const sheetPositionY = useSharedValue(closedPositionY);
        const gestureStartPositionY = useSharedValue(0);
        const keyboardOffset = useSharedValue(0)

        useEffect(() => {
            const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
            const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

            const showSub = Keyboard.addListener(showEvent, (e) => {
                keyboardOffset.value = withTiming(e.endCoordinates.height, { duration: e.duration || 250 });
            });
            const hideSub = Keyboard.addListener(hideEvent, (e) => {
                keyboardOffset.value = withTiming(0, { duration: e.duration || 250 });
            });

            return () => {
                showSub.remove();
                hideSub.remove();
            };

        }, [keyboardOffset]);


        const openSheet = useCallback(() => {
            sheetPositionY.value = withSpring(openPositionY, {
                damping: 50,
                stiffness: 150,
                mass: 0.5
            });
        }, [openPositionY]);

        const closeSheet = useCallback(() => {
            sheetPositionY.value = withSpring(closedPositionY, {
                damping: 50,
                stiffness: 150,
                mass: 0.5
            });
        }, [closedPositionY]);

        useImperativeHandle(
            ref,
            () => ({
                openSheet,
                closeSheet,
            }),
            [openSheet, closeSheet],
        );


        const sheetStyle = useAnimatedStyle(() => ({
            top: sheetPositionY.value - keyboardOffset.value
        }));

        const backdropsType = useAnimatedStyle(() => {
            const opacity = interpolate(
                sheetPositionY.value,
                [closedPositionY, openPositionY],
                [0, 0.5],
            );
            return {
                opacity,
                display: opacity === 0 ? 'none' : 'flex',
            }
        });

        const panGestureHandler = Gesture.Pan()
            .onBegin(() => {
                gestureStartPositionY.value = sheetPositionY.value;
            })
            .onUpdate(ev => {
                const newPositionY = gestureStartPositionY.value + ev.translationY;
                sheetPositionY.value = Math.min(
                    Math.max(newPositionY, openPositionY),
                    closedPositionY,
                );
            })
            .onEnd(() => {
                if (sheetPositionY.value > openPositionY + 50) {
                    sheetPositionY.value = withSpring(closedPositionY, {
                        damping: 50,
                        stiffness: 150,
                        mass: 0.5,
                    });
                } else {
                    sheetPositionY.value = withSpring(openPositionY, {
                        damping: 50,
                        stiffness: 150,
                        mass: 0.5,
                    });
                }

            });

        return (
            <>
                <TouchableWithoutFeedback onPress={closeSheet}>
                    <Animated.View
                        style={[
                            styles.backdrop,
                            backdropsType,
                            {
                                backgroundColor: backDropColor
                            },
                        ]}
                    />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[
                        styles.container,
                        sheetStyle,
                        {
                            height: activeHeight,
                            backgroundColor,
                            paddingBottom: safeAreaInsets.bottom,

                        },
                    ]}>
                    <BlurView intensity={blurIntensity} tint={blurTint} style={StyleSheet.absoluteFill} />
                    <GestureDetector gesture={panGestureHandler}>
                        <View style={styles.lineContainer}>
                            <View style={styles.line} />
                        </View>
                    </GestureDetector>

                    {children}
                </Animated.View>



            </>
        )
    }
)


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        //bottom: 0,
        width: '100%',
        overflow: 'hidden'
    },
    lineContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    line: {
        width: 50,
        height: 4,
        borderRadius: 20,
        backgroundColor: 'black',
    },
    backdrop: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    }
})