export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export class Complaint {
    id?: string;
    firstName?: string;
    lastName?: String;
    email?: string;
    city?: string;
    state?: string;
    phoneNumber?: number;
    gender?: string;
    picture?: string;
    isVerified?: boolean;
    complaint?: string;
    age?: number;
    hospital?: string;
    category?: string;
    identification?: string;
    documents?: string[];
    datePosted?: FirestoreTimestamp; 

}