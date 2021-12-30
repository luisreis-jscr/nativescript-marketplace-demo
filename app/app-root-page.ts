import * as navigator from "./common/navigator"
import * as gestures from '@nativescript/core/ui/gestures';
import { groups } from "./view-models/examples-model"
import * as firebase from "./common/firebase";
import { grayTouch } from "./common/effects";
import * as application from '@nativescript/core/application';
import { Observable, Application } from '@nativescript/core';

class SidedrawerViewModel extends Observable {
    public groups = groups;
    public firebase = firebase.viewModel;
}

export function onLoaded(args) {
    args.object.bindingContext = new SidedrawerViewModel();
}

export function tileTouch(args: gestures.TouchGestureEventData) {
    grayTouch(args);
}

function sideDrawer(): any {
    return Application.getRootView();
}

function closeDrawer() {
    var instance = sideDrawer();
    if (instance) {
        instance.closeDrawer();
    }
}

function toggleDrawerState() {
    var instance = sideDrawer();
    if (instance) {
        instance.toggleDrawerState();
    }
}

export function showSlideout() {
    toggleDrawerState();
}

export function tapHome() {
    closeDrawer();
    navigator.navigateToHome();
}

export function tapAbout() {
    closeDrawer();
    if (application.android) {
        setTimeout(() => navigator.navigateToAbout(), 600);
    } else {
        navigator.navigateToAbout();
    }
}

export function tapWhatIsNew() {
    closeDrawer();
    if (application.android) {
        setTimeout(() => navigator.navigateToWhatIsNew(), 600);
    } else {
        navigator.navigateToWhatIsNew();
    }
}

export function tapDrawerLink(args) {
    closeDrawer();
    navigator.openLink(args.object);
}