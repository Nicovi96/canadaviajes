/*
 * Nivo Lightbox v1.2.0
 * http://dev7studios.com/nivo-lightbox
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(e, t, n, r) {
    function o(t, n) {
        this.el = t;
        this.$el = e(this.el);
        this.options = e.extend({}, s, n);
        this._defaults = s;
        this._name = i;
        this.init()
    }
    var i = "nivoLightbox",
        s = {
            effect: "fade",
            theme: "default",
            keyboardNav: true,
            clickOverlayToClose: true,
            onInit: function() {},
            beforeShowLightbox: function() {},
            afterShowLightbox: function(e) {},
            beforeHideLightbox: function() {},
            afterHideLightbox: function() {},
            onPrev: function(e) {},
            onNext: function(e) {},
            errorMessage: "The requested content cannot be loaded. Please try again later."
        };
    o.prototype = {
        init: function() {
            var t = this;
            if (!e("html").hasClass("nivo-lightbox-notouch")) e("html").addClass("nivo-lightbox-notouch");
            if ("ontouchstart" in n) e("html").removeClass("nivo-lightbox-notouch");
            this.$el.on("click", function(e) {
                t.showLightbox(e)
            });
            if (this.options.keyboardNav) {
                e("body").off("keyup").on("keyup", function(n) {
                    var r = n.keyCode ? n.keyCode : n.which;
                    if (r == 27) t.destructLightbox();
                    if (r == 37) e(".nivo-lightbox-prev").trigger("click");
                    if (r == 39) e(".nivo-lightbox-next").trigger("click")
                })
            }
            this.options.onInit.call(this)
        },
        showLightbox: function(t) {
            var n = this,
                r = this.$el;
            var i = this.checkContent(r);
            if (!i) return;
            t.preventDefault();
            this.options.beforeShowLightbox.call(this);
            var s = this.constructLightbox();
            if (!s) return;
            var o = s.find(".nivo-lightbox-content");
            if (!o) return;
            e("body").addClass("nivo-lightbox-body-effect-" + this.options.effect);
            this.processContent(o, r);
            if (this.$el.attr("data-lightbox-gallery")) {
                var u = e('[data-lightbox-gallery="' + this.$el.attr("data-lightbox-gallery") + '"]');
                e(".nivo-lightbox-nav").show();
                e(".nivo-lightbox-prev").off("click").on("click", function(t) {
                    t.preventDefault();
                    var i = u.index(r);
                    r = u.eq(i - 1);
                    if (!e(r).length) r = u.last();
                    n.processContent(o, r);
                    n.options.onPrev.call(this, [r])
                });
                e(".nivo-lightbox-next").off("click").on("click", function(t) {
                    t.preventDefault();
                    var i = u.index(r);
                    r = u.eq(i + 1);
                    if (!e(r).length) r = u.first();
                    n.processContent(o, r);
                    n.options.onNext.call(this, [r])
                })
            }
            setTimeout(function() {
                s.addClass("nivo-lightbox-open");
                n.options.afterShowLightbox.call(this, [s])
            }, 1)
        },
        checkContent: function(e) {
            var t = this,
                n = e.attr("href"),
                r = n.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            if (n.match(/\.(jpeg|jpg|gif|png)$/i) !== null) {
                return true
            } else if (r) {
                return true
            } else if (e.attr("data-lightbox-type") == "ajax") {
                return true
            } else if (n.substring(0, 1) == "#" && e.attr("data-lightbox-type") == "inline") {
                return true
            } else if (e.attr("data-lightbox-type") == "iframe") {
                return true
            }
            return false
        },
        processContent: function(n, r) {
            var i = this,
                s = r.attr("href"),
                o = s.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            n.html("").addClass("nivo-lightbox-loading");
            if (this.isHidpi() && r.attr("data-lightbox-hidpi")) {
                s = r.attr("data-lightbox-hidpi")
            }
            if (s.match(/\.(jpeg|jpg|gif|png)$/i) !== null) {
                var u = e("<img>", {
                    src: s
                });
                u.one("load", function() {
                    var r = e('<div class="nivo-lightbox-image" />');
                    r.append(u);
                    n.html(r).removeClass("nivo-lightbox-loading");
                    r.css({
                        "line-height": e(".nivo-lightbox-content").height() + "px",
                        height: e(".nivo-lightbox-content").height() + "px"
                    });
                    e(t).resize(function() {
                        r.css({
                            "line-height": e(".nivo-lightbox-content").height() + "px",
                            height: e(".nivo-lightbox-content").height() + "px"
                        })
                    })
                }).each(function() {
                    if (this.complete) e(this).load()
                });
                u.error(function() {
                    var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(t).removeClass("nivo-lightbox-loading")
                })
            } else if (o) {
                var a = "",
                    f = "nivo-lightbox-video";
                if (o[1] == "youtube") {
                    a = "http://www.youtube.com/embed/" + o[4];
                    f = "nivo-lightbox-youtube"
                }
                if (o[1] == "youtu") {
                    a = "http://www.youtube.com/embed/" + o[3];
                    f = "nivo-lightbox-youtube"
                }
                if (o[1] == "vimeo") {
                    a = "http://player.vimeo.com/video/" + o[3];
                    f = "nivo-lightbox-vimeo"
                }
                if (a) {
                    var l = e("<iframe>", {
                        src: a,
                        "class": f,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: "auto"
                    });
                    n.html(l);
                    l.load(function() {
                        n.removeClass("nivo-lightbox-loading")
                    })
                }
            } else if (r.attr("data-lightbox-type") == "ajax") {
                e.ajax({
                    url: s,
                    cache: false,
                    success: function(r) {
                        var i = e('<div class="nivo-lightbox-ajax" />');
                        i.append(r);
                        n.html(i).removeClass("nivo-lightbox-loading");
                        if (i.outerHeight() < n.height()) {
                            i.css({
                                position: "relative",
                                top: "50%",
                                "margin-top": -(i.outerHeight() / 2) + "px"
                            })
                        }
                        e(t).resize(function() {
                            if (i.outerHeight() < n.height()) {
                                i.css({
                                    position: "relative",
                                    top: "50%",
                                    "margin-top": -(i.outerHeight() / 2) + "px"
                                })
                            }
                        })
                    },
                    error: function() {
                        var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                        n.html(t).removeClass("nivo-lightbox-loading")
                    }
                })
            } else if (s.substring(0, 1) == "#" && r.attr("data-lightbox-type") == "inline") {
                if (e(s).length) {
                    var c = e('<div class="nivo-lightbox-inline" />');
                    c.append(e(s).clone().show());
                    n.html(c).removeClass("nivo-lightbox-loading");
                    if (c.outerHeight() < n.height()) {
                        c.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(c.outerHeight() / 2) + "px"
                        })
                    }
                    e(t).resize(function() {
                        if (c.outerHeight() < n.height()) {
                            c.css({
                                position: "relative",
                                top: "50%",
                                "margin-top": -(c.outerHeight() / 2) + "px"
                            })
                        }
                    })
                } else {
                    var h = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(h).removeClass("nivo-lightbox-loading")
                }
            } else if (r.attr("data-lightbox-type") == "iframe") {
                var p = e("<iframe>", {
                    src: s,
                    "class": "nivo-lightbox-item",
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: "auto"
                });
                n.html(p);
                p.load(function() {
                    n.removeClass("nivo-lightbox-loading")
                })
            } else {
                return false
            }
            if (r.attr("title")) {
                var d = e("<span>", {
                    "class": "nivo-lightbox-title"
                });
                d.text(r.attr("title"));
                e(".nivo-lightbox-title-wrap").html(d)
            } else {
                e(".nivo-lightbox-title-wrap").html("")
            }
        },
        constructLightbox: function() {
            if (e(".nivo-lightbox-overlay").length) return e(".nivo-lightbox-overlay");
            var t = e("<div>", {
                "class": "nivo-lightbox-overlay nivo-lightbox-theme-" + this.options.theme + " nivo-lightbox-effect-" + this.options.effect
            });
            var n = e("<div>", {
                "class": "nivo-lightbox-wrap"
            });
            var r = e("<div>", {
                "class": "nivo-lightbox-content"
            });
            var i = e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');
            var s = e('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>');
            var o = e("<div>", {
                "class": "nivo-lightbox-title-wrap"
            });
            var u = 0;
            if (u) t.addClass("nivo-lightbox-ie");
            n.append(r);
            n.append(o);
            t.append(n);
            t.append(i);
            n.append(s);
            e("body").append(t);
            var a = this;
            if (a.options.clickOverlayToClose) {
                t.on("click", function(t) {
                    if (t.target === this || e(t.target).hasClass("nivo-lightbox-content") || e(t.target).hasClass("nivo-lightbox-image")) {
                        a.destructLightbox()
                    }
                })
            }
            s.on("click", function(e) {
                e.preventDefault();
                a.destructLightbox()
            });
            return t
        },
        destructLightbox: function() {
            var t = this;
            this.options.beforeHideLightbox.call(this);
            e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open");
            e(".nivo-lightbox-nav").hide();
            e("body").removeClass("nivo-lightbox-body-effect-" + t.options.effect);
            var n = 0;
            if (n) {
                e(".nivo-lightbox-overlay iframe").attr("src", " ");
                e(".nivo-lightbox-overlay iframe").remove()
            }
            e(".nivo-lightbox-prev").off("click");
            e(".nivo-lightbox-next").off("click");
            e(".nivo-lightbox-content").empty();
            this.options.afterHideLightbox.call(this)
        },
        isHidpi: function() {
            var e = "(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";
            if (t.devicePixelRatio > 1) return true;
            if (t.matchMedia && t.matchMedia(e).matches) return true;
            return false
        }
    };
    e.fn[i] = function(t) {
        return this.each(function() {
            if (!e.data(this, i)) {
                e.data(this, i, new o(this, t))
            }
        })
    }
})(jQuery, window, document)
