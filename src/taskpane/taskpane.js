/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// images references in the manifest
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80.png";

/* global document, Office */

Office.onReady(info => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        document.getElementById("run").onclick = login;
        const token = window.localStorage.getItem('access_token')
        console.log(token);
        if (token) {
            window.location.replace("https://localhost:3000/app.html")
        }
    }
});

export async function login() {
    Office.context.ui.displayDialogAsync('https://localhost:3000/oauth.html', {height: 30, width: 20}, (result) => {
        let accessToken = '';
        const intervalID = window.setInterval(() => {
            accessToken = window.localStorage.getItem('access_token')
            if (accessToken) {
                window.clearInterval(intervalID);
                window.location.replace("https://localhost:3000/app.html")
            }
        }, 2000)
    });
}
