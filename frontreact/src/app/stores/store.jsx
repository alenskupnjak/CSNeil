import { createContext, useContext } from 'react';

import ActivityStore from './activityStore';

// interface Store {
// 	activityStore: ActivityStore;
// }

export const store = {
	activityStore: new ActivityStore(),
};

// Setiram u index.js da mogu prosljedivati vrijednosti
export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
