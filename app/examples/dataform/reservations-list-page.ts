import * as model from "./reservations-view-model";
import * as navigator from "../../common/navigator";
import { RadListView, ListViewEventData } from "nativescript-ui-listview";
import { Frame, getViewById } from '@nativescript/core';

let viewModel;

export function pageNavigatingTo(args: any) {
    let page = args.object;
    if (args.isBackNavigation && args.context instanceof model.ReservationsViewModel) {
        viewModel = args.context;
    } else {
        viewModel = new model.ReservationsViewModel();
    }

    page.bindingContext = viewModel;

    let listView = getViewById(page, "list-view") as RadListView;
    listView.refresh();
}

export function pageNavigatedFrom(args: any) {
    if (args.isBackNavigation) {
        viewModel = undefined;
    }
}

export function goBack() {
    navigator.navigateBackFromExample();
}

export function onItemTap(args: ListViewEventData) {
    var item: model.Reservation = viewModel.reservations.getItem(args.index);
    navigateToEditPage(item, false);
}

export function onImageTap(args) {
    var item: model.Reservation = new model.Reservation();
    navigateToEditPage(item, true);
}

export function navigateToEditPage(item: model.Reservation, isNew: Boolean) {
    viewModel.currentReservation = item;
    viewModel.isNew = isNew;
    Frame.topmost().navigate({
        moduleName: "examples/dataform/reservations-edit-page",
        animated: true,
        context: viewModel
    });
}