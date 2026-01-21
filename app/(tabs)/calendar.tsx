import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Importação das suas constantes
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Typography } from '../../constants/Typography';

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const DAYS_OF_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);

const INITIAL_TASKS = [
  { id: '1', title: 'Medir glicemia (Jejum)', time: '07:30', completed: true, category: 'Diabetes' },
  { id: '2', title: 'Passar fio dental', time: '07:45', completed: true, category: 'Saúde Bucal' },
  { id: '3', title: 'Escovação matinal', time: '07:50', completed: false, category: 'Saúde Bucal' },
  { id: '4', title: 'Medir glicemia (Pós-almoço)', time: '13:30', completed: false, category: 'Diabetes' },
];

export default function CalendarScreen() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const today = 21; // Janeiro 2026

  const toggleTask = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoHeader}>
        <Image 
          // Ajustado para logo.jpeg conforme o explorer
          source={require("../../assets/images/logo2.jpeg")} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Janeiro 2026</Text>
        <TouchableOpacity>
          <MaterialIcons name="chevron-right" size={30} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.weekDaysRow}>
          {WEEK_DAYS.map((day, index) => (
            <Text key={index} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>

        <FlatList
          data={DAYS_OF_MONTH}
          numColumns={7}
          keyExtractor={(item) => item.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.dayCell, item === today && styles.dayCellActive]}
            >
              <Text style={[styles.dayNumber, item === today && styles.dayNumberActive]}>
                {item}
              </Text>
              {item < today && <View style={styles.dotIndicator} />}
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.tasksSection}>
        <Text style={styles.tasksTitle}>Tarefas de Hoje</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTime}>{item.time}</Text>
                <Text style={[
                  styles.taskTitle, 
                  item.completed && styles.taskTitleCompleted
                ]}>
                  {item.title}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.checkCircle, item.completed && styles.checkCircleActive]}
                onPress={() => toggleTask(item.id)}
                activeOpacity={0.7}
              >
                {item.completed && <MaterialIcons name="check" size={16} color={Colors.white} />}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  logoHeader: { 
    alignItems: 'center', 
    paddingVertical: 10,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  logo: { width: 100, height: 40 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingVertical: 15 
  },
  headerTitle: { 
    fontSize: Typography.size.title, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text 
  },
  calendarCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: Layout.radius.card,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  weekDayText: { color: Colors.placeholder, fontWeight: Typography.weight.bold, width: 40, textAlign: 'center' },
  dayCell: { width: `${100 / 7}%`, height: 40, justifyContent: 'center', alignItems: 'center' },
  dayCellActive: { backgroundColor: Colors.primary, borderRadius: 12 },
  dayNumber: { fontSize: Typography.size.body, color: Colors.text },
  dayNumberActive: { color: Colors.white, fontWeight: Typography.weight.bold },
  dotIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.primary, marginTop: 2 },
  tasksSection: { flex: 1, paddingHorizontal: 25, marginTop: 20 },
  tasksTitle: { 
    fontSize: Typography.size.subtitle, 
    fontWeight: Typography.weight.bold, 
    marginBottom: 15, 
    color: Colors.text 
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: Layout.radius.input,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border
  },
  taskInfo: { flex: 1 },
  taskTime: { fontSize: Typography.size.caption, color: Colors.primary, fontWeight: Typography.weight.bold },
  taskTitle: { fontSize: Typography.size.body, color: Colors.text },
  taskTitleCompleted: { textDecorationLine: 'line-through', color: Colors.placeholder },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleActive: { backgroundColor: Colors.primary },
});