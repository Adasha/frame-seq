/**
 * Class representing a HTMLAnimElement.
 * @extends HTMLElement
 */
class HTMLAnimElement extends HTMLElement
{
    #DEFAULT_FPS = 30;


    #frames = [];
    #currentFrame = 0;
    #totalFrames;
    #fps;
    #duration;
    #width = 0;
    #height = 0;


    #autoplay = false;
    #loop = false;
    #reverse = false;
    #pingpong = false;



    static get observedAttributes() {
        return ['autoplay', 'fps', 'height', 'loop', 'pingpong', 'reverse', 'src', 'width'];
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
        this.#currentFrame = num;
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
        console.log('hfxhfdx');
        this.setAttribute('fps', value);
        let v = Number(value);
        if(isNaN(v)) throw new Error(`${value} is not a number.`);
        if(v<=0) throw new Error(`FPS must be a positive number.`);
        this.#fps = v+1;
    }



    get duration()
    {
        return this.totalFrames/this.FPS;
    }



    get autoplay()
    {
        return this.#autoplay;
    }

    set autoplay(bool)
    {
        this.#autoplay = !!bool;
    }



    get loop()
    {
        return this.#loop;
    }

    set loop(bool)
    {
        this.#loop = !!bool;
    }



    get reverse()
    {
        return this.#reverse;
    }

    set reverse(bool)
    {
        this.#reverse = !!bool;
    }



    get pingpong()
    {
        return this.#pingpong;
    }

    set pingpong(bool)
    {
        this.#pingpong = !!bool;
    }



    get direction()
    {
        return null; // TODO: ;
    }



    get width()
    {
        return this.#width;
    }

    set width(value)
    {
        this.#width = value;
    }



    get height()
    {
        return this.#height;
    }

    set height(value)
    {
        this.#height = value;
    }



    //METHODS

    play()
    {
    }

    stop()
    {
    }


    gotoAndPlay(frame)
    {
    }

    gotoAndStop(frame)
    {
    }


    nextFrame()
    {
    }

    prevFrame()
    {
    }


    connectedCallback()
    {
        while(this.children.length>0)
        {
            this.#frames.push(this.removeChild(this.children[0]));
        }

        let frameTimer = window.setInterval(() => window.requestAnimationFrame(this.redraw), 100);
    }

    disconnectedCallback()
    {
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if(!(name in this)) throw new Error(`${name} is not a recognised attribute.`);
        else this[name] = newValue;
    }

    redraw(timestamp)
    {
        if(this.firstChild) while(this.firstChild) this.removeChild(this.lastChild);
        this.appendChild(this.#frames[this.currentFrame]);
        this.currentFrame = (++this.currentFrame)%this.totalFrames;
    }

}
customElements.define('frame-anim', HTMLAnimElement);
