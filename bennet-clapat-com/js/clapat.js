"use strict";
var _ie,
    _firefox,
    _opera,
    _webkit,
    _chrome,
    _ie_real_version,
    _osx,
    _windows,
    _linux,
    _android,
    _win64,
    _iphone,
    _ipad,
    _native,
    _mobile,
    useHasFeature,
    _populated = !1;
function _populate() {
    if (!_populated) {
        _populated = !0;
        var e = navigator.userAgent,
            t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e),
            i = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
        if (((_iphone = /\b(iPhone|iP[ao]d)/.exec(e)), (_ipad = /\b(iP[ao]d)/.exec(e)), (_android = /Android/i.exec(e)), (_native = /FBAN\/\w+;/i.exec(e)), (_mobile = /Mobile/i.exec(e)), (_win64 = !!/Win64/.exec(e)), t)) {
            (_ie = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN) && document && document.documentMode && (_ie = document.documentMode);
            var s = /(?:Trident\/(\d+.\d+))/.exec(e);
            (_ie_real_version = s ? parseFloat(s[1]) + 4 : _ie),
                (_firefox = t[2] ? parseFloat(t[2]) : NaN),
                (_opera = t[3] ? parseFloat(t[3]) : NaN),
                (_chrome = (_webkit = t[4] ? parseFloat(t[4]) : NaN) && (t = /(?:Chrome\/(\d+\.\d+))/.exec(e)) && t[1] ? parseFloat(t[1]) : NaN);
        } else _ie = _firefox = _opera = _chrome = _webkit = NaN;
        if (i) {
            if (i[1]) {
                var n = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
                _osx = !n || parseFloat(n[1].replace("_", "."));
            } else _osx = !1;
            (_windows = !!i[2]), (_linux = !!i[3]);
        } else _osx = _windows = _linux = !1;
    }
}
var UserAgent_DEPRECATED = {
    ie: function () {
        return _populate() || _ie;
    },
    ieCompatibilityMode: function () {
        return _populate() || _ie_real_version > _ie;
    },
    ie64: function () {
        return UserAgent_DEPRECATED.ie() && _win64;
    },
    firefox: function () {
        return _populate() || _firefox;
    },
    opera: function () {
        return _populate() || _opera;
    },
    webkit: function () {
        return _populate() || _webkit;
    },
    safari: function () {
        return UserAgent_DEPRECATED.webkit();
    },
    chrome: function () {
        return _populate() || _chrome;
    },
    windows: function () {
        return _populate() || _windows;
    },
    osx: function () {
        return _populate() || _osx;
    },
    linux: function () {
        return _populate() || _linux;
    },
    iphone: function () {
        return _populate() || _iphone;
    },
    mobile: function () {
        return _populate() || _iphone || _ipad || _android || _mobile;
    },
    nativeApp: function () {
        return _populate() || _native;
    },
    android: function () {
        return _populate() || _android;
    },
    ipad: function () {
        return _populate() || _ipad;
    },
},
    canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement),
    ExecutionEnvironment = {
        canUseDOM: canUseDOM,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: canUseDOM && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: canUseDOM && !!window.screen,
        isInWorker: !canUseDOM,
    };
function isEventSupported(e, t) {
    if (!ExecutionEnvironment.canUseDOM || (t && !("addEventListener" in document))) return !1;
    var i = "on" + e,
        s = i in document;
    if (!s) {
        var n = document.createElement("div");
        n.setAttribute(i, "return;"), (s = "function" == typeof n[i]);
    }
    return !s && useHasFeature && "wheel" === e && (s = document.implementation.hasFeature("Events.wheel", "3.0")), s;
}
ExecutionEnvironment.canUseDOM && (useHasFeature = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""));
var PIXEL_STEP = 10,
    LINE_HEIGHT = 40,
    PAGE_HEIGHT = 800;
function normalizeWheel(e) {
    var t = 0,
        i = 0,
        s = 0,
        n = 0;
    return (
        "detail" in e && (i = e.detail),
        "wheelDelta" in e && (i = -e.wheelDelta / 120),
        "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
        "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
        "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
        (s = t * PIXEL_STEP),
        (n = i * PIXEL_STEP),
        "deltaY" in e && (n = e.deltaY),
        "deltaX" in e && (s = e.deltaX),
        (s || n) && e.deltaMode && (1 == e.deltaMode ? ((s *= LINE_HEIGHT), (n *= LINE_HEIGHT)) : ((s *= PAGE_HEIGHT), (n *= PAGE_HEIGHT))),
        s && !t && (t = s < 1 ? -1 : 1),
        n && !i && (i = n < 1 ? -1 : 1),
        { spinX: t, spinY: i, pixelX: s, pixelY: n }
    );
}
normalizeWheel.getEventType = function () {
    return UserAgent_DEPRECATED.firefox() ? "DOMMouseScroll" : isEventSupported("wheel") ? "wheel" : "mousewheel";
};
const store = {
    ww: window.innerWidth,
    wh: window.innerHeight,
    isDevice:
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i),
};
class ClapatWebGL {
    constructor(e) {
        (this.scene = new THREE.Scene()),
            (this.vertex = "varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}"),
            (this.material = e.material),
            (this.fragment = e.fragment),
            (this.uniforms = e.uniforms),
            (this.renderer = new THREE.WebGLRenderer()),
            (this.width = window.innerWidth),
            (this.height = window.innerHeight),
            this.renderer.setPixelRatio(window.devicePixelRatio),
            this.renderer.setSize(this.width, this.height),
            this.renderer.setClearColor(2303786, 1),
            (this.container = document.getElementById("canvas-slider")),
            (this.images = Array.from(document.querySelectorAll(".slide-img"))),
            (this.width = this.container.offsetWidth),
            (this.height = this.container.offsetHeight),
            this.container.appendChild(this.renderer.domElement),
            (this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1e3)),
            this.camera.position.set(0, 0, 2),
            (this.current = 0),
            (this.textures = []),
            (this.isRunning = !1),
            (this.paused = !0),
            (this.onTexturesLoaded = null),
            this.initiate(() => {
                this.setupResize(), this.addObjects(), this.resize(), this.onTexturesLoaded && this.onTexturesLoaded(), this.play();
            });
    }
    initiate(e) {
        let t = [],
            i = this;
        this.images.forEach((e, s) => {
            let n = new Promise((t) => {
                i.textures[s] = new THREE.TextureLoader().load(e.src, t);
            });
            t.push(n);
        }),
            Promise.all(t).then(() => {
                e();
            });
    }
    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }
    resize() {
        let e, t;
        (this.width = this.container.offsetWidth),
            (this.height = this.container.offsetHeight),
            this.renderer.setSize(this.width, this.height),
            (this.camera.aspect = this.width / this.height),
            (this.imageAspect = this.textures[0].image.height / this.textures[0].image.width),
            this.height / this.width > this.imageAspect ? ((e = (this.width / this.height) * this.imageAspect), (t = 1)) : ((e = 1), (t = this.height / this.width / this.imageAspect)),
            (this.material.uniforms.resolution.value.x = this.width),
            (this.material.uniforms.resolution.value.y = this.height),
            (this.material.uniforms.resolution.value.z = e),
            (this.material.uniforms.resolution.value.w = t);
        let i = this.camera.position.z;
        (this.camera.fov = (180 / Math.PI) * 2 * Math.atan(1 / (2 * i))), (this.plane.scale.x = this.camera.aspect), (this.plane.scale.y = 1), this.camera.updateProjectionMatrix();
    }
    addObjects() {
        let e = jQuery("#clapat-webgl-slider").attr("data-pattern-img"),
            t = new THREE.TextureLoader().load(e);
        (t.wrapS = t.wrapT = THREE.RepeatWrapping),
            (this.material = new THREE.ShaderMaterial({
                uniforms: {
                    effectFactor: { type: "f", value: 0.15 },
                    dispFactor: { type: "f", value: 0 },
                    currentImage: { type: "t", value: this.textures[0] },
                    nextImage: { type: "t", value: this.textures[1] },
                    disp: { type: "t", value: t },
                    resolution: { type: "v4", value: new THREE.Vector4() },
                },
                vertexShader: this.vertex,
                fragmentShader: this.fragment,
                transparent: !0,
                opacity: 1,
            })),
            (this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2)),
            (this.plane = new THREE.Mesh(this.geometry, this.material)),
            this.scene.add(this.plane);
    }
    stop() {
        this.paused = !0;
    }
    play() {
        (this.paused = !1), this.render();
    }
    render() {
        this.paused || (requestAnimationFrame(this.render.bind(this)), this.renderer.render(this.scene, this.camera));
    }
}
class ClapatSlider {
    constructor(e, t = {}) {
        if ((this.bindAll(), this.isElement(e))) (this.el = e), (this.el.clapat_slider = this);
        else {
            let i = document.querySelectorAll(e);
            for (let e = 0; e < i.length; e++) {
                let s = i[e];
                0 == e ? ((this.el = s), (this.el.clapat_slider = this)) : new ClapatSlider(s, t);
            }
        }
        (this.opts = Object.assign(
            {
                debug: !1,
                direction: "horizontal",
                eventTarget: ".clapat-slider",
                outer: ".clapat-slider",
                inner: ".clapat-slider-viewport",
                slides: ".clapat-slide",
                clones: "clapat-slide-clone",
                snap: !1,
                snapwait: { before: 10, after: 80 },
                autoplay: !1,
                speed: 2,
                threshold: 50,
                ease: 0.075,
                click: !1,
                mousewheel: !0,
                navigation: !0,
                pagination: !0,
                renderBullet: null,
                webgl: !1,
                webgl_direction: "horizontal",
                parallax: null,
                rotate: null,
                opacity: null,
                scale: null,
                on: { init: null, activeSlideChange: null, slideEnterViewport: null, slideLeaveViewport: null, slideEnter: null, slideLeave: null },
            },
            t
        )),
            (this.elEventTarget = this.el.querySelector(this.opts.eventTarget)),
            (this.elInner = this.el.querySelector(this.opts.inner)),
            (this.elOuter = this.el.querySelector(this.opts.outer)),
            (this.btnNext = this.btnPrev = null),
            this.isObject(this.opts.navigation) || 1 != this.opts.navigation || ((this.btnNext = this.el.querySelector(".clapat-button-next")), (this.btnPrev = this.el.querySelector(".clapat-button-prev"))),
            this.isObject(this.opts.navigation) && ((this.btnNext = document.querySelector(this.opts.navigation.nextEl)), (this.btnPrev = document.querySelector(this.opts.navigation.prevEl))),
            null != this.btnNext && this.btnNext.addEventListener("click", this.debounce(this.onNext, 50)),
            null != this.btnPrev && this.btnPrev.addEventListener("click", this.debounce(this.onPrev, 50)),
            (this.elPagination = null),
            this.isObject(this.opts.pagination) || 1 != this.opts.pagination || (this.elPagination = this.el.querySelector(".clapat-pagination")),
            this.isObject(this.opts.pagination) && (this.elPagination = this.el.querySelector(this.opts.navigation.el)),
            (this.vh = store.wh),
            (this.vw = store.ww),
            (this.vshifth = 0),
            (this.vshiftw = 0),
            (this.state = {
                target: 0,
                current: 0,
                currentRounded: 0,
                prevRounded: 0,
                currentMovingDirection: 0,
                currentSlideItem: null,
                moveOffset: 0,
                y: 0,
                on: { x: 0, y: 0 },
                off: 0,
                progress: 0,
                diff: 0,
                flags: { mousedown: !1, dragging: !1, click: !0, resizing: !1 },
            }),
            (this.items = []),
            (this.itemsInitial = []),
            (this.itemsCloned = []),
            (this.itemsPagination = []),
            (this.tl = null),
            (this.events = {
                move: store.isDevice ? "touchmove" : "mousemove",
                up: store.isDevice ? "touchend" : "mouseup",
                down: store.isDevice ? "touchstart" : "mousedown",
                click: "click",
                wheel: "wheel",
                mousewheel: "mousewheel",
                resize: "resize",
            }),
            (this.enabled = !0),
            (this.length = 0),
            (this.updater = gsap.set(this.updateUI, { delay: 0.2, onRepeat: this.updateUI, repeat: -1, repeatDelay: 0.2 })),
            (this.snapWheelEvents = { tsSnap: null, events: [] }),
            (this.gl_canvas = null),
            this.init(),
            ClapatSlider.instances.push(this);
    }
    bindAll() {
        ["onDown", "onMove", "onUp", "onClick", "onWheel", "onResize", "onPagination", "onPrev", "onNext", "updateUI", "updateWheelSnap", "tick"].forEach((e) => (this[e] = this[e].bind(this)));
    }
    init() {
        return gsap.utils.pipe(this.setup(), this.setupEvents());
    }
    on(e, t) {
        this.opts.on[e] = t;
    }
    destroy() {
        this.off(), (this.state = null), (this.items = null), (this.opts = null), (this.ui = null);
    }
    setupEvents() {
        let { move: e, up: t, down: i, resize: s, wheel: n, mousewheel: l } = this.events,
            a = this.elEventTarget;
        null != a && (a.addEventListener(i, this.onDown), a.addEventListener(e, this.onMove), this.opts.mousewheel && (a.addEventListener(n, this.onWheel), a.addEventListener(l, this.onWheel)), window.addEventListener(t, this.onUp)),
            window.addEventListener(s, this.debounce(this.onResize, 250));
    }
    off() {
        let { move: e, up: t, down: i, resize: s, wheel: n, mousewheel: l } = this.events,
            a = this.elEventTarget;
        null != a &&
            (a.removeEventListener(i, this.onDown), a.removeEventListener(e, this.onMove), this.opts.mousewheel && (a.removeEventListener(n, this.onWheel), a.removeEventListener(l, this.onWheel)), window.removeEventListener(t, this.onUp)),
            null != this.btnNext && this.btnNext.removeEventListener("click", this.debounce(this.onNext, 50)),
            null != this.btnPrev && this.btnPrev.removeEventListener("click", this.debounce(this.onPrev, 50)),
            null != this.el && 0 != this.opts.click && this.el.removeEventListener("click", this.onClick),
            window.removeEventListener(s, this.debounce(this.onResize, 250)),
            this.updater.kill(),
            (this.updater = null),
            gsap.ticker.remove(this.tick),
            clearInterval(this.threadAutoplay);
    }
    viewportSize() {
        return "vertical" == this.opts.direction ? this.vh : this.vw;
    }
    viewportShift() {
        return "vertical" == this.opts.direction ? this.vshifth : this.vshiftw;
    }
    setup() {
        if (null != this.el) {
            let { top: e, left: t, width: i, height: s } = this.el.getBoundingClientRect();
            (this.vh = s), (this.vw = i), (this.vshifth = e), (this.vshiftw = t);
        }
        let e = this.elInner.querySelectorAll(this.opts.slides),
            t = 1;
        for (let i = e.length - 1; i >= 0; i--) {
            let s = e[i],
                n = s.cloneNode(!0);
            "vertical" == this.opts.direction
                ? ((s.style.top = 100 * i + "%"), (n.style.top = -100 * t + "%"), n.classList.add(this.opts.clones), this.elInner.append(n))
                : ((s.style.left = 100 * i + "%"), (n.style.left = -100 * t + "%"), n.classList.add(this.opts.clones), this.elInner.prepend(n)),
                t++;
        }
        if (null != this.elPagination)
            for (let t = 0; t < e.length; t++) {
                e[t];
                let i = document.createElement("div");
                i.classList.add("clapat-pagination-bullet"),
                    "function" == typeof this.opts.renderBullet && (i.innerHTML = this.opts.renderBullet()),
                    this.elPagination.appendChild(i),
                    i.addEventListener("click", this.onPagination),
                    this.itemsPagination.push({ el: i });
            }
        this.tl = gsap.timeline({ paused: !0, defaults: { duration: 1, ease: "linear" } });
        let i = this.elInner.querySelectorAll(this.opts.slides);
        for (let e = 0; e < i.length; e++) {
            let t = i[e],
                { left: s, right: n, top: l, bottom: a, width: r, height: o } = t.getBoundingClientRect(),
                h = null;
            "vertical" == this.opts.direction ? ((h = { el: t, start: l, end: a, length: o, translate: 0 }), (this.length += o)) : ((h = { el: t, start: s, end: n, length: r, translate: 0 }), (this.length += r)),
                t.classList.contains(this.opts.clones) ? (this.itemsCloned.push(h), (h.clone = !0)) : (this.itemsInitial.push(h), (h.clone = !1)),
                this.items.push(h);
        }
        "vertical" == this.opts.direction && this.itemsCloned.reverse();
        let s = e.length;
        if ("vertical" == this.opts.direction) {
            for (let e = 0; e < s; e++) {
                let t = this.items[e];
                (t.prevElement = 0 == e ? this.items[s] : this.items[e - 1]), (t.nextElement = e == s - 1 ? this.items[this.items.length - 1] : this.items[e + 1]);
            }
            for (let e = this.items.length - 1; e >= s; e--) {
                let t = this.items[e];
                e == this.items.length - 1 ? (t.prevElement = this.items[s - 1]) : (t.prevElement = this.items[e + 1]), (t.nextElement = e == s ? this.items[0] : this.items[e - 1]);
            }
        } else
            for (let e = 0; e < this.items.length; e++) {
                let t = this.items[e];
                (t.prevElement = 0 == e ? this.items[this.items.length - 1] : this.items[e - 1]), e == this.items.length - 1 ? (t.nextElement = this.items[0]) : (t.nextElement = this.items[e + 1]);
            }
        for (let e = 0; e < this.items.length; e++) {
            let t = this.items[e];
            if (Array.isArray(this.opts.parallax))
                for (let e = 0; e < this.opts.parallax.length; e++) {
                    let i = this.opts.parallax[e];
                    if (void 0 !== i.element && void 0 !== i.margin) {
                        let e = t.el.querySelectorAll(i.element);
                        t.elParallaxList = e;
                    }
                }
            if (Array.isArray(this.opts.rotate))
                for (let e = 0; e < this.opts.rotate.length; e++) {
                    let i = this.opts.rotate[e];
                    if (void 0 !== i.element && void 0 !== i.factor) {
                        let e = t.el.querySelectorAll(i.element);
                        t.elRotateList = e;
                    }
                }
            if (Array.isArray(this.opts.opacity))
                for (let e = 0; e < this.opts.opacity.length; e++) {
                    let i = this.opts.opacity[e];
                    if (void 0 !== i.element && void 0 !== i.factor) {
                        let e = t.el.querySelectorAll(i.element);
                        t.elOpacityList = e;
                    }
                }
            if (Array.isArray(this.opts.scale))
                for (let e = 0; e < this.opts.scale.length; e++) {
                    let i = this.opts.scale[e];
                    if (void 0 !== i.element && void 0 !== i.factor) {
                        let e = t.el.querySelectorAll(i.element);
                        t.elScaleList = e;
                    }
                }
        }
        if ((null != this.el && 0 != this.opts.click && this.el.addEventListener("click", this.onClick), this.setupWebGL(), gsap.ticker.add(this.tick), (this.threadAutoplay = null), this.opts.autoplay)) {
            let e = 5e3;
            this.isObject(this.opts.autoplay) && this.opts.autoplay.hasOwnProperty("speed") && (e = this.opts.autoplay.speed), e >= 500 && (this.threadAutoplay = setInterval(this.onNext, e));
        }
    }
    tick() {
        this.render();
    }
    calc() {
        let e = this.state;
        if (((e.current += (e.target - e.current) * this.opts.ease), (e.prevRounded = e.currentRounded), (e.currentRounded = Math.round(100 * e.current) / 100), e.prevRounded != e.currentRounded)) {
            e.diff = e.target - e.currentRounded;
            let t = Math.round((-this.length / 2) * 100) / 100;
            (e.progress = gsap.utils.wrap(0, 1, e.currentRounded / t)),
                (e.moveOffset = gsap.utils.wrap(0, this.length, Math.abs(e.currentRounded))),
                e.prevRounded > e.currentRounded && (e.currentMovingDirection = 1),
                e.prevRounded < e.currentRounded && (e.currentMovingDirection = -1),
                this.tl && this.tl.progress(e.progress);
        }
    }
    render() {
        this.state.flags.resizing || (this.opts.snap && this.updateWheelSnap(), this.calc(), this.transformItems(), this.effects());
    }
    transformItems() {
        let e = this.viewportSize(),
            t = this.viewportShift();
        for (let i = 0; i < this.items.length; i++) {
            let s = this.items[i],
                n = this.state.moveOffset * Math.sign(this.state.currentRounded);
            n < 0 && s.end + n < e + t + s.length - this.length && (n += this.length),
                n > 0 && s.end + n > this.length && (n -= this.length),
                "vertical" == this.opts.direction ? (s.el.style.transform = "translate(0, " + n + "px)") : (s.el.style.transform = "translate(" + n + "px, 0)");
        }
    }
    updateUI() {
        let e = this.viewportSize(),
            t = this.viewportShift(),
            i = this.elInner.getBoundingClientRect(),
            s = this.elOuter.getBoundingClientRect(),
            n = gsap.utils.wrap(0, this.length, Math.abs(this.state.target)),
            l = Math.sign(this.state.target);
        null != this.el &&
            (this.state.currentMovingDirection >= 0
                ? (this.el.classList.contains("bw") && this.el.classList.remove("bw"), this.el.classList.add("fw"))
                : (this.el.classList.contains("fw") && this.el.classList.remove("fw"), this.el.classList.add("bw")));
        let a = this.state.currentSlideItem;
        this.state.currentSlideItem = null;
        for (let r = 0; r < this.items.length; r++) {
            let o = this.items[r],
                h = n * l;
            h < 0 && o.end + h < e + t + o.length - this.length && (h += this.length), h > 0 && o.end + h > this.length && (h -= this.length);
            let d = o.start + h - (t + (e - o.length) / 2);
            if (
                (Math.abs(d) < o.length / 2
                    ? (o.el.classList.add("clapat-slide-active"),
                        o.nextElement.el.classList.add("clapat-slide-next"),
                        o.nextElement.nextElement.el.classList.add("clapat-slide-next-two"),
                        o.nextElement.nextElement.nextElement.el.classList.add("clapat-slide-next-three"),
                        o.prevElement.el.classList.add("clapat-slide-prev"),
                        o.prevElement.prevElement.el.classList.add("clapat-slide-prev-two"),
                        o.prevElement.prevElement.prevElement.el.classList.add("clapat-slide-prev-three"),
                        (this.state.currentSlideItem = o),
                        null != a &&
                        a !== this.state.currentSlideItem &&
                        "function" == typeof this.opts.on.activeSlideChanged &&
                        this.opts.on.activeSlideChanged(this.state.currentSlideItem.el, this.state.currentSlideItem.prevElement.el, this.state.currentSlideItem.nextElement.el))
                    : (o.el.classList.remove("clapat-slide-active"),
                        o.nextElement.el.classList.remove("clapat-slide-next"),
                        o.nextElement.nextElement.el.classList.remove("clapat-slide-next-two"),
                        o.nextElement.nextElement.nextElement.el.classList.remove("clapat-slide-next-three"),
                        o.prevElement.el.classList.remove("clapat-slide-prev"),
                        o.prevElement.prevElement.el.classList.remove("clapat-slide-prev-two"),
                        o.prevElement.prevElement.prevElement.el.classList.remove("clapat-slide-prev-three")),
                    o.end + h > t && o.start + h < e + t ? o.el.classList.add("clapat-slide-visible") : o.el.classList.remove("clapat-slide-visible"),
                    o.translate != h)
            ) {
                let e = this.isItemInsideView(i, o);
                o.translate = h;
                let t = this.isItemInsideView(i, o),
                    n = this.isItemInsideView(s, o);
                e && !t && "function" == typeof this.opts.on.slideLeaveViewport && this.opts.on.slideLeaveViewport(o.el), !e && t && "function" == typeof this.opts.on.slideEnterViewport && this.opts.on.slideEnterViewport(o.el);
                let l = this.isItemInsideView(s, o);
                n && !l && "function" == typeof this.opts.on.slideLeave && this.opts.on.slideLeave(o.el), !n && l && "function" == typeof this.opts.on.slideEnter && this.opts.on.slideEnter(o.el);
            }
        }
        this.state.flags.dragging ? this.el.classList.add("clapat-state-dragging") : this.el.classList.remove("clapat-state-dragging"), this.updatePaginationUI(), null == a && "function" == typeof this.opts.on.init && this.opts.on.init();
    }
    updatePaginationUI() {
        if (this.opts.pagination && !(this.itemsPagination.length <= 0) && null != this.state.currentSlideItem) {
            let e = null;
            e = this.state.currentSlideItem.clone ? this.itemsCloned : this.itemsInitial;
            let t = -1;
            for (let i = 0; i < e.length; i++) {
                let s = e[i];
                if (this.state.currentSlideItem.el === s.el) {
                    t = i;
                    break;
                }
            }
            let i = this.itemsPagination[t];
            null != i && i.el.classList.add("clapat-pagination-bullet-active");
            let s = t - 1;
            s < 0 && (s = this.itemsPagination.length - 1);
            let n = this.itemsPagination[s];
            null != n && n.el.classList.add("clapat-pagination-bullet-prev");
            let l = t + 1;
            l >= this.itemsPagination.length && (l = 0);
            let a = this.itemsPagination[l];
            null != a && a.el.classList.add("clapat-pagination-bullet-next");
            for (let e = 0; e < this.itemsPagination.length; e++) {
                let i = this.itemsPagination[e];
                e != t && i.el.classList.remove("clapat-pagination-bullet-active"), e != l && i.el.classList.remove("clapat-pagination-bullet-next"), e != s && i.el.classList.remove("clapat-pagination-bullet-prev");
            }
        }
    }
    effects() {
        if (!((null != this.opts.parallax && 0 != this.opts.parallax) || (null != this.opts.rotate && 0 != this.opts.rotate) || (null != this.opts.opacity && 0 != this.opts.opacity) || (null != this.opts.scale && 0 != this.opts.scale)))
            return;
        let e = this.viewportSize(),
            t = this.viewportShift();
        this.elInner.getBoundingClientRect();
        let i = this.state.moveOffset * Math.sign(this.state.currentRounded);
        for (let s = 0; s < this.items.length; s++) {
            let n = this.items[s],
                l = i;
            if ((l < 0 && n.end + l < e + t + n.length - this.length && (l += this.length), l > 0 && n.end + l > this.length && (l -= this.length), n.end + l > t && n.start + l < e + t)) {
                let i = n.start + l - (t + (e - n.length) / 2);
                if (Array.isArray(this.opts.parallax))
                    for (let t = 0; t < this.opts.parallax.length; t++) {
                        let s = this.opts.parallax[t];
                        if (void 0 !== s.element && void 0 !== s.margin) {
                            let t = n.elParallaxList,
                                l = (-s.margin * i * 2) / (n.length + e);
                            for (let e = 0; e < t.length; e++) {
                                let i = t[e],
                                    s = i.style.transform,
                                    n = "";
                                if ("vertical" == this.opts.direction) {
                                    let e = /translateY\(([^)]+)\)/;
                                    n = s.search(e) >= 0 ? s.replace(e, "translateY(" + l + "%)") : s + " translateY(" + l + "%)";
                                } else {
                                    let e = /translateX\(([^)]+)\)/;
                                    n = s.search(e) >= 0 ? s.replace(e, "translateX(" + l + "%)") : s + " translateX(" + l + "%)";
                                }
                                i.style.transform = n;
                            }
                        }
                    }
                if (Array.isArray(this.opts.rotate))
                    for (let t = 0; t < this.opts.rotate.length; t++) {
                        let s = this.opts.rotate[t];
                        if (void 0 !== s.element && void 0 !== s.factor) {
                            let t = n.elRotateList,
                                l = (-s.factor * i * 2) / (n.length + e);
                            for (let e = 0; e < t.length; e++) {
                                let i = t[e],
                                    s = i.style.transform,
                                    n = /rotate\(([^)]+)\)/,
                                    a = "";
                                (a = s.search(n) >= 0 ? s.replace(n, "rotate(" + l + "deg)") : s + " rotate(" + l + "deg)"), (i.style.transform = a);
                            }
                        }
                    }
                if (Array.isArray(this.opts.opacity))
                    for (let t = 0; t < this.opts.opacity.length; t++) {
                        let s = this.opts.opacity[t];
                        if (void 0 !== s.element && void 0 !== s.factor) {
                            let t = n.elOpacityList,
                                l = (-s.factor * i * 2) / e;
                            l = 1 - Math.abs(l);
                            for (let e = 0; e < t.length; e++) t[e].style.opacity = l;
                        }
                    }
                if (Array.isArray(this.opts.scale))
                    for (let t = 0; t < this.opts.scale.length; t++) {
                        let s = this.opts.scale[t];
                        if (void 0 !== s.element && void 0 !== s.factor) {
                            let t = n.elScaleList,
                                l = (-s.factor * i * 2) / e;
                            l = 1 - Math.abs(l);
                            for (let e = 0; e < t.length; e++) {
                                let i = t[e],
                                    s = i.style.transform,
                                    n = /scale\(([^)]+)\)/,
                                    a = "";
                                (a = s.search(n) >= 0 ? s.replace(n, "scale(" + l + ")") : s + " scale(" + l + ")"), (i.style.transform = a);
                            }
                        }
                    }
            }
        }
    }
    snapTargetOnDrag(e) {
        let t = this.viewportSize(),
            i = this.viewportShift(),
            s = gsap.utils.wrap(0, this.length, Math.abs(e)),
            n = Math.sign(e);
        for (let l = 0; l < this.items.length; l++) {
            let a = this.items[l],
                r = s * n;
            r < 0 && a.end + r < t + i + a.length - this.length && (r += this.length), r > 0 && a.end + r > this.length && (r -= this.length);
            let o = a.start + r - (i + (t - a.length) / 2);
            if (Math.abs(o) < a.length / 2) return e - o;
        }
        return e;
    }
    snapTargetOnWheel(e, t) {
        let i = this.viewportSize(),
            s = this.viewportShift(),
            n = gsap.utils.wrap(0, this.length, Math.abs(e)),
            l = Math.sign(e),
            a = -1;
        for (let e = 0; e < this.items.length; e++) {
            let t = this.items[e],
                r = n * l;
            r < 0 && t.end + r < i + s + t.length - this.length && (r += this.length), r > 0 && t.end + r > this.length && (r -= this.length);
            let o = t.start + r - (s + (i - t.length) / 2);
            if (Math.abs(o) < t.length / 2) {
                a = e;
                break;
            }
        }
        let r = gsap.utils.wrap(0, this.length, Math.abs(t)),
            o = Math.sign(t);
        for (let n = 0; n < this.items.length; n++) {
            let l = this.items[n],
                h = r * o;
            h < 0 && l.end + h < i + s + l.length - this.length && (h += this.length), h > 0 && l.end + h > this.length && (h -= this.length);
            let d = l.start + h - (s + (i - l.length) / 2);
            if (Math.abs(d) < l.length / 2)
                return a == n && Math.abs(t - e) < this.length
                    ? (this.log("Snapping - start and end items are the same, the scroll did not go over a full item"),
                        this.state.currentMovingDirection > 0 ? (d < 0 ? t - (l.length / 2 + d + l.nextElement.length / 2) : t - d) : d < 0 ? t - d : t - d + l.prevElement.length)
                    : (this.log("Snapping - start and end items are different"), t - d);
        }
        return t;
    }
    getPos({ changedTouches: e, clientX: t, clientY: i, target: s }) {
        return { x: e ? e[0].clientX : t, y: e ? e[0].clientY : i, target: s };
    }
    onDown(e) {
        if (!this.enabled) return;
        let { x: t, y: i } = this.getPos(e),
            { flags: s, on: n } = this.state;
        (s.mousedown = !0), (n.x = t), (n.y = i);
    }
    onMove(e) {
        if (!this.enabled) return;
        let t = this.state;
        if (!t.flags.mousedown) return;
        let { x: i, y: s } = this.getPos(e);
        t.flags.dragging = !0;
        let { off: n, on: l } = t,
            a = i - l.x,
            r = s - l.y;
        Math.abs(a) > Math.abs(r) && e.cancelable && e.preventDefault(), "vertical" == this.opts.direction ? (t.target = n + r * this.opts.speed) : (t.target = n + a * this.opts.speed);
    }
    onUp(e) {
        if (!this.enabled) return;
        this.log("on up");
        let t = this.state;
        this.opts.snap && (t.target = this.snapTargetOnDrag(t.target));
        let i = t.flags.dragging;
        if (((t.flags.mousedown = !1), (t.flags.dragging = !1), (t.off = t.target), i)) {
            if (((t.flags.click = !1), e.cancelable)) return e.preventDefault(), e.stopPropagation(), this.log("ending dragging"), !1;
        } else (t.flags.click = !0), this.log("simple click");
    }
    onClick(e) {
        if (this.enabled) {
            if ((this.log("on click. Drag? " + !this.state.flags.click), this.state.flags.click)) {
                let t = null;
                null != e.target && null != (t = e.target.querySelector("a")) && t.click();
            }
            this.state.flags.click = !1;
        }
    }
    isItemInsideView(e, t) {
        let i = 0,
            s = 0,
            n = t.start + t.translate,
            l = t.end + t.translate;
        return "vertical" == this.opts.direction ? ((i = e.top + 5), (s = e.bottom - 5)) : ((i = e.left + 5), (s = e.right - 5)), l > i && n < s;
    }
    distanceToCenter(e) {
        if (null == e) return null;
        let t = this.viewportSize(),
            i = this.viewportShift(),
            s = gsap.utils.wrap(0, this.length, Math.abs(this.state.target)) * Math.sign(this.state.target);
        return e.start + s - (i + (t - e.length) / 2);
    }
    goTo(e) {
        if (e < 0 || e >= this.items.length) return;
        let t = this.items[e];
        (this.state.target -= this.distanceToCenter(t)), (this.state.off = this.state.target);
    }
    update() {
        let e = this.viewportSize(),
            t = this.viewportShift(),
            i = gsap.utils.wrap(0, this.length, Math.abs(this.state.target)),
            s = Math.sign(this.state.target),
            n = 0;
        for (let l = 0; l < this.items.length; l++) {
            let a = this.items[l],
                r = i * s;
            r < 0 && a.end + r < e + t + a.length - this.length && (r += this.length), r > 0 && a.end + r > this.length && (r -= this.length);
            let o = a.start + r - (t + (e - a.length) / 2);
            if (Math.abs(o) < a.length / 2) {
                n = l;
                break;
            }
        }
        if (null != this.el) {
            let { top: e, left: t, width: i, height: s } = this.el.getBoundingClientRect();
            (this.vh = s), (this.vw = i), (this.vshifth = e), (this.vshiftw = t);
        } else (this.vh = store.wh), (this.vw = store.ww), (this.vshifth = 0), (this.vshiftw = 0);
        this.length = 0;
        for (let e = 0; e < this.items.length; e++) {
            let t = this.items[e];
            if ("vertical" == this.opts.direction) {
                t.el.style.transform = "translate(0, 0px)";
                let { left: e, right: i, top: s, bottom: n, width: l, height: a } = t.el.getBoundingClientRect();
                (this.length += a), (t.start = s), (t.end = n), (t.length = a);
            } else {
                t.el.style.transform = "translate(0px, 0)";
                let { left: e, right: i, top: s, bottom: n, width: l, height: a } = t.el.getBoundingClientRect();
                (this.length += l), (t.start = e), (t.end = i), (t.length = l);
            }
        }
        let l = 0;
        if (n < this.items.length / 2)
            if ("vertical" == this.opts.direction)
                for (let e = 0; e < n; e++) {
                    l -= this.items[e].length;
                }
            else
                for (let e = n; e < this.items.length / 2; e++) {
                    l += this.items[e].length;
                }
        else if ("vertical" == this.opts.direction)
            for (let e = this.items.length / 2; e <= n; e++) {
                l += this.items[e].length;
            }
        else
            for (let e = this.items.length / 2; e < n; e++) {
                l -= this.items[e].length;
            }
        (this.state.currentRounded = this.state.current = this.state.target = l), (this.state.off = this.state.target);
    }
    onResize(e) {
        (this.state.flags.resizing = !0), this.update(), (this.state.flags.resizing = !1), this.log("on resize");
    }
    onPagination(e) {
        if (!this.enabled) return;
        let t = -1;
        for (let i = 0; i < this.itemsPagination.length; i++) {
            if (this.itemsPagination[i].el === e.currentTarget) {
                t = i;
                break;
            }
        }
        if (t >= 0 && null != this.state.currentSlideItem) {
            let e = this.itemsInitial;
            this.state.currentSlideItem.clone && (e = this.itemsCloned);
            let i = e[t];
            (this.state.target -= this.distanceToCenter(i)), (this.state.off = this.state.target);
        }
    }
    onPrev(e) {
        if (!this.enabled) return;
        let t = this.viewportSize(),
            i = this.viewportShift(),
            s = gsap.utils.wrap(0, this.length, Math.abs(this.state.target)),
            n = Math.sign(this.state.target);
        for (let e = 0; e < this.items.length; e++) {
            let l = this.items[e],
                a = s * n;
            a < 0 && l.end + a < t + i + l.length - this.length && (a += this.length), a > 0 && l.end + a > this.length && (a -= this.length);
            let r = l.start + a - (i + (t - l.length) / 2);
            Math.abs(r) < l.length / 2 && ((this.state.target = this.state.target - r + l.prevElement.length), (this.state.off = this.state.target));
        }
    }
    onNext(e) {
        if (!this.enabled) return;
        let t = this.viewportSize(),
            i = this.viewportShift(),
            s = gsap.utils.wrap(0, this.length, Math.abs(this.state.target)),
            n = Math.sign(this.state.target);
        for (let e = 0; e < this.items.length; e++) {
            let l = this.items[e],
                a = s * n;
            a < 0 && l.end + a < t + i + l.length - this.length && (a += this.length), a > 0 && l.end + a > this.length && (a -= this.length);
            let r = l.start + a - (i + (t - l.length) / 2);
            Math.abs(r) < l.length / 2 && ((this.state.target = this.state.target - (l.length / 2 + r + l.nextElement.length / 2)), (this.state.off = this.state.target));
        }
    }
    onWheel(e) {
        if (!this.enabled) return;
        let t = performance.now(),
            i = this.state,
            s = 0.2 * normalizeWheel(e).pixelY,
            { x: n, y: l } = this.getPos(e);
        i.flags.dragging = !1;
        let { off: a, on: r } = i;
        if ((this.log("Event timestamp: " + t + " Scroll delta " + s), this.opts.snap && null != this.snapWheelEvents.tsSnap)) {
            if (t - this.snapWheelEvents.tsSnap <= this.opts.snapwait.after) return void this.log("Ignoring wheel event as there is a snapping going on");
            this.log("Resetting the snapping events buffer"), (this.snapWheelEvents.tsSnap = null), (this.snapWheelEvents.events = []);
        }
        (i.target -= s * this.opts.speed), this.opts.snap && this.snapWheelEvents.events.push({ ts: t, delta: s, currentTarget: i.target }), "vertical" == this.opts.direction ? (r.y = i.target) : (r.x = i.target), (i.off = i.target);
    }
    updateWheelSnap() {
        if (this.opts.snap && this.snapWheelEvents.events.length > 0) {
            let e = performance.now();
            if (e - this.snapWheelEvents.events[this.snapWheelEvents.events.length - 1].ts > this.opts.snapwait.before) {
                let t = 0,
                    i = 0,
                    s = 1e4,
                    n = 0,
                    l = 0,
                    a = 1e4,
                    r = 0;
                for (let e = 0; e < this.snapWheelEvents.events.length; e++) {
                    let o = this.snapWheelEvents.events[e];
                    if ((0 == e && (r = o.currentTarget), e > 0)) {
                        let n = this.snapWheelEvents.events[e - 1],
                            l = o.ts - n.ts;
                        (t += l), i < l && (i = l), s > l && (s = l);
                    }
                    let h = o.delta;
                    (n += h), l < h && (l = h), a > h && (a = h);
                }
                this.log(
                    "--\x3e Event timestamp: " +
                    e +
                    ". Snapping.\nAvg time interval between scroll events: " +
                    t / this.snapWheelEvents.events.length +
                    ".\nMin time interval between scroll events: " +
                    s +
                    ".\nMax time interval between scroll events: " +
                    i +
                    ".\nWheel events count: " +
                    this.snapWheelEvents.events.length
                ),
                    this.log(
                        "Total delta interval: " +
                        n +
                        ".\nAvg delta interval between scroll events: " +
                        n / this.snapWheelEvents.events.length +
                        ".\nMin delta interval between scroll events: " +
                        a +
                        ".\nMax delta interval between scroll events: " +
                        l +
                        "."
                    );
                let o = this.state,
                    { off: h, on: d } = o;
                (o.target = this.snapTargetOnWheel(r, o.target)), "vertical" == this.opts.direction ? (d.y = o.target) : (d.x = o.target), (o.off = o.target), (this.snapWheelEvents.tsSnap = e), (this.snapWheelEvents.events = []);
            }
        }
    }
    setupWebGL() {
        if (!this.opts.webgl) return;
        let e = "",
            t = `\n\t\t\tvarying vec2 vUv;\n\n\t\t\tuniform sampler2D currentImage;\n\t\t\tuniform sampler2D nextImage;\n\t\t\tuniform sampler2D disp;\n\t\t\tuniform float dispFactor;\n\t\t\tuniform float effectFactor;\n\t\t\tuniform vec4 resolution;\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n\t\t\t\tvec4 disp = texture2D(disp, uv);\n\t\t\t\t\n\t\t\t\t${(e =
                "horizontal" == this.opts.webgl_direction
                    ? "\n\t\t\t\t// Horizontal Effect\n\t\t\t\tvec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);\n\t\t\t\tvec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);\n\t\t\t"
                    : "\n\t\t\t\t// Vertical Effect\t\t\t\n\t\t\t\tvec2 distortedPosition = vec2(uv.x, uv.y - dispFactor * (disp.r*effectFactor));\n\t\t\t\tvec2 distortedPosition2 = vec2(uv.x, uv.y + (1.0 - dispFactor) * (disp.r*effectFactor));\n\t\t\t")}\n\t\t\t\t\n\t\t\t\tvec4 _currentImage = texture2D(currentImage, distortedPosition);\n\t\t\t\tvec4 _nextImage = texture2D(nextImage, distortedPosition2);\n\t\t\t\tvec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);\n\n\t\t\t\tgl_FragColor = finalTexture; }\n\n\t\t\t`;
        (this.gl_canvas = new ClapatWebGL({ vertex: "varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\t}", fragment: t })), (this.gl_canvas.isRunning = !1);
        let i = this,
            s = this.gl_canvas,
            n = function (e) {
                let t = Math.round((-i.length / 2) * 100) / 100,
                    n = gsap.utils.wrap(0, 1, i.state.prevRounded / t);
                if (i.state.prevRounded > i.state.currentRounded && n > i.state.progress) console.log("fBeginTransition: Moving forward but we rewind. Current index: " + e + " Position: " + i.state.progress);
                else if (i.state.prevRounded < i.state.currentRounded && n < i.state.progress) console.log("fBeginTransition: Moving backward but we fast forward. Current index: " + e + " Position: " + i.state.progress);
                else if (i.state.currentMovingDirection >= 0) {
                    console.log("fBeginTransition: Transition started - new current index " + e + " Moving forward. Position: " + i.state.progress);
                    let t = e + 1;
                    t >= a && (t = 0),
                        (s.material.uniforms.currentImage.value = s.textures[e]),
                        (s.material.uniforms.currentImage.needsUpdate = !0),
                        (s.material.uniforms.nextImage.value = s.textures[t]),
                        (s.material.uniforms.nextImage.needsUpdate = !0),
                        (s.material.uniforms.dispFactor.value = 0);
                } else
                    console.log("fBeginTransition: Transition started - new current index " + e + " Moving backward. Position: " + i.state.progress),
                        (s.material.uniforms.dispFactor.value = 1),
                        (s.material.uniforms.currentImage.value = s.textures[e]),
                        (s.material.uniforms.currentImage.needsUpdate = !0),
                        (s.material.uniforms.nextImage.value = s.textures[e]),
                        (s.material.uniforms.nextImage.needsUpdate = !0);
            },
            l = function (e) {
                let t = Math.round((-i.length / 2) * 100) / 100,
                    n = gsap.utils.wrap(0, 1, i.state.prevRounded / t);
                if (i.state.prevRounded > i.state.currentRounded && n > i.state.progress)
                    return console.log("fEndTransition: Moving forward but we rewind. Current index: " + e + " Position: " + i.state.progress), void (s.material.uniforms.dispFactor.value = 0);
                if (i.state.prevRounded < i.state.currentRounded && n < i.state.progress)
                    return console.log("fEndTransition: Moving backward but we fast forward. Current index: " + e + " Position: " + i.state.progress), void (s.material.uniforms.dispFactor.value = 0);
                if ((e >= a && (e = 0), i.state.currentMovingDirection < 0)) {
                    console.log("fEndTransition: Transition ended - new current index " + e + " Moving backward. Position: " + i.state.progress);
                    let t = e - 1;
                    t < 0 && (t = a - 1),
                        (s.material.uniforms.currentImage.value = s.textures[t]),
                        (s.material.uniforms.currentImage.needsUpdate = !0),
                        (s.material.uniforms.nextImage.value = s.textures[e]),
                        (s.material.uniforms.nextImage.needsUpdate = !0),
                        (s.material.uniforms.dispFactor.value = 0);
                } else
                    console.log("fEndTransition: Transition ended - new current index " + e + " Moving forward. Position: " + i.state.progress),
                        (s.material.uniforms.currentImage.value = s.textures[e]),
                        (s.material.uniforms.currentImage.needsUpdate = !0),
                        (s.material.uniforms.dispFactor.value = 0);
            },
            a = s.images.length,
            r = 1 / a;
        if (i.opts.snap) {
            let e = r / 6,
                t = 5 * e;
            s.onTexturesLoaded = function () {
                (s.material.uniforms.nextImage.value = s.textures[0]), (s.material.uniforms.nextImage.needsUpdate = !0);
                for (let r = 0; r < a; r++)
                    0 == r
                        ? i.tl
                            .to({}, { duration: e / 2 }, 0)
                            .call(n, [0], ">")
                            .to(s.material.uniforms.dispFactor, { duration: t, value: 1, ease: "Sine.easeInOut" }, ">")
                            .call(l, [1], ">")
                        : i.tl
                            .to({}, { duration: e }, ">")
                            .call(n, [r], ">")
                            .to(s.material.uniforms.dispFactor, { duration: t, value: 1, ease: "Sine.easeInOut" }, ">")
                            .call(l, [r + 1], ">");
            };
        } else {
            let e = r / 2,
                t = r / 2;
            (s.onTexturesLoaded = function () {
                (s.material.uniforms.nextImage.value = s.textures[0]), (s.material.uniforms.nextImage.needsUpdate = !0);
                for (let r = 0; r < a; r++)
                    0 == r
                        ? i.tl
                            .to({}, { duration: t / 2 }, 0)
                            .call(n, [0], ">")
                            .to(s.material.uniforms.dispFactor, { duration: e, value: 1, ease: "slow(0.7,0.7,false)" }, ">")
                            .call(l, [1], ">")
                        : i.tl
                            .to({}, { duration: t }, ">")
                            .call(n, [r], ">")
                            .to(s.material.uniforms.dispFactor, { duration: e, value: 1, ease: "slow(0.7,0.7,false)" }, ">")
                            .call(l, [r + 1], ">");
            }),
                i.tl.to({}, { duration: t / 2 }, ">");
        }
    }
    debounce(e, t) {
        let i;
        return function (...s) {
            i && clearTimeout(i), (i = setTimeout(() => e(...s), t));
        };
    }
    isObject(e) {
        return e instanceof Object && !Array.isArray(e) && null !== e;
    }
    isElement(e) {
        return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
    }
    log(e) {
        1 == this.opts.debug && console.log(e);
    }
}
ClapatSlider.instances = [];
class GridItem {
    constructor(e, t) {
        (this.DOM = { el: null, imageWrap: null, imageCaption: null, image: null, imageInner: null }),
            (this.DOM.el = t),
            (this.DOM.imageWrap = this.DOM.el.querySelector(e.opts.selImageWrap)),
            null != this.DOM.imageWrap && (this.DOM.imageCaption = this.DOM.imageWrap.querySelector(e.opts.selImageCaption)),
            (this.DOM.image = this.DOM.el.querySelector(e.opts.selImage)),
            null != this.DOM.image && (this.DOM.imageInner = this.DOM.image.querySelector(e.opts.selImageInner));
    }
}
class ClapatGridPreview {
    constructor(e, t = {}) {
        if (((this.slider = e), !this.slider)) return;
        (this.opts = Object.assign(
            {
                selImageWrap: ".slide-moving",
                selImage: ".trigger-item",
                selImageCaption: ".slide-caption",
                selImageInner: ".section-image",
                selGrid: ".slider-thumbs-wrapper",
                selTriggeredItemClass: "triggered-item",
                selTriggeredImage: ".slider-zoom-wrapper",
                selPreviewEnabled: ".preview-mode-enabled",
                selContainer: "",
                selTargetEvents: ".slide-inner-height",
                selCloseThumbs: ".slider-close-preview",
                navigation: !0,
            },
            t
        )),
            (this.elGrid = document.querySelector(this.opts.selGrid)),
            (this.elTriggeredImage = document.querySelector(this.opts.selTriggeredImage)),
            (this.DOM = null),
            (this.allImages = null),
            (this.allImagesInner = null),
            (this.currentImage = null),
            (this.currentImageInner = null),
            (this.currentImageCaption = null),
            (this.on = { beforeShowGrid: null, flipShowGrid: null, beforeHideGrid: null, flipHideGrid: null, navigateTitleCaption: null, navigate: null }),
            (this.btnNext = this.btnPrev = null),
            this.slider.isObject(this.opts.navigation) || (1 == this.opts.navigation && ((this.btnNext = document.querySelector(".cp-button-next")), (this.btnPrev = document.querySelector(".cp-button-prev")))),
            this.slider.isObject(this.opts.navigation) && ((this.btnNext = document.querySelector(this.opts.navigation.nextEl)), (this.btnPrev = document.querySelector(this.opts.navigation.prevEl))),
            (this.noItemsPrev = this.noItemsNext = -1),
            this.slider.isObject(this.opts.limit) && ((this.noItemsPrev = this.opts.limit.prev), (this.noItemsNext = this.opts.limit.next)),
            (this.bGridSwiped = !1),
            document.querySelector(this.opts.selPreviewEnabled) && this.initEvents();
    }
    showGrid() {
        if (!this.slider) return;
        document.body.classList.add("grid-open"),
            "function" == typeof this.on.beforeShowGrid && this.on.beforeShowGrid(),
            (this.DOM = this.getDOMElements()),
            (this.allImages = this.DOM.grid.map((e) => (e.item.DOM.image.setAttribute("data-slide-index", e.item_index), e.item.DOM.image))),
            (this.allImagesInner = this.DOM.grid.map((e) => e.item.DOM.imageInner)),
            (this.currentImage = this.DOM.currentItem.DOM.image),
            (this.currentImageInner = this.DOM.currentItem.DOM.imageInner);
        const e = Flip.getState([this.allImages]),
            t = Flip.getState([this.currentImage]);
        this.slider && gsap.set(this.currentImage.closest(this.slider.opts.slides), { zIndex: 0 }),
            this.elGrid.append(...this.allImages),
            this.currentImage.setAttribute("data-slide-index", this.DOM.currentIndex),
            this.elTriggeredImage.append(this.currentImage),
            "function" == typeof this.on.flipShowGrid && this.on.flipShowGrid(e, t);
    }
    hideGrid() {
        "function" == typeof this.on.beforeHideGrid && this.on.beforeHideGrid(),
            document.body.classList.remove("grid-open"),
            (this.DOM = this.getDOMElements()),
            (this.allImages = document.querySelectorAll(this.opts.selGrid + " " + this.opts.selImage)),
            (this.currentImage = document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImage)),
            (this.currentImageCaption = document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImageCaption)),
            (this.currentImageInner = document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImageInner));
        const e = Flip.getState([this.allImages]),
            t = Flip.getState([this.currentImage]);
        this.allImages.forEach((e) => {
            let t = e.getAttribute("data-slide-index"),
                i = this.DOM.items[t];
            e.removeAttribute("data-slide-index"), e.classList.remove("current-image-preview"), i.DOM.imageWrap.appendChild(e);
        }),
            this.currentImage.removeAttribute("data-slide-index"),
            this.currentImage.classList.remove("current-image-preview"),
            this.DOM.currentItem.DOM.imageWrap.appendChild(this.currentImage);
        const i = document.querySelector(this.opts.selGrid);
        document.querySelector(this.opts.selTriggeredImage);
        for (i.classList.remove("flip-next-thumb", "flip-prev-thumb"); i.firstChild;) i.removeChild(i.firstChild);
        "function" == typeof this.on.flipHideGrid && this.on.flipHideGrid(e, t);
    }
    getDOMElements() {
        if (this.slider) return this.noItemsPrev >= 0 && this.noItemsNext >= 0 ? this.getRangeDOMElements() : this.getAllDOMElements();
    }
    getAllDOMElements() {
        if (!this.slider) return;
        const e = [];
        [...document.querySelectorAll(this.slider.opts.slides)].forEach((t) => {
            e.push(new GridItem(this, t));
        });
        const t = [];
        [...document.querySelectorAll("." + this.slider.opts.clones)].forEach((e) => {
            t.push(new GridItem(this, e));
        });
        let i = -1,
            s = slider.opts.direction,
            n = 0,
            l = 0;
        for (let t = 0; t < e.length; t++) {
            let a = e[t].DOM.el.getBoundingClientRect();
            if (("vertical" == s ? ((n = a.top), (l = a.bottom)) : ((n = a.left), (l = a.right)), n <= 0 && l > 0)) {
                i = t;
                break;
            }
        }
        const a = [];
        let r = -1;
        if ("vertical" == s) {
            let s = 0;
            if (i >= t.length) {
                for (index = i; index >= t.length; index--) {
                    let t = e[index];
                    t.DOM.el.classList.contains(this.opts.selTriggeredItemClass) ? (r = index) : a.push({ item_index: index, item: t }), s++;
                }
                for (index = 0; s < t.length; index++) {
                    let t = e[index];
                    t.DOM.el.classList.contains(this.opts.selTriggeredItemClass) ? (r = index) : a.push({ item_index: index, item: t }), s++;
                }
            } else {
                for (index = i; index < t.length; index++) {
                    let t = e[index];
                    t.DOM.el.classList.contains(this.opts.selTriggeredItemClass) ? (r = index) : a.push({ item_index: index, item: t }), s++;
                }
                for (index = e.length - 1; s < t.length; index--) {
                    let t = e[index];
                    t.DOM.el.classList.contains(this.opts.selTriggeredItemClass) ? (r = index) : a.push({ item_index: index, item: t }), s++;
                }
            }
        } else {
            let s = 0;
            for (; s < t.length;) {
                let t = gsap.utils.wrap(0, e.length, i + s),
                    n = e[t];
                n.DOM.el.classList.contains(this.opts.selTriggeredItemClass) ? (r = t) : a.push({ item_index: t, item: n }), s++;
            }
        }
        return { items: e, grid: a, currentItem: new GridItem(this, document.querySelector(this.slider.opts.slides + "." + this.opts.selTriggeredItemClass)), currentIndex: r };
    }
    getRangeDOMElements() {
        if (!this.slider) return;
        const e = [];
        [...document.querySelectorAll(this.slider.opts.slides)].forEach((t) => {
            e.push(new GridItem(this, t));
        });
        const t = [];
        [...document.querySelectorAll("." + this.slider.opts.clones)].forEach((e) => {
            t.push(new GridItem(this, e));
        });
        let i = -1;
        for (let t = 0; t < e.length; t++) {
            if (e[t].DOM.el.classList.contains(this.opts.selTriggeredItemClass)) {
                i = t;
                break;
            }
        }
        const s = [];
        let n = 1;
        for (; n <= this.noItemsPrev;) {
            let t = gsap.utils.wrap(0, e.length, i - n),
                l = e[t];
            s.unshift({ item_index: t, item: l }), n++;
        }
        for (n = 1; n <= this.noItemsNext;) {
            let t = gsap.utils.wrap(0, e.length, i + n),
                l = e[t];
            s.push({ item_index: t, item: l }), n++;
        }
        return { items: e, grid: s, currentItem: new GridItem(this, document.querySelector(this.slider.opts.slides + "." + this.opts.selTriggeredItemClass)), currentIndex: i };
    }
    moveThumbGrid(e = "next") {
        if (document.body.classList.contains("grid-open")) {
            if (this.noItemsPrev >= 0 && this.noItemsNext >= 0) return this.navigateRange(e);
            this.navigate(e);
        }
    }
    navigate(e = "next") {
        if (!this.slider) return;
        const t = document.querySelectorAll(this.opts.selGrid + " " + this.opts.selImage);
        if (t.length <= 0) return;
        const i = document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImage),
            s = (document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImageCaption), document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImageInner), document.querySelector(this.opts.selGrid)),
            n = document.querySelector(this.opts.selTriggeredImage);
        let l = Number(i.getAttribute("data-slide-index")),
            a = null;
        if ("next" == e)
            for (let e = 0; e < t.length; e++) {
                let i = t[e],
                    s = Number(i.getAttribute("data-slide-index"));
                if (null == a && s > l) {
                    a = i;
                    break;
                }
            }
        else
            for (let e = t.length - 1; e >= 0; e--) {
                let i = t[e],
                    s = Number(i.getAttribute("data-slide-index"));
                if (null == a && s < l) {
                    a = i;
                    break;
                }
            }
        const r = Flip.getState([t, , i]);
        null != a ? s.replaceChild(i, a) : "next" == e ? ((a = t[0]), s.appendChild(i)) : ((a = t[t.length - 1]), s.insertBefore(i, s.firstChild)), n.appendChild(a);
        let o = document.querySelectorAll(this.slider.opts.slides);
        null != o[l].querySelector(this.opts.selImageWrap) && this.on.navigateTitleCaption, $(this.slider.opts.slides).removeClass(this.opts.selTriggeredItemClass);
        let h = Number(a.getAttribute("data-slide-index")),
            d = o[h];
        if (d) {
            d.classList.add(this.opts.selTriggeredItemClass);
            d.querySelector(this.opts.selImageWrap);
        }
        slider.goTo(h), "function" == typeof this.on.navigate && this.on.navigate(r);
    }
    navigateRange(e = "next") {
        if (!this.slider) return;
        const t = document.querySelectorAll(this.slider.opts.slides),
            i = [];
        [...document.querySelectorAll(this.slider.opts.slides)].forEach((e) => {
            i.push(new GridItem(this, e));
        });
        const s = document.querySelectorAll(this.opts.selGrid + " " + this.opts.selImage),
            n = document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImage),
            l = (document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImageCaption), document.querySelector(this.opts.selTriggeredImage + " " + this.opts.selImageInner), document.querySelector(this.opts.selGrid)),
            a = document.querySelector(this.opts.selTriggeredImage);
        let r = Number(n.getAttribute("data-slide-index")),
            o = -1;
        o = "next" == e ? gsap.utils.wrap(0, t.length, r + 1) : gsap.utils.wrap(0, t.length, r - 1);
        const h = Flip.getState([n]);
        let d = [...document.querySelectorAll(this.opts.selGrid + " " + this.opts.selImage)];
        d.length > 0 && ("next" == e ? d.shift() : d.pop());
        const c = Flip.getState(d);
        let p = null;
        if (s.length > 0) {
            for (let e = 0; e < s.length; e++) {
                let t = s[e];
                if (Number(t.getAttribute("data-slide-index")) == o) {
                    p = t;
                    break;
                }
            }
            n.classList.add("current-image-preview"), null != p && l.replaceChild(n, p), a.appendChild(p), p.classList.add("current-image-preview");
            const t = p.dataset.projectbgcolor;
            gsap.to("main, .header-gradient", { duration: 0.5, delay: 0.15, backgroundColor: t, ease: Power2.easeInOut }),
                document.getElementById("clapat-page-content").classList.contains("light-content")
                    ? p.classList.contains("change-header")
                        ? (gsap.to("#clapat-logo img.black-logo", { duration: 0.5, delay: 0.15, opacity: 1, ease: Power2.easeInOut }),
                            gsap.to("#clapat-logo img.white-logo", { duration: 0.5, delay: 0.15, opacity: 0, ease: Power2.easeInOut }),
                            gsap.to(".classic-menu .flexnav li", { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut }),
                            gsap.to("header .button-wrap.menu", { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut }),
                            gsap.to("header .button-icon-link", { duration: 0.5, delay: 0.15, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease: Power2.easeInOut }),
                            gsap.to(".button-icon-link.cp-button-prev, .button-icon-link.cp-button-next", { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut }))
                        : (gsap.to("#clapat-logo img.black-logo", { duration: 0.5, delay: 0.15, opacity: 0, ease: Power2.easeInOut }),
                            gsap.to("#clapat-logo img.white-logo", { duration: 0.5, delay: 0.15, opacity: 1, ease: Power2.easeInOut }),
                            gsap.to(".classic-menu .flexnav li", { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut }),
                            gsap.to("header .button-wrap.menu", { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut }),
                            gsap.to("header .button-icon-link", { duration: 0.5, delay: 0.15, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease: Power2.easeInOut }),
                            gsap.to(".button-icon-link.cp-button-prev, .button-icon-link.cp-button-next", { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut }))
                    : document.getElementById("clapat-page-content").classList.contains("dark-content") &&
                    (p.classList.contains("change-header")
                        ? (gsap.to("#clapat-logo img.black-logo", { duration: 0.5, delay: 0.15, opacity: 0, ease: Power2.easeInOut }),
                            gsap.to("#clapat-logo img.white-logo", { duration: 0.5, delay: 0.15, opacity: 1, ease: Power2.easeInOut }),
                            gsap.to(".classic-menu .flexnav li", { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut }),
                            gsap.to("header .button-wrap.menu", { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut }),
                            gsap.to("header .button-icon-link", { duration: 0.5, delay: 0.15, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease: Power2.easeInOut }),
                            gsap.to(".button-icon-link.cp-button-prev, .button-icon-link.cp-button-next", { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut }))
                        : (gsap.to("#clapat-logo img.black-logo", { duration: 0.5, delay: 0.15, opacity: 1, ease: Power2.easeInOut }),
                            gsap.to("#clapat-logo img.white-logo", { duration: 0.5, delay: 0.15, opacity: 0, ease: Power2.easeInOut }),
                            gsap.to(".classic-menu .flexnav li", { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut }),
                            gsap.to("header .button-wrap.menu", { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut }),
                            gsap.to("header .button-icon-link", { duration: 0.5, delay: 0.15, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease: Power2.easeInOut }),
                            gsap.to(".button-icon-link.cp-button-prev, .button-icon-link.cp-button-next", { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut }))),
                "next" == e ? (l.classList.add("flip-next-thumb"), l.classList.remove("flip-prev-thumb")) : (l.classList.add("flip-prev-thumb"), l.classList.remove("flip-next-thumb"));
        } else {
            let e = i[o];
            e.DOM.image.setAttribute("data-slide-index", o), (p = e.DOM.image), a.replaceChild(n, p);
            let t = n.getAttribute("data-slide-index");
            (e = i[t]), n.removeAttribute("data-slide-index"), e.DOM.imageWrap.appendChild(n);
        }
        null != t[r].querySelector(this.opts.selImageWrap) && this.on.navigateTitleCaption, $(this.slider.opts.slides).removeClass(this.opts.selTriggeredItemClass);
        let u = Number(p.getAttribute("data-slide-index")),
            g = t[u];
        if (g) {
            g.classList.add(this.opts.selTriggeredItemClass);
            g.querySelector(this.opts.selImageWrap);
        }
        if (((r = o), s.length > 0))
            if ("next" == e) {
                let e = s[0],
                    n = e.getAttribute("data-slide-index"),
                    a = i[n];
                e.removeAttribute("data-slide-index"),
                    gsap.to(e, {
                        duration: 0.3,
                        delay: 0,
                        opacity: 0,
                        x: -30,
                        onComplete: () => {
                            gsap.set(e, { x: 0 }),
                                e.classList.remove("current-image-preview"),
                                a.DOM.imageWrap.appendChild(e),
                                (n = gsap.utils.wrap(0, t.length, r + this.noItemsNext)),
                                (a = i[n]),
                                a.DOM.image.setAttribute("data-slide-index", n),
                                l.appendChild(a.DOM.image),
                                gsap.set(a.DOM.image, { opacity: 0, scale: 1, x: 30 }),
                                gsap.to(a.DOM.image, { duration: 0.3, delay: 0.1, opacity: 1, x: 0 });
                        },
                    });
            } else {
                let e = s[s.length - 1],
                    n = e.getAttribute("data-slide-index"),
                    a = i[n];
                e.removeAttribute("data-slide-index"),
                    gsap.to(e, {
                        duration: 0.3,
                        delay: 0,
                        opacity: 0,
                        x: 30,
                        onComplete: () => {
                            gsap.set(e, { x: 0 }), e.classList.remove("current-image-preview"), a.DOM.imageWrap.appendChild(e);
                            let s = document.querySelectorAll(this.opts.selGrid + " " + this.opts.selImage)[0];
                            (n = gsap.utils.wrap(0, t.length, r - this.noItemsPrev)),
                                (a = i[n]),
                                a.DOM.image.setAttribute("data-slide-index", n),
                                l.insertBefore(a.DOM.image, s),
                                gsap.set(a.DOM.image, { opacity: 0, scale: 1, x: -30 }),
                                gsap.to(a.DOM.image, { duration: 0.3, delay: 0.1, opacity: 1, x: 0 });
                        },
                    });
            }
        slider.goTo(u), "function" == typeof this.on.navigate && this.on.navigate(h, c);
    }
    throttle(e, t = 250) {
        let i = !1;
        return (...s) => {
            i ||
                (e(...s),
                    (i = !0),
                    setTimeout(() => {
                        i = !1;
                    }, t));
        };
    }
    initEvents() {
        if (!this.slider) return;
        document.querySelectorAll(this.opts.selTargetEvents).forEach((e) => {
            e.addEventListener("click", (e) => {
                $(this.opts.selContainer).length > 0 && (e.currentTarget.closest(this.slider.opts.slides).classList.add(this.opts.selTriggeredItemClass), this.showGrid());
            });
        }),
            window.addEventListener("wheel", (e) => {
                document.body.classList.contains("grid-open") && $(this.opts.selContainer).length > 0 && this.hideGrid();
            }),
            window.addEventListener("touchmove", (e) => {
                document.body.classList.contains("grid-open") && $(this.opts.selContainer).length > 0 && (this.bGridSwiped = !0);
            }),
            window.addEventListener("touchcancel", (e) => {
                document.body.classList.contains("grid-open") && $(this.opts.selContainer).length > 0 && (this.bGridSwiped = !1);
            }),
            window.addEventListener("touchend", (e) => {
                document.body.classList.contains("grid-open") && this.bGridSwiped && $(this.opts.selContainer).length > 0 && ((this.bGridSwiped = !1), this.hideGrid());
            });
        const e = document.querySelector(this.opts.selCloseThumbs);
        null != e &&
            e.addEventListener("click", (e) => {
                document.body.classList.contains("grid-open") && $(this.opts.selContainer).length > 0 && this.hideGrid();
            }),
            null != this.btnNext &&
            this.btnNext.addEventListener(
                "click",
                this.throttle((e) => {
                    this.moveThumbGrid("next");
                }, 1e3)
            ),
            null != this.btnPrev &&
            this.btnPrev.addEventListener(
                "click",
                this.throttle((e) => {
                    this.moveThumbGrid("prev");
                }, 1e3)
            );
    }
}
