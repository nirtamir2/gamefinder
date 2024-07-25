import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/firebase/firebaseApp";

export const firebaseFirestore = getFirestore(firebaseApp);
