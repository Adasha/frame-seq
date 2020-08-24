/**
 * Class representing a HTMLFrameAnimElement.
 * @version 0.2.0a
 * @author Adam Shailer <adasha76@outlook.com>
 * @class
 * @extends HTMLElement
 */
class HTMLFrameAnimElement extends HTMLElement
{
    #DEFAULT_FPS = 15;


    #frames = [];
    #currentFrame = 1;
    #totalFrames;
    #fps;
    #frameTimer;
    #duration;
    #width = 0;
    #height = 0;

    #playing = false;
    #paused = false;
    #stopped = false;
    #reverse = false;
    #loop = false;
    #pingpong = false;
    #autoplay = false;

    #shadow;



    static get observedAttributes() {
        return ['autoplay', 'firstframe', 'fps', 'height', 'loop', 'pingpong', 'preload', 'reverse', 'src', 'width'];
    }

    /**
     * Create a HTMLFrameAnimElement instance.
     * @constructor
     * @fires HTMLFrameAnimElement#stateChanged
     * @fires HTMLFrameAnimElement#enterFrame
     */
    constructor(...args)
    {
        super(...args);

        this.#shadow = this.attachShadow({mode: 'open'});

        while(this.children.length>0)
        {
            this.#frames.push(this.removeChild(this.children[0]));
        }
       

        this.redraw = this.redraw.bind(this);
    }




    // PROPERTIES



    get currentFrame()
    {
        return this.#currentFrame;
    }

    set currentFrame(num)
    {
        if(isNaN(num))
        {
            throw new TypeError('Frame number must be a number.');
        }
        if(Math.floor(num)!==num)
        {
            console.log('WARN: frame number must be an integer. Fraction discarded.');
            num = Math.floor(num);
        }
        if(num<1 || num>this.totalFrames)
        {
            console.log('WARN: frame number out of range. Closest value used.');
            num = Math.min(Math.max(1, num), this.totalFrames);
        }
        this.#currentFrame = num;
        window.requestAnimationFrame(this.redraw);
    }



    get totalFrames()
    {
        return this.#frames.length;
    }



    get fps()
    {
        return this.getAttribute('fps');
    }

    set fps(value)
    {
        this.setAttribute('fps', value);
    }



    get duration()
    {
        return this.totalFrames/this.fps;
    }



    get autoplay()
    {
        return this.hasAttribute('autoplay');
    }

    set autoplay(bool)
    {
        if(!!bool)
        {
            this.setAttribute('autoplay', '');
        }
        else
        {
            this.removeAttribute('autoplay');
        }
    }



    get loop()
    {
        return this.hasAttribute('loop');
    }

    set loop(bool)
    {
        if(!!bool)
        {
            this.setAttribute('loop', '');
        }
        else
        {
            this.removeAttribute('loop');
        }
    }



    get reverse()
    {
        return this.hasAttribute('reverse');
    }

    set reverse(bool)
    {
        if(!!bool)
        {
            this.setAttribute('reverse', '');
        }
        else
        {
            this.removeAttribute('reverse');
        }
    }



    get pingpong()
    {
        return this.hasAttribute('pingpong');
    }

    set pingpong(bool)
    {
        if(!!bool)
        {
            this.setAttribute('pingpong', '');
        }
        else
        {
            this.removeAttribute('pingpong');
        }
    }



    get preload()
    {
        return this.hasAttribute('preload');
    }

    set preload(bool)
    {
        if(!!bool)
        {
            this.setAttribute('preload', '');
        }
        else
        {
            this.removeAttribute('preload');
        }
    }



    get width()
    {
        return this.getAttribute('width');
    }

    set width(value)
    {
        this.setAttribute('width', value);
    }



    get height()
    {
        return this.getAttribute('height');
    }

    set height(value)
    {
        this.setAttribute('height', value);
    }



    get playing()
    {
        return this.#playing;
    }

    get paused()
    {
        return this.#paused;
    }

    get stopped()
    {
        return this.#stopped;
    }



    //METHODS

    /**
     * Begin playback from the first frame, or the last frame if 'reverse' is true.
     */
    play()
    {
        this.currentFrame = this.reverse ? this.totalFrames : 1;
        this.#startTimer();
        this.#clearStates();
        this.#playing = true;
        this.dispatchEvent(new Event('stateChanged'));
    }

    /**
     * Pause playback at the current frame.
     */
    pause()
    {
        this.#clearTimer();
        this.#clearStates();
        this.#paused = true;
        this.dispatchEvent(new Event('stateChanged'));
    }

    /**
     * Resume playback at the current frame.
     */
    resume()
    {
        this.#startTimer();
        this.#clearStates();
        this.#playing = true;
        this.dispatchEvent(new Event('stateChanged'));
    }

    /**
     * Stop playback and return to the first frame, or the last frame if 'reverse' is true.
     */
    stop()
    {
        this.#clearTimer();
        this.currentFrame = this.reverse ? this.totalFrames : 1;
        this.#clearStates();
        this.#stopped = true;
        this.dispatchEvent(new Event('stateChanged'));
    }


    /**
     * Go to a specific frame and resume playback from there.
     * @param {number} frame 
     */
    gotoAndPlay(frame)
    {
        this.currentFrame = frame;
        this.resume();
    }

    /**
     * Go to a specific frame and pause playback.
     * @param {number} frame 
     */
    gotoAndPause(frame)
    {
        this.currentFrame = frame;
        this.pause();
    }

    /**
     * Advance by one frame.
     */
    nextFrame()
    {
        this.currentFrame = Math.min(this.currentFrame+1, this.totalFrames);
    }

    /**
     * Go back one frame.
     */
    prevFrame()
    {
        this.currentFrame = Math.max(this.currentFrame-1, 1);
    }


    connectedCallback()
    {
        if(this.autoplay)
        {
            this.play();
        }
        else
        {
            this.stop();
        }
    }

    disconnectedCallback()
    {
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        switch(name)
        {
            case 'autoplay' :
                break;

            case 'reverse' :
                break;

            case 'loop' :
                break;

            case 'pingpong' :
                break;

            case 'fps' :
                if(isNaN(this.fps))
                {
                    throw new TypeError('FPS must be a number.');
                }
                if(this.#frameTimer)
                {
                    this.resume();
                }
                break;

            case 'width' :
            case 'height' :
                break;
                
            default :
            throw new Error(`${name} is not a recognised attribute.`);
        }
        this.dispatchEvent(new Event('stateChanged'));
    }



    #startTimer()
    {
        this.#clearTimer();

        let fps = this.fps || this.#DEFAULT_FPS,
            ms  = Math.floor(1000 / fps);
        
        this.#frameTimer = window.setInterval(() => this.#update(), ms);
    }

    #clearTimer()
    {
        if(this.#frameTimer)
        {
            window.clearInterval(this.#frameTimer);
            this.#frameTimer = null;
        }
    }


    #update()
    {
        if(this.reverse)
        {
            if(this.currentFrame>1)
            {
                this.currentFrame--;
            }
            else if(this.loop)
            {
                this.currentFrame = this.totalFrames;
            }
            else{
                this.pause();
            }
        }
        else
        {
            if(this.currentFrame<this.totalFrames)
            {
                this.currentFrame++;
            }
            else if(this.loop)
            {
                this.currentFrame = 1;
            }
            else
            {
                this.pause();
            }
        }
    }


    redraw(timestamp)
    {
        this.#clearFrames();

        this.dispatchEvent(new Event('enterFrame'));

        this.#shadow.appendChild(this.#frames[this.currentFrame-1]);

        this.#cleanUp();
    }


    #clearFrames()
    {
        while(this.#shadow.firstChild)
        {
            this.#shadow.removeChild(this.#shadow.lastChild);
        }
    }


    #clearStates()
    {
        this.#playing = false;
        this.#paused = false;
        this.#stopped = false;
    }


    #cleanUp()
    {

    }
    

}
customElements.define('frame-anim', HTMLFrameAnimElement);
