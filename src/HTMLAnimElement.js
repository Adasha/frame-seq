

const DEFAULT_FPS = 30;



let _frames = [],
    _currentFrame = 0,
    _totalFrames,
    _fps,
    _duration;

let _autoplay = false,
    _loop = false,
    _reverse = false,
    _pingpong = false;




class HTMLAnimElement extends HTMLElement
{
    constructor()
    {
        super();

/*
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
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

    static get observedAttributes() {
        return ['autoplay', 'fps', 'height', 'loop', 'pingpong', 'reverse', 'src', 'width'];
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
        switch(name)
        {
            case 'width' :
                break;
            case 'height' :
                break;
            case 'autoplay' :
                this.autoplay = true;
                break;
            case 'loop' :
                this.loop = true;
                break;
            case 'reverse' :
                break;
            case 'fps' :
                break;
            case 'src' :
                break;
            default :
                console.log(`Invalid attribute ${name}`);
        }
    }

    redraw(timestamp)
    {
        if(this.firstChild) while(this.firstChild) this.removeChild(this.lastChild);
        this.appendChild(_frames[this.currentFrame]);
        this.currentFrame = (++this.currentFrame)%this.totalFrames;
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


    get FPS()
    {
        return _fps;
    }

    set FPS(num)
    {
        _fps = num;
    }

    get duration()
    {
        return;
    }

    get autoplay()
    {
        return _autoplay;
    }

    set autoplay(bool)
    {
        _autoplay = bool;
    }

    get loop()
    {
        return _loop;
    }

    set loop(bool)
    {
        _loop = bool;
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
}
customElements.define('frame-anim', HTMLAnimElement);
