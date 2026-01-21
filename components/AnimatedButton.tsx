import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface Props {
  onPress: () => void;
  title: string;
  loading?: boolean; // Nova propriedade opcional
}

export default function AnimatedButton({ onPress, title, loading = false }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!loading) scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableWithoutFeedback 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
      onPress={loading ? undefined : onPress} // Desativa o clique se estiver a carregar
    >
      <Animated.View style={[styles.button, animatedStyle, loading && styles.disabled]}>
        {loading ? (
          <ActivityIndicator color="#ffffff" /> // Mostra o spinner
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#669944",
    width: "100%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  disabled: {
    opacity: 0.8, // Fica levemente transparente quando ocupado
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});