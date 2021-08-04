"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
var debug_1 = require("debug");
var config = {
    projectId: 'ya-live-demo',
    apiKey: 'AIzaSyADOcuDUslyomdCpFnQMf4owlpxeGAPT44',
    authDomain: 'ya-live-demo.firebaseapp.com',
};
var log = debug_1.default('tjl:models:firebase_auth_client');
var FirebaseAuthClient = /** @class */ (function () {
    function FirebaseAuthClient() {
        if (!!app_1.default.apps.length === false) {
            log(config);
            app_1.default.initializeApp(config);
        }
        this.auth = app_1.default.auth();
        this.fireStore = app_1.default.firestore();
        console.log('firebase auth client constructor');
    }
    FirebaseAuthClient.getInstance = function () {
        if (!FirebaseAuthClient.instance) {
            FirebaseAuthClient.instance = new FirebaseAuthClient();
        }
        return FirebaseAuthClient.instance;
    };
    Object.defineProperty(FirebaseAuthClient.prototype, "Auth", {
        get: function () {
            return this.auth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseAuthClient.prototype, "FireStore", {
        get: function () {
            return this.fireStore;
        },
        enumerable: false,
        configurable: true
    });
    FirebaseAuthClient.prototype.isInitialized = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.auth.onAuthStateChanged(resolve);
        });
    };
    FirebaseAuthClient.prototype.signInWithGoogle = function () {
        var provider = new app_1.default.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(provider);
    };
    return FirebaseAuthClient;
}());
exports.default = FirebaseAuthClient;
