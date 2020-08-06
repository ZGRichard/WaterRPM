import React from 'react';
import { Button, View, Text } from 'react-native';
import withObservables from '@nozbe/with-observables';

const Task = ({ task }) => {
  console.log('task', task);

  async function handleStart() {
    return task.updateStatus('IN_PROGRESS');
  }

  async function handleSubmit() {
    return task.updateStatus('SUBMITTED');
  }

  return (
    <View style={{ padding: 15 }}>
      <Text>{task.id}</Text>
      <Text>{task.orid}</Text>
      <Text>{task.type}</Text>
      <Text>{task.status}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Start Task" onPress={handleStart} />
        <Button title="Submit Task" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const enhance = withObservables(['task'], ({ task }) => ({
  task,
}));
export const EnhancedTask = enhance(Task);
