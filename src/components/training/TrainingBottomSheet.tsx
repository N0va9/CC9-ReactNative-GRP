import { View, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { BottomSheetHandle, BottomSheetProps } from '@/components/training/types';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export const TrainingBottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(
    (
        {
            activeHeight, 
            children,
            backDropColor= 'rgba(0,0,0,0.5)',
            backgroundColor = 'white',
        },
        ref,
    ) => {
        const safeAreaInsets = useSafeAreaInsets();
        const {height: screenHeight} = Dimensions.get('screen');
        const closedPositionY = screenHeight;
        const openPositionY = screenHeight - activeHeight;


        const sheetPositionY = useSharedValue(closedPositionY);
        const gestureStartPositionY = useSharedValue(0);

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
            top: sheetPositionY.value
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
                <GestureDetector gesture={panGestureHandler}>
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
                        <View style={styles.lineContainer}>
                            <View style={styles.line} />
                        </View>
                        {children}
                    </Animated.View>
                </GestureDetector>
            </>
        )
    }
)


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        width:'100%'
    },
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    line: {
        width: 50,
        height: 4,
        borderRadius:20,
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