// ==UserScript==
// @name           Update Notification Slayer
// @version        2.0.1
// @author         aminomancer
// @homepageURL    https://github.com/aminomancer
// @description    Prevent "update available" notification popups, instead just create a badge (like the one that ordinarily appears once you dismiss the notification).
// @downloadURL    https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/updateNotificationSlayer.sys.mjs
// @updateURL      https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/updateNotificationSlayer.sys.mjs
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// @backgroundmodule
// ==/UserScript==

import { UpdateListener } from "resource://gre/modules/UpdateListener.sys.mjs";

if (UpdateListener.showUpdateNotification.name === "showUpdateNotification") {
  const lazy = {};
  ChromeUtils.defineESModuleGetters(lazy, {
    AppMenuNotifications: "resource://gre/modules/AppMenuNotifications.sys.mjs",
  });
  const addTelemetry = () => {};
  eval(
    `UpdateListener.showUpdateNotification = function ${UpdateListener.showUpdateNotification
      .toString()
      .replace(/^showUpdateNotification/, "showUpdateBadgeNotification")
      .replace(
        /const addTelemetry/,
        "options.dismissed = true;\n    const _addTelemetry"
      )}`
  );
}
