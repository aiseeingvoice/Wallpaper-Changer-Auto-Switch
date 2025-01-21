// src/components/ImageGrid.js
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { getImages } from '@/utils/api';

const ImageGrid = () => {
    const [images, setImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const scaleValue = new Animated.Value(1);
    useEffect(() => {
        const fetchImages = async () => {
            const images = await getImages('nature');
            setImages(images);
        };
        fetchImages();
    }, []);

    const handleMouseEnter = (index: any) => {
        setHoveredImage(index);
        Animated.spring(scaleValue, {
            toValue: 1.1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };
    const handleMouseLeave = () => {
        setHoveredImage(null);
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };
    return (
        <View style={styles.grid}>
            {images.map((image, index) => (
                <TouchableWithoutFeedback
                    key={image.id}
                    onPressIn={() => handleMouseEnter(index)}
                    onPressOut={handleMouseLeave}
                >
                    <Animated.View style={[styles.imageContainer, hoveredImage === index && styles.hovered]}>
                        <Image source={{ uri: image.src.medium }} style={styles.image} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageContainer: {
        width: '50%',
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    hovered: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        transform: [{ scale: 1.1 }],
    },
});
export default ImageGrid;