## Misc

I changed the code to de-structure the props directly in the function component's arguments list.
It seemed more concise with less lines of code. I can change that back if that does not align with
company standards.

Main font on body in index.css? Should it be changed to Open Sans or to Roboto (to match Material theme) in
case raw text is used by accident (i.e. without wrapping it in <Typography/>)?

Box hiding quirk!?!

## Login/Signup pages

The horizontal layout between the blue image area and the white form area
has been made to be match the given pdf images when viewed at a similar aspect ratio.
I made physical screen measurements to ensure the design was accurate.
When viewed full-screen on a wide screen monitor, for example, it doesn't quite match
the given image as the aspect ratio is significantly different.

I could not get the floating label to have the same large margin above the input text as seen in the
PDF example.

The PDF mockup for the signup page has three inputs only while the given code has four, the extra is the password
confirm input. I left it in place but I can remove it to better match the mockup.
