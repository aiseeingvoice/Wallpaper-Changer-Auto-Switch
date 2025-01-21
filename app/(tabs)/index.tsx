import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View } from '@/components/Themed';

export default function TabOneScreen() {
    const [wallpaper, setWallpaper] = useState('@/assets/wallpaper/w1.jpg');

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/wallpaper/w1.jpg')}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
