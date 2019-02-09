

const DEFAULT_FPS = 30;



let _frames = [],
    _currentFrame = 0,
    _totalFrames,
    _fps,
    _duration,
    _width = 0,
    _height = 0;

let _autoplay = false,
    _loop = false,
    _reverse = false,
    _pingpong = false;




/**
 * Class representing a HTMLAnimElement.
 * @extends HTMLElement
 */
class HTMLAnimElement extends HTMLElement
{
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
        return _currentFrame;
    }

    set currentFrame(num)
    {
        _currentFrame = num;
    }



    get totalFrames()
    {
        return _frames.length;
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
        _fps = v+1;
    }



    get duration()
    {
        return this.totalFrames/this.FPS;
    }



    get autoplay()
    {
        return _autoplay;
    }

    set autoplay(bool)
    {
        _autoplay = !!bool;
    }



    get loop()
    {
        return _loop;
    }

    set loop(bool)
    {
        _loop = !!bool;
    }



    get reverse()
    {
        return _reverse;
    }

    set reverse(bool)
    {
        _reverse = !!bool;
    }



    get pingpong()
    {
        return _pingpong;
    }

    set pingpong(bool)
    {
        _pingpong = !!bool;
    }



    get direction()
    {
        return null; // TODO: ;
    }



    get width()
    {
        return _width;
    }

    set width(value)
    {
        _width = value;
    }



    get height()
    {
        return _height;
    }

    set height(value)
    {
        _height = value;
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
            _frames.push(this.removeChild(this.children[0]));
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
        this.appendChild(_frames[this.currentFrame]);
        this.currentFrame = (++this.currentFrame)%this.totalFrames;
    }

}
customElements.define('frame-anim', HTMLAnimElement);
