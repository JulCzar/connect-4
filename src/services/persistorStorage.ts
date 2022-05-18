import { PersistentStorage } from 'persistor-node';

export const persistentStorage = PersistentStorage.getOrCreate('datasets', {
  storage: localStorage,
});
