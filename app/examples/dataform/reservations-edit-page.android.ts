import { ReservationsViewModel } from "./reservations-view-model";
import { EventData, NavigatedData, Page, Color, getViewById } from '@nativescript/core';
import * as viewModule from '@nativescript/core/ui/core/view';
import * as navigator from "../../common/navigator";
import * as dataFormModule from "nativescript-ui-dataform";
import * as platform from '@nativescript/core/platform';
import * as utils from "@nativescript/core/utils";

var colorAccent: Color = new Color("#BF3136");
var model: ReservationsViewModel;
var imageWidth: number;
var scale;

export function pageNavigatedTo(args: NavigatedData) {
    scale = platform.Screen.mainScreen.scale;
    imageWidth = 56 * scale;

    var page = <Page>args.object;
    model = <ReservationsViewModel>args.context;
    page.bindingContext = model;
}

export function saveChanges(args: EventData) {
    var page = <Page>(<viewModule.View>args.object).page;
    var dataForm = <dataFormModule.RadDataForm>getViewById(page, "reservationForm");
    dataForm.commitAll();

    if (dataForm.hasValidationErrors()) {
        return;
    }

    if (model.isNew) {
        model.reservations.push(model.currentReservation);
    }

    utils.ad.dismissSoftInput();

    navigator.navigateBackWithContext(model);
}

export function goBack() {
    navigator.navigateBack();
}

export function dfEditorUpdate(data: dataFormModule.DataFormEventData) {

    if (data.propertyName == "guests") {
        setupEditorGuests(data.editor);
    }

    if (data.propertyName == "section" || data.propertyName == "table") {
        editorSetupPicker(data.editor);
    }

    if (data.propertyName == "origin") {
        var root;
        if (data.editor.rootLayout instanceof Function) {
            root = data.editor.rootLayout();
        } else {
            root = data.editor.rootLayout;
        }
        root.getLayoutParams().setMargins(imageWidth, 0, 0, 0);
    }
}

export function dfEditorSetup(data: dataFormModule.DataFormEventData) {
}

export function setupEditorGuests(editor) {
    var numberPicker = editor.getEditorView();
    numberPicker.setPluralFormatString("%.0f guests");
    numberPicker.setSingleFormatString("%.0f guest");
    numberPicker.decreaseView().setTextColor(colorAccent.android);
    numberPicker.increaseView().setTextColor(colorAccent.android);
}

export function dfGroupUpdate(data: dataFormModule.DataFormEventData) {
    if (data.groupName != "TABLE DETAILS") {
        return;
    }

    var androidContext = data.group.rootLayout().getContext();
    var bgResourceId = androidContext.getResources().getIdentifier("dataform_table_bg", "drawable", androidContext.getPackageName());
    var bgDrawable = androidContext.getResources().getDrawable(bgResourceId);
    data.group.rootLayout().setBackground(bgDrawable);
}

export function editorSetupPicker(editor) {
    var androidContext = editor.getEditorView().getContext();
    var customEditorLayoutId = androidContext.getResources().getIdentifier("reservation_table_spinner_editor", "layout", androidContext.getPackageName());
    var customItemLayoutId = androidContext.getResources().getIdentifier("reservation_table_spinner_item", "layout", androidContext.getPackageName());
    editor.setSpinnerItemLayoutId(customItemLayoutId);
    editor.setEditorLayout(customEditorLayoutId);
}

// Custom Button editor
var buttonValue;
export function editorNeedsView(args) {
    var editorView: android.widget.TextView = new android.widget.TextView(args.context);
    editorView.setTextColor(colorAccent.android);
    var layoutParams = new android.widget.FrameLayout.LayoutParams(-2, -2);
    layoutParams.setMargins(imageWidth, 0, 0, 0);
    editorView.setLayoutParams(layoutParams);
    var editorPadding = 4 * scale;
    editorView.setPadding(editorPadding, editorPadding, editorPadding, editorPadding);

    editorView.setOnClickListener(new android.view.View.OnClickListener({
        onClick(view: android.view.View) {
            handleTap(view, args.object);
        }
    }));
    args.view = editorView;
}

export function editorHasToApplyValue(args) {
    updateEditorValue(args.view, args.value);
}

export function editorNeedsValue(args) {
    args.value = buttonValue;
}

export function updateEditorValue(editorView, value) {
    buttonValue = value;
    var buttonText = buttonValue ? "CANCELLED" : "CANCEL RESERVATION";
    editorView.setText(buttonText);
}

export function handleTap(editorView, editor) {
    var newValue = !buttonValue;
    updateEditorValue(editorView, newValue);
    editor.notifyValueChanged();
}