import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export interface ToastHandle {
    show: (message: string) => void;
}

export const Toast = forwardRef<ToastHandle>((_, ref) => {
    const insets = useSafeAreaInsets();
    const [message, setMessage] = useState('');
    const translateY = useSharedValue(-120);
    const opacity = useSharedValue(0);

    const show = useCallback((msg: string) => {
        setMessage(msg);
        translateY.value = withSequence(
            withTiming(0, { duration: 350 }),
            withDelay(2500, withTiming(-120, { duration: 300 }))
        );
        opacity.value = withSequence(
            withTiming(1, { duration: 350 }),
            withDelay(2500, withTiming(0, { duration: 300 }))
        );
    }, [translateY, opacity]);

    useImperativeHandle(ref, () => ({ show }), [show]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View pointerEvents="none" style={[styles.container, { top: insets.top + 10 }, animatedStyle]}>
            <View style={styles.iconCircle}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path d="M20 6L9 17l-5-5" stroke="#dc2626" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            </View>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
});

Toast.displayName = 'Toast';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: '#dc2626',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    },
    iconCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
    },
});