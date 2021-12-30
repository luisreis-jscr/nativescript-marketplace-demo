import { EventData, View, EditableTextBase, Color, Page } from '@nativescript/core';
import * as observable from '@nativescript/core/data/observable';
import * as platform from '@nativescript/core/platform';
import * as application from '@nativescript/core/application';
import * as navigator from "../../common/navigator";
import * as linearGradient from "../../common/linear-gradient";

declare var android: any;

export function onPageNavigatingTo(args: EventData) {
    let page = <Page>args.object;
    let viewModel = observable.fromObject({
        username: "ILoveNS",
        email: "team@mail.com",
        password: "password",
        bio: undefined,
        isPublic: true,
        showPassword: false
    });
    page.bindingContext = viewModel;
}

export function onBackgroundLoaded(args: EventData) {
    let background = <View>args.object;
    let colors = new Array<Color>(new Color("#667297"), new Color("#5C687C"));
    let orientation = linearGradient.Orientation.Top_Bottom;

    switch (platform.device.os) {
        case platform.platformNames.android:
            linearGradient.drawBackground(background, colors, orientation);
            break;
        case platform.platformNames.ios:
            // The iOS view has to be sized in order to apply a background
            setTimeout(() => {
                linearGradient.drawBackground(background, colors, orientation);
            });
            break;
    }
}

export function onProfilePictureTapped() {
    notify("Change Image Tapped!");
}

export function onUpdateButtonTapped() {
    notify("Update Tapped!");
}

declare var android;
function notify(msg: string) {
    switch (platform.device.os) {
        case platform.platformNames.android:
            android.widget.Toast.makeText(application.android.context, msg, android.widget.Toast.LENGTH_SHORT).show();
            break;
        case platform.platformNames.ios:
            console.log(msg);
            break;
    }
}

export function onShowPasswordTapped(args: EventData) {
    var view = <View>args.object;
    var viewModel = view.page.bindingContext
    viewModel.showPassword = !viewModel.showPassword;
}

var closeTimeout: any = null;
export function onTextInputTapped() {
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
    closeTimeout = setTimeout(() => {
        closeTimeout = null;
    }, 20);
}

export function onPageTapped(args: EventData) {
    var page = <Page>args.object;
    if (!closeTimeout) {
        closeTimeout = setTimeout(() => {
            page.getViewById<EditableTextBase>("username").dismissSoftInput();
            page.getViewById<EditableTextBase>("email").dismissSoftInput();
            page.getViewById<EditableTextBase>("password").dismissSoftInput();
            page.getViewById<EditableTextBase>("bio").dismissSoftInput();
            closeTimeout = null;
        }, 20);
    }
}

export function goBack() {
    navigator.navigateBackFromExample();
}
