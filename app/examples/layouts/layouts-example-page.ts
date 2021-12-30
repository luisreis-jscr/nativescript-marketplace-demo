import * as observable from '@nativescript/core/data/observable';
import * as gridModule from '@nativescript/core/ui/layouts/grid-layout';
import * as utils from "@nativescript/core/utils";
import { Page, View } from '@nativescript/core';
import * as navigator from "../../common/navigator";
import * as tabViewModule from '@nativescript/core/ui/tab-view';

let page: Page;

export function rootGridLoaded(args: observable.EventData) {
    var grid = <gridModule.GridLayout>args.object;

    if (grid.android) {
        var compat = <any>androidx.core.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

// TODO: This should be in "pageNavigatingTo" but that method is defined in the Page base class
export function pageNavigatingTo(args: observable.EventData) {
    page = <Page>args.object;
    page.bindingContext = observable.fromObject({
        selectedIndex: 0
    });
    selectedIndexChanged(null);
}

export function goBack() {
    navigator.navigateBackFromExample();
}

export function selectedIndexChanged(args) {
    if (page !== undefined) {
        let tabView = page.getViewById<tabViewModule.TabView>("tabView");
        let index = tabView.selectedIndex;
        let names = ["btn-red", "btn-yellow", "btn-blue", "btn-lightblue", "btn-lightgreen"];
        for (let name of names) {
            let view = page.getViewById<View>("" + index + name);
            if (view !== undefined) {
                view.className = name;
                view.className = name + "-animated";
            }
        }
    }
}

export function buttonTap(args: observable.EventData) {
    let button = <View>args.object;
    let className = button.className.replace("-animated", "").replace("2", "");
    button.className = className;
    button.className = className + "-animated2";
}