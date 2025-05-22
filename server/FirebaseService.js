import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
class FirebaseService {
  constructor() {
    
    this.firebaseConfig = {
      apiKey: "AIzaSyAnIxZmHjTKCaEyADD0V6KWgD28e6PyWGg",
      authDomain: "medmonics-c0d78.firebaseapp.com",
      projectId: "medmonics-c0d78",
      storageBucket: "medmonics-c0d78.firebasestorage.app",
      messagingSenderId: "703187112061",
      appId: "1:703187112061:web:3ba730faf4692efa73e114",
      measurementId: "G-JWDMJL883K"
    };

    firebase.initializeApp(this.firebaseConfig);
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  async addMnemonic(title, content, category, tags) {
    try {
      const docRef = await this.db.collection("mnemonics").add({
        title,
        content,
        category,
        tags,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getMnemonicsByCategory(category) {
    try {
      const snapshot = await this.db.collection("mnemonics")
        .where("category", "==", category)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching mnemonics:", error);
      return [];
    }
  }

  async signIn(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  subscribeToMnemonics(callback) {
    return this.db.collection("mnemonics")
      .onSnapshot(snapshot => {
        const updates = snapshot.docChanges().map(change => ({
          type: change.type, // "added", "modified", "removed"
          data: { id: change.doc.id, ...change.doc.data() }
        }));
        callback(updates);
      });
  }
}