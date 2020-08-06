import React from 'react';
import { View } from 'react-native';

import withObservables from '@nozbe/with-observables';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';

import { EnhancedTask } from './Task';

function TaskList({ tasks }) {
  return (
    <View>
      {tasks.map((task) => (
        <EnhancedTask key={task.id} task={task} />
      ))}
    </View>
  );
}

export default withDatabase(
  withObservables(['tasks'], ({ database }) => ({
    tasks: database.collections.get('tasks').query().observe(),
  }))(TaskList),
);
