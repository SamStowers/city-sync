// import React from 'react';
import { getAuth } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import db from "./index";

export function getUserUID() {
    const auth = getAuth();
    if (auth.currentUser) {
        return auth.currentUser.uid;
    } else {
        return "guest";
    }
}

export function getUserEmail() {
    const auth = getAuth();
    if (auth.currentUser) {
        return auth.currentUser.email;
    } else {
        return "guest";
    }
}

// Can specify a UID to give admin
export async function setUserAdmin(permValue, adminUID) {
    if (adminUID) { // If a UID was provided give that UID permValue
        await setDoc(doc(db, "users", adminUID), {
            admin: permValue,
        });
    } else { // Otherwise give it to the logged in user
        const auth = getAuth();
        var uid = "";
        if (auth.currentUser) {
            uid = auth.currentUser.uid;
        } else {
            uid = "guest";
        }
        await setDoc(doc(db, "users", uid), {
            admin: permValue,
        });
    }
}

export async function setUserReportPermission(permValue) {
    const auth = getAuth();
    var uid = "";
    if (auth.currentUser) {
        uid = auth.currentUser.uid;
    } else {
        uid = "guest";
    }
    await setDoc(doc(db, "users", uid), {
        reportPermission: permValue,
      });
}

export async function setUserFeedbackPermission(permValue) {
    const auth = getAuth();
    var uid = "";
    if (auth.currentUser) {
        uid = auth.currentUser.uid;
    } else {
        uid = "guest";
    }
    await setDoc(doc(db, "users", uid), {
        feedbackPermission: permValue,
      });
}

export async function getUserAdmin() {
    const auth = getAuth();
    var uid = "";
    if (auth.currentUser) {
        uid = auth.currentUser.uid;
    } else {
        uid = "guest";
    }
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
        return docSnap.data().admin;
    } else {
        // If there was an error of any type, assume no admin permissions
        return false;
    }
}

export async function getUserReportPermission() {
    const auth = getAuth();
    var uid = "";
    if (auth.currentUser) {
        uid = auth.currentUser.uid;
    } else {
        uid = "guest";
    }
    console.log(uid);
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
        return docSnap.data().reportPermission;
    } else {
        // If there was an error of any type, assume no permissions
        console.log("NOPE");
        return false;
    }
}

export async function getUserFeedbackPermission() {
    const auth = getAuth();
    var uid = "";
    if (auth.currentUser) {
        uid = auth.currentUser.uid;
    } else {
        uid = "guest";
    }
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
        return docSnap.data().feedbackPermission;
    } else {
        // If there was an error of any type, assume no permissions
        return false;
    }
}