import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function GlucoseCircle({ value, unit }: { value: number; unit: string; }) {
  const getStatusColor = (val: number) => {
    if (val < 70) return Colors.error;
    if (val > 140) return Colors.warning;
    return Colors.primary;
  };
  const statusColor = getStatusColor(value);

  return (
    <View style={styles.container}>
      <View style={[styles.outerCircle, { borderColor: statusColor }]}>
        <Text style={[styles.value, { color: statusColor }]}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 30 },
  outerCircle: { 
    width: 200, height: 200, borderRadius: 100, borderWidth: 12, 
    justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white,
    elevation: 5, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 
  },
  value: { fontSize: 48, fontWeight: '700' },
  unit: { fontSize: 16, color: '#777' }
});