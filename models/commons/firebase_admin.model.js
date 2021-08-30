"use strict";
exports.__esModule = true;
var debug_1 = require("debug");
var admin = require("firebase-admin");
var dotenv = require("dotenv");
dotenv.config();
var _a = process.env, projectId = _a.projectId, privateKey = _a.privateKey, clientEmail = _a.clientEmail, databaseurl = _a.databaseurl;
var log = debug_1["default"]('tjl:models:firebaseadmin');
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
            databaseurl: databaseurl || '',
            credential: {
                privateKey: (privateKey || '').replace(/\\n/g, '\n'),
                clientEmail: clientEmail || '',
                projectId: projectId || ''
            }
        };
        admin.initializeApp({
            databaseURL: config.databaseurl,
            credential: admin.credential.cert(config.credential)
        });
        log('bootstrap end');
        this.init = true;
    };
    return FirebaseAdmin;
}());
exports["default"] = FirebaseAdmin;
