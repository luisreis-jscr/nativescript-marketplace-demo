import { Page, ViewBase, View } from '@nativescript/core';
// import { isAndroid } from "tns-core-modules/platform";
import * as prof from "../common/profiling";
import * as builder from '@nativescript/core/ui/builder';


import { RadSideDrawer } from "nativescript-ui-sidedrawer";

export class ExamplePage extends Page {

    private sideDrawer: RadSideDrawer;

    public constructor() {
        super();

        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        this.on("navigatingTo", args => {
            if (!this.sideDrawer) {
                const root = this.content;
                const originalRootBindingContext = root.bindingContext;
                const menuPath = "examples/example-menu.xml";
                const menuFragment = <View>builder.load(menuPath, global.loadModule("examples/example-menu"));
                this.sideDrawer = <RadSideDrawer>menuFragment.getViewById("example-menu-drawer");
                this.content = menuFragment;
                this.sideDrawer.mainContent = root;
                if (root.bindingContext !== originalRootBindingContext) {
                    root.bindingContext = originalRootBindingContext;
                }
                this.sideDrawer.drawerContent.bindingContext = this.navigationContext;
            }
        });
    }

    public onLoaded() {
        super.onLoaded();

        // prof.stopCPUProfile("example");
        prof.stop("example");

        this.actionBar.actionItems.getItems().forEach((item: ViewBase) => {
            if (item.id === "exampleMenuButton") {
                item.off("tap", this.toggleDrawer, this);
                item.on("tap", this.toggleDrawer, this);
            }
        });
    }

    private toggleDrawer() {
        this.sideDrawer.toggleDrawerState();
    }
}
