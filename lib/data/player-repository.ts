import { db } from "@/lib/data/firebase";
import { Player } from "@/lib/models/player";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export class PlayerRepository {
  private readonly collection = "players";

  async getAll(): Promise<Player[]> {
    console.log("getting all players");
    const querySnapshot = await getDocs(collection(db, this.collection));
    return querySnapshot.docs.map((doc) =>
      Player.fromJson(doc.id, doc.data() as { name: string })
    );
  }

  async add(player: Player): Promise<void> {
    console.log("adding player", player.id);
    await setDoc(doc(db, this.collection, player.id), player.toJson());
  }

  async remove(id: string): Promise<void> {
    console.log("removing player", id);
    await deleteDoc(doc(db, this.collection, id));
  }

  async update(player: Player): Promise<void> {
    console.log("updating player", player.id);
    await setDoc(doc(db, this.collection, player.id), player.toJson());
  }
}
