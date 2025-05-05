import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import Tasks from './components/Tasks';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const HandleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (index: number) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectiomTitle}>Today's Tasks</Text>
        <View style={styles.item}>
          {/* This is where the tasks will go */}
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Tasks text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Write a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a Task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={HandleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectiomTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    paddingBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#55BCF6', // 🟦 Underline looks sharp in theme blue
    marginBottom: 20,
    marginRight:175,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderRadius: 60,
    borderWidth: 2,
    width: 250,
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 2,
  },
  addText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 30,
  },
});
