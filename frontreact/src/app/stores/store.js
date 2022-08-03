import { createContext, useContext } from 'react';

import ActivityStore from './activityStore';
import CommonStore from './commonStore';
import ModalStore from './ModalStore';
import UserStore from './userStore';

export const store = {
	activityStore: new ActivityStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore(),
	modalStore: new ModalStore(),
};

// Setiram u index.js da mogu prosljedivati vrijednosti
export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
