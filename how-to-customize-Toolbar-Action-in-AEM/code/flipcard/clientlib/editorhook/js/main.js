(function (channel, author) {
  "use strict";

  const lastEditorToolbarAction = new author.ui.ToolbarAction({
    name: "FLIP_CARD_SLIDE",
    text: Granite.I18n.get("Flip card slide"),
    icon: "pivot",
    order: "before COPY",
    execute: function (editable, param, target) {
      const front = editable.dom.find(".acc--front");
      front.toggleClass("acc--hide");
      const back = editable.dom.find(".acc--back");
      back.toggleClass("acc--hide");
    },
    condition: function (editable) {
      return editable.type === "wknd/components/flipcard";
    },
    isNonMulti: true,
  });

  channel.on("cq-layer-activated", function (event) {
    if (event.layer === "Edit") {
      author.EditorFrame.editableToolbar.registerAction("FLIP_CARD_SLIDE", lastEditorToolbarAction);
    }
  });
})(jQuery(document), Granite.author);
