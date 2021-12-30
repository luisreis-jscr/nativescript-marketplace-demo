import { BlogPostItemData } from "./selection-view-model";
import { EventData, NavigatedData, Page, View } from '@nativescript/core';
import * as navigator from "../../../common/navigator";

export function pageNavigatedTo(args: NavigatedData) {
    const page = <Page>args.object;
    const item = <BlogPostItemData>args.context;

    page.bindingContext = item;
}

export function onToggleFavouriteTap(args: EventData){
    const page = <Page>(<View>args.object).page;
    const item = <BlogPostItemData>page.bindingContext;

    navigator.navigateBackWithContext({ action: "favorite", item: item });
}

export function onDeleteTap(args: EventData){
    const page = <Page>(<View>args.object).page;
    const item = <BlogPostItemData>page.bindingContext;

    navigator.navigateBackWithContext({ action: "delete", item: item });
}

export function goBack() {
    navigator.navigateBack();
}

