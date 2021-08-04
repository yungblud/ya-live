"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var admin = require("firebase-admin");
var log = debug_1.default('tjl:models:firebaseadmin');
var FirebaseAdmin = /** @class */ (function () {
    function FirebaseAdmin() {
        this.init = false;
    }
    FirebaseAdmin.getInstance = function () {
        if (!FirebaseAdmin.instance) {
            FirebaseAdmin.instance = new FirebaseAdmin();
            FirebaseAdmin.instance.bootstrap();
        }
        return FirebaseAdmin.instance;
    };
    Object.defineProperty(FirebaseAdmin.prototype, "Firestore", {
        /** firestore */
        get: function () {
            if (this.init === false) {
                this.bootstrap();
            }
            return admin.firestore();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseAdmin.prototype, "Auth", {
        get: function () {
            if (this.init === false) {
                this.bootstrap();
            }
            return admin.auth();
        },
        enumerable: false,
        configurable: true
    });
    FirebaseAdmin.prototype.bootstrap = function () {
        if (!!admin.apps.length === true) {
            this.init = true;
            return;
        }
        log('bootstrap start');
        var config = {
            databaseurl: process.env.databaseurl || '',
            credential: {
                privateKey: (process.env.privateKey || '').replace(/\\n/g, '\n'),
                clientEmail: process.env.clientEmail || '',
                projectId: process.env.projectId || '',
            },
        };
        admin.initializeApp({
            databaseURL: config.databaseurl,
            credential: admin.credential.cert(config.credential),
        });
        log('bootstrap end');
        this.init = true;
    };
    return FirebaseAdmin;
}());
exports.default = FirebaseAdmin;
