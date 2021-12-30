import * as application from '@nativescript/core/application';
import * as imageModule from '@nativescript-community/ui-image';
// import * as frame from "tns-core-modules/ui/frame";
// import * as exampleBase from "./examples/example-base-page";
// import * as prof from "./common/profiling";
// import * as trace from "trace";
import * as utils from "@nativescript/core/utils";
// import { time, uptime } from "profiling";
import "@nativescript/firebase";
import { init as initFirebase } from "./common/firebase";
// import { init as initAppSync } from "./common/app-sync";

require("./module-registrations");

// console.log("App config is: " + JSON.stringify(json));
// application.on("displayed", () => {
//   var now = time();
//   var started = now - uptime();
//   console.log("Timeline: Startup time...  (" + started + "ms. - " + now + "ms.)");
// });

// The location of this import is important. iOS swizzles the app delegate.
initFirebase();
// initAppSync();

if (application.android) {
    application.on("launch", args => {
        console.log("onLaunch");
        imageModule.initialize();
        application.android.on("activityStarted", ({activity}) => {
            console.log("onStarted");
            var window = activity.getWindow();
            if (window) {
                window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(0xFF151F2F));

                // Prevent the soft keyboard from hiding EditText's while typing.
                window.setSoftInputMode(32); //android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN;
            }
        });
    });
}

if (application.ios) {
    application.on("launch", args => {
        setTimeout(() => {
            UIApplication.sharedApplication.keyWindow.backgroundColor = UIColor.blackColor;
        }, 1);
    });
}

// prof.start("main-page");
application.run({ moduleName: "app-root-page" });
