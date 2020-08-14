/**
 * Class representing a HTMLAnimElement.
 * @extends HTMLElement
 */
class HTMLAnimElement extends HTMLElement
{
    #DEFAULT_FPS = 15;


    #frames = [];
    #currentFrame = 0;
    #totalFrames;
    #fps;
    #frameTimer;
    #duration;
    #width = 0;
    #height = 0;

    #playing;
    #paused;
    #stopped;

    #autoplay = false;
    #loop = false;
    #reverse = false;
    #pingpong = false;



    static get observedAttributes() {
        return ['autoplay', 'firstframe', 'fps', 'height', 'loop', 'pingpong', 'reverse', 'src', 'width'];
    }

    /**
     * Create a new HTMLAnimElement.
     */
    constructor(...args)
    {
        super(...args);

/*
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
            <style>
                frame-anim
                {
                    width: 300px;
                    height: 300px;
                    position: relative;
                }
            </style>
        `;
        */
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
        if(num<0 || num>=this.totalFrames)
        {
            console.log('WARN: frame number out of range. Closest value used.');
            num = Math.max(0, num)%this.totalFrames;
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
        if(isNaN(value))
        {
            throw new TypeError('FPS must be a number.');
        }
        this.setAttribute('fps', value);
        if(this.#frameTimer)
        {
            this.resume();
        }
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



    get direction()
    {
        return null; // TODO: ;
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

    //METHODS

    play()
    {
        this.currentFrame = this.reverse ? this.totalFrames-1 : 0;
        this.#startTimer();
        this.#clearStates();
        this.#playing = true;
        this.dispatchEvent(new Event('stateChanged'));
    }

    pause()
    {
        this.#clearTimer();
        this.#clearStates();
        this.#paused = true;
        this.dispatchEvent(new Event('stateChanged'));
    }

    resume()
    {
        this.#startTimer();
        this.#clearStates();
        this.#playing = true;
        this.dispatchEvent(new Event('stateChanged'));
    }

    stop()
    {
        this.#clearTimer();
        this.currentFrame = this.reverse ? this.totalFrames-1 : 0;
        this.#clearStates();
        this.#stopped = true;
        this.dispatchEvent(new Event('stateChanged'));
    }


    gotoAndPlay(frame)
    {
        this.currentFrame = frame;
        this.resume();
    }

    gotoAndPause(frame)
    {
        this.currentFrame = frame;
        this.pause();
    }


    nextFrame()
    {
        ++this.currentFrame;
    }

    prevFrame()
    {
        --this.currentFrame;
    }


    connectedCallback()
    {
        while(this.children.length>0)
        {
            this.#frames.push(this.removeChild(this.children[0]));
        }
        
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
        if(!(name in this)) throw new Error(`${name} is not a recognised attribute.`);
        //else this[name] = newValue;
    }



    #startTimer()
    {
        this.#clearTimer();

        let fps = this.fps ? this.fps : this.#DEFAULT_FPS,
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
            if(this.currentFrame>0)
            {
                this.currentFrame--;
            }
            else if(this.loop)
            {
                this.currentFrame = this.totalFrames - 1;
            }
            else{
                this.pause();
            }
        }
        else
        {
            if(this.currentFrame<(this.totalFrames-1))
            {
                this.currentFrame++;
            }
            else if(this.loop)
            {
                this.currentFrame = 0;
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

        this.appendChild(this.#frames[this.currentFrame]);

        this.#cleanUp();
    }


    #clearFrames()
    {
        while(this.firstChild)
        {
            this.removeChild(this.lastChild);
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
customElements.define('frame-anim', HTMLAnimElement);
