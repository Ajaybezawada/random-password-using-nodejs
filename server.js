var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.method === "GET") {
        var q = url.parse(req.url, true).query;
        console.log(q)
        const keys = {
            letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            num_sym: "0123456789!@#$%^&*()_+~\`|}{[]:;?><,./-=",
            inc_chars: ""
        }
        const getKey = [
            function letters_yes() {
                return keys.letters[Math.floor(Math.random() * keys.letters.length)];
            },
            function num_sym() {
                return keys.num_sym[Math.floor(Math.random() * keys.num_sym.length)];
            }
        ];
        function inc_chars() {
            return keys.inc_chars[Math.floor(Math.random() * keys.inc_chars.length)];
        }

        const letters = q.letters;
        var i = 0;
        for (i = 0; i < 5; i++) {
            var chars1 = q.chrs;
            console.log(chars1);
            keys.inc_chars = chars1;
            var min_length = parseInt(q.lengths);
            var pass = keys.inc_chars;
            let password = "";
            var st_length = Math.floor(Math.random() * (15 - min_length) + min_length);
            while (st_length > password.length) {
                console.log(password);
                if (keys.inc_chars.length != 0) {
                    let keyToAdd = inc_chars();
                    var ch = keyToAdd;
                    password += ch;
                    pass = keys.inc_chars;
                    pass = pass.replace(ch, '');
                    keys.inc_chars = pass;
                    continue;
                }
                if (letters == "no") {
                    var items;
                    var item = 0;
                    if (q.num_sym == "on") {
                        var items = [0, 1];
                        item = items[Math.floor(Math.random() * items.length)];
                    }
                    if (item == 0) {
                        let keyToAdd = chars1[Math.floor(Math.random() * chars1.length)];
                        var ch = keyToAdd;
                        password += ch;
                    }
                    else {
                        let keyToAdd = getKey[1];
                        password += keyToAdd();
                    }
                    continue;
                }
                let keyToAdd = getKey[Math.floor(Math.random() * getKey.length)];
                password += keyToAdd();
            }
            var passBox = 'Password '.concat((i+1).toString());
            console.log(passBox)
            res.write('<h3>'+passBox+'</h3><p>'+password+'</p>');
        }
        res.end();
    }
});
server.listen(3000);