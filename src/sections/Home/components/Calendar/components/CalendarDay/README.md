# Calendar Day

A single calendar day is made up of four layers:

* `DisplayLayer` - The bottom-most layer is a simple visual layer that shows ticks for hours.
* `EventLayer` - The middle layer is where events live. They are positioned absolutely in this layer to make it easier to display events across hours
* `DragLayer` - The drag (dropzone) layer sits on top of the other layers and accepts drag and drop events. It only exists when something in the UI is being dragged so that drag events can still start on elements in the Event layer.
