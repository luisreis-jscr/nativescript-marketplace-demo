import * as pages from '@nativescript/core/ui/page';

import * as view from '@nativescript/core/ui/core/view';

import * as observable from '@nativescript/core/data/observable';

import * as navigator from "../common/navigator";
import * as examplePageVM from "../view-models/example-info-page-view-model"

export function pageNavigatingTo(args: pages.NavigatedData) {
    var page = <pages.Page>args.object;
    var vm = <examplePageVM.ExampleInfoPageViewModel>page.navigationContext;
    page.bindingContext = vm;
}

export function showCodeTap(args: observable.EventData) {
    var context = <examplePageVM.ExampleInfoPageViewModel>(<view.View>args.object).bindingContext;
    navigator.navigateToCode(context.currentExample);
}

export function openLink(args: observable.EventData) {
    navigator.openLink(args.object);
}

export function goBack() {
    navigator.navigateBack();
}
