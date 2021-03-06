# frame-seq
Custom HTML element to animate nested images.

Early alpha. Preloading not implemented yet so it will stutter through first playthrough.

Not a lot of demo stuff yet, but there is my [basic test suite](http://lab.adasha.com/frame-seq).


## Features

### Current
* playback of any nested elements in sequence
* playback direction control
* autoplay
* looping
* fps control
* simple events

### TBD before v1:
- pingpong playback
- buffering
- preloading
- folder-based image sequences
- size mismatch management
- finer-grained events


### Post v1
- Onion skinning




## Usage

To use, embed JS file in `dist` and add the `<frame-seq>` element to your HTML. Any elements nested inside will be played back in order of the HTML.


```HTML
<frame-seq>
    <img src="imgseq01.jpg" ... >
    <img src="imgseq02.jpg" ... >
    <img src="imgseq03.jpg" ... >
    <img src="imgseq04.jpg" ... >
    <img src="imgseq05.jpg" ... >
    <img src="imgseq06.jpg" ... >
    <img src="imgseq07.jpg" ... >
    <img src="imgseq08.jpg" ... >
    <img src="imgseq09.jpg" ... >
    <img src="imgseq10.jpg" ... >
</frame-seq>
```



### Attributes

- `fps` - Playback speed (frames-per-second). Default 12.
- `autoplay` - Boolean: Begin playback as soon as element is rendered.
- `reverse` - Boolean: Playback is in opposite direction.
- `pingpong` - Boolean: Doesn't do anything yet.
- `loop` - Boolean: Playback automatically loops (regardless of direction).
- `width` - Doesn't do anything yet.
- `height` - Doesn't do anything yet.
- `preload` - Boolean: Doesn't do anything yet.



### Properties

All attributes are also expressed as properties. Additional properties are:

- `currentFrame` - The current playhead position (starting at 1).
- `totalFrames` - The total number of frames in the animation (read-only).
- `duration` - The total running time of the animation, based on the current FPS (read-only).
- `playing` - Boolean: Whether the animation is currently playing (read-only).
- `paused` - Boolean: Whether the animation is currently paused (read-only).
- `stopped` - Boolean: Whether the animation is currently stopped (read-only).



### Methods

These methods will almost certainly be thinned out in a future version.

- `play()`
- `pause()`
- `resume()`
- `stop()`
- `gotoAndPlay(frame)`
- `gotoAndResume(frame)`
- `nextFrame()`
- `prevFrame()`



### Events

- `stateChanged` - When the playback state has changed or any attribute is modified.
- `enterFrame` - At the beginning of each redraw.

