rv = (function () {
    function t(t, e) {
        (this.http = t),
            (this.auth = e),
            (this.sauces$ = new T()),
            (this.tempSauces = [
                {
                    _id: "eizomfhazo",
                    name: "The Last Dab",
                    manufacturer: "Heatonist",
                    description:
                        'CAUTION! The Last Dab—the hottest sauce on Hot Ones, known for turning guests and fans alike into stuttering, fire-breathing lunatics—just got even crazier. The Last Dab first took the world by storm as the only sauce made with Smokin\' Ed Currie\'s infamous "Pepper X." This XX-rated edition gets its one-two punch of heat from addition of the equally lethal "Chocolate Pepper X." All you need is a dab to light the inferno and experience the Hot Ones tradition.',
                    heat: 10,
                    likes: 100,
                    dislikes: 0,
                    imageUrl: "https://cdn.shopify.com/s/files/1/2086/9287/products/LAstdabReduxx_1024x1024-1_1024x1024.jpg?v=1527778720",
                    mainPepper: "Pepper X",
                    usersLiked: [],
                    usersDisliked: [],
                },
                {
                    _id: "oimhoiohmhoih",
                    name: "Los Calientes",
                    manufacturer: "Heatonist",
                    description:
                        "Hot Ones is the show where celebrities divulge their deepest secrets while eating progressively hotter wings. The middle of the lineup is where hot sauce magic happens—the perfect sweet spot between maximum flavor and pleasing heat. Inspired by our favorite Cali-Mex flavors, Los Calientes surfs over the palate with a punchy, smoky blend...",
                    heat: 5,
                    likes: 100,
                    dislikes: 0,
                    imageUrl: "https://cdn.shopify.com/s/files/1/2086/9287/products/LOS_CALIENTES1_1024x1024.jpg?v=1527709467",
                    mainPepper: "Serrano",
                    usersLiked: [],
                    usersDisliked: [],
                },
                {
                    _id: "oimjoijlhui",
                    name: "Black Garlic",
                    manufacturer: "Bravado Spice Company",
                    description:
                        "Team Bravado is back at it with an elevated offering where Carolina Reaper meets aged black garlic. The sweetness of the slowly cooked garlic tempers the initial bitter burn of the Reaper, but not for long... This is a biting hot sauce you'll want in marinades, sauces, dressings, and on those garlic wings! ",
                    heat: 6,
                    likes: 100,
                    dislikes: 0,
                    imageUrl: "https://cdn.shopify.com/s/files/1/2086/9287/products/bravado-blackgarlichotsauce_1024x1024.jpg?v=1527270029",
                    mainPepper: "Carolina Reaper",
                    usersLiked: [],
                    usersDisliked: [],
                },
                {
                    _id: "sildjhv",
                    name: "Smoked Onion",
                    manufacturer: "Butterfly Bakery",
                    description:
                        "The makers at Butterfly Bakery smoke Vermont onions with maplewood to mix with red jalapeños for this sweet and tangy sauce. Great on everything from bagels lox & cream cheese to hummus to pork and whatever else you can name. The medium heat level makes it the perfect smoky sauce for anyone!",
                    heat: 3,
                    likes: 100,
                    dislikes: 0,
                    imageUrl: "https://cdn.shopify.com/s/files/1/2086/9287/products/smokedonion1_1024x1024_copy_1024x1024.jpg?v=1538413599",
                    mainPepper: "Jalapeños",
                    usersLiked: [],
                    usersDisliked: [],
                },
                {
                    _id: "eroimfgjlfh",
                    name: "Blair's Ultra Death Sauce",
                    manufacturer: "Blair's",
                    description:
                        "Blair's Ultra Death has established itself as a bit of a legend within the hot sauce world.\n\nIf there's one thing that creator Blair Lazar does well it's retaining the flavour in his super-hot sauces. They'll melt your face off for sure, but despite the extract they still taste damned fine.\n\nJust to emphasise the seriousness of the heat we're dealing with here, all Blair's super-hot sauces in the Death range now come in a nifty coffin box with his trademark skull keyring attached to the bottle.",
                    heat: 9,
                    likes: 100,
                    dislikes: 0,
                    imageUrl: "https://www.chilliworld.com/content/images/thumbs/0000827_blairs-ultra-death-sauce-in-a-coffin_550.jpeg",
                    mainPepper: "Carolina Reaper",
                    usersLiked: [],
                    usersDisliked: [],
                },
            ]);
    }
    return (
        (t.prototype.getSauces = function () {
            var t = this;
            this.http.get("http://localhost:3000/api/sauces").subscribe(
                function (e) {
                    t.sauces$.next(e);
                },
                function (e) {
                    t.sauces$.next([]), console.error(e.error.message);
                }
            );
        }),
        (t.prototype.getSauceById = function (t) {
            var e = this;
            return new Promise(function (n, r) {
                e.http.get("http://localhost:3000/api/sauces/" + t).subscribe(
                    function (t) {
                        n(t);
                    },
                    function (t) {
                        r(t.error.message);
                    }
                );
            });
        }),
        (t.prototype.likeSauce = function (t, e) {
            var n = this;
            return new Promise(function (r, o) {
                n.http.post("http://localhost:3000/api/sauces/" + t + "/like", { userId: n.auth.getUserId(), like: e ? 1 : 0 }).subscribe(
                    function (t) {
                        r(e);
                    },
                    function (t) {
                        o(t.error.message);
                    }
                );
            });
        }),
        (t.prototype.dislikeSauce = function (t, e) {
            var n = this;
            return new Promise(function (r, o) {
                n.http.post("http://localhost:3000/api/sauces/" + t + "/like", { userId: n.auth.getUserId(), like: e ? -1 : 0 }).subscribe(
                    function (t) {
                        r(e);
                    },
                    function (t) {
                        o(t.error.message);
                    }
                );
            });
        }),
        (t.prototype.createSauce = function (t, e) {
            var n = this;
            return new Promise(function (r, o) {
                var i = new FormData();
                i.append("sauce", JSON.stringify(t)),
                    i.append("image", e),
                    n.http.post("http://localhost:3000/api/sauces", i).subscribe(
                        function (t) {
                            r(t);
                        },
                        function (t) {
                            o(t.error.message);
                        }
                    );
            });
        }),
        (t.prototype.modifySauce = function (t, e, n) {
            var r = this;
            return new Promise(function (o, i) {
                if ("string" == typeof n)
                    r.http.put("http://localhost:3000/api/sauces/" + t, e).subscribe(
                        function (t) {
                            return o(t);
                        },
                        function (t) {
                            return i(t.error.message);
                        }
                    );
                else {
                    var a = new FormData();
                    a.append("sauce", JSON.stringify(e)),
                        a.append("image", n),
                        r.http.put("http://localhost:3000/api/sauces/" + t, a).subscribe(
                            function (t) {
                                return o(t);
                            },
                            function (t) {
                                return i(t.error.message);
                            }
                        );
                }
            });
        }),
        (t.prototype.deleteSauce = function (t) {
            var e = this;
            return new Promise(function (n, r) {
                e.http.delete("http://localhost:3000/api/sauces/" + t).subscribe(
                    function (t) {
                        n(t);
                    },
                    function (t) {
                        r(t.error.message);
                    }
                );
            })
        )};
