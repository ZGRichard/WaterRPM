/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import schema from './model/schema';

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { synchronize } from '@nozbe/watermelondb/sync';

import { dbModels } from './model';
import { createTask } from './model/createTask';

import TaskList from './components/TaskList';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: dbModels,
  actionsEnabled: true,
});

const App: () => React$Node = () => {
  async function sync() {
    return synchronize({
      database,
      pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
        const response = await fetch(`http://localhost:8080/sync`);

        return response.json();
      },
      pushChanges: async ({ changes, lastPulledAt }) => {
        console.log('changes', changes);
        const response = await fetch(`http://localhost:8080/sync`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(changes),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }
      },
    });
  }

  return (
    <DatabaseProvider database={database}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button title="Sync" onPress={sync} />
        <Button
          title="Create Task"
          onPress={async () => {
            const res = await createTask(database, {
              id: uuidv4(),
              orid: 'X1-ORz2g4motxnfju_hboe8',
              salesforceId: 'test-123213213',
              type: 'EVALUATION',
              status: 'HAS_NOT_STARTED',
            });

            console.log('res', res);
          }}
        />

        <TaskList />
      </ScrollView>
    </DatabaseProvider>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
