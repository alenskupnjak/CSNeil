import { createContext, useContext } from 'react';

import ActivityStore from './activityStore';
import CommonStore from './commonStore';
import ModalStore from './ModalStore';
import UserStore from './userStore';
import ProfileStore from './profileStore';

export const store = {
	activityStore: new ActivityStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore(),
	modalStore: new ModalStore(),
	profileStore: new ProfileStore(),
};

// Setiram u index.js da mogu prosljedivati vrijednosti
export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
