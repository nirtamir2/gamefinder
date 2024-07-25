import { getStorage } from "firebase/storage";
import { firebaseApp } from "@/firebase/firebaseApp";

export const firebaseStorage = getStorage(firebaseApp);
