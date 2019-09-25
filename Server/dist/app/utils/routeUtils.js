"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var _a = require('lib/path-utils'), ltrimSlashes = _a.ltrimSlashes, rtrimSlashes = _a.rtrimSlashes;
var ApiResponseType;
(function (ApiResponseType) {
    ApiResponseType[ApiResponseType["KoaResponse"] = 0] = "KoaResponse";
    ApiResponseType[ApiResponseType["Object"] = 1] = "Object";
})(ApiResponseType = exports.ApiResponseType || (exports.ApiResponseType = {}));
var ApiResponse = /** @class */ (function () {
    function ApiResponse(type, response) {
        this.type = type;
        this.response = response;
    }
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
// root:/Documents/MyFile.md
function splitItemPath(path) {
    if (!path)
        return [];
    var output = path.split('/');
    // Remove trailing ":" from root dir
    if (output.length && output[0][output[0].length - 1] === ':')
        output[0] = output[0].substr(0, output[0].length - 1);
    return output;
}
exports.splitItemPath = splitItemPath;
// Converts root:/path/to/file.md to /path/to/file.md
function removeFilePathPrefix(path) {
    if (!path || path.indexOf(':') < 0)
        return path;
    var p = path.split(':');
    return p[1];
}
exports.removeFilePathPrefix = removeFilePathPrefix;
// Allows parsing the two types of paths supported by the API:
//
// root:/Documents/MyFile.md:/content
// ABCDEFG/content
function parseSubPath(p) {
    p = rtrimSlashes(ltrimSlashes(p));
    var output = {
        value: '',
        link: '',
        addressingType: db_1.ItemAddressingType.Id,
    };
    var prefix = 'root:';
    if (p.indexOf(prefix) === 0) {
        output.addressingType = db_1.ItemAddressingType.Path;
        var secondIdx = p.indexOf(':', prefix.length);
        if (secondIdx < 0) {
            output.value = p;
        }
        else {
            output.value = p.substr(0, secondIdx);
            output.link = ltrimSlashes(p.substr(secondIdx + 1));
        }
    }
    else {
        var s = p.split('/');
        if (s.length >= 1)
            output.value = s[0];
        if (s.length >= 2)
            output.link = s[1];
    }
    return output;
}
exports.parseSubPath = parseSubPath;
function findMatchingRoute(path, routes) {
    var splittedPath = path.split('/');
    splittedPath.splice(0, 1);
    if (splittedPath.length >= 2) {
        var basePath_1 = splittedPath[0] + "/" + splittedPath[1];
        if (routes[basePath_1]) {
            splittedPath.splice(0, 2);
            return {
                route: routes[basePath_1],
                basePath: basePath_1,
                subPath: parseSubPath("/" + splittedPath.join('/')),
            };
        }
    }
    var basePath = splittedPath[0];
    if (routes[basePath]) {
        splittedPath.splice(0, 1);
        return {
            route: routes[basePath],
            basePath: basePath,
            subPath: parseSubPath("/" + splittedPath.join('/')),
        };
    }
    return null;
}
exports.findMatchingRoute = findMatchingRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLFFBQVEsQ0FBQztZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQixPQUFPLEVBQUUsWUFBWSxDQUFDLE1BQUksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQztTQUNuRCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUEzQkQsOENBMkJDIiwiZmlsZSI6InJvdXRlVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJdGVtSWQsIEl0ZW1BZGRyZXNzaW5nVHlwZSB9IGZyb20gJy4uL2RiJztcblxuY29uc3QgeyBsdHJpbVNsYXNoZXMsIHJ0cmltU2xhc2hlcyB9ID0gcmVxdWlyZSgnbGliL3BhdGgtdXRpbHMnKTtcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZSB7XG5cdGV4ZWM6IEZ1bmN0aW9uLFxuXHRuZWVkc0JvZHlNaWRkbGV3YXJlPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XG5cdFtrZXk6IHN0cmluZ106IFJvdXRlLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1YlBhdGggZXh0ZW5kcyBJdGVtSWQge1xuXHRsaW5rOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXRjaGVkUm91dGUge1xuXHRyb3V0ZTogUm91dGUsXG5cdGJhc2VQYXRoOiBzdHJpbmcsXG5cdHN1YlBhdGg6IFN1YlBhdGgsXG59XG5cbmV4cG9ydCBlbnVtIEFwaVJlc3BvbnNlVHlwZSB7XG5cdEtvYVJlc3BvbnNlLFxuXHRPYmplY3Rcbn1cblxuZXhwb3J0IGNsYXNzIEFwaVJlc3BvbnNlIHtcblx0dHlwZTogQXBpUmVzcG9uc2VUeXBlXG5cdHJlc3BvbnNlOiBhbnlcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOkFwaVJlc3BvbnNlVHlwZSwgcmVzcG9uc2U6YW55KSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0XHR0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG5cdH1cbn1cblxuLy8gcm9vdDovRG9jdW1lbnRzL015RmlsZS5tZFxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0SXRlbVBhdGgocGF0aDpzdHJpbmcpOnN0cmluZ1tdIHtcblx0aWYgKCFwYXRoKSByZXR1cm4gW107XG5cblx0Y29uc3Qgb3V0cHV0ID0gcGF0aC5zcGxpdCgnLycpO1xuXHQvLyBSZW1vdmUgdHJhaWxpbmcgXCI6XCIgZnJvbSByb290IGRpclxuXHRpZiAob3V0cHV0Lmxlbmd0aCAmJiBvdXRwdXRbMF1bb3V0cHV0WzBdLmxlbmd0aCAtIDFdID09PSAnOicpIG91dHB1dFswXSA9IG91dHB1dFswXS5zdWJzdHIoMCwgb3V0cHV0WzBdLmxlbmd0aCAtIDEpO1xuXHRyZXR1cm4gb3V0cHV0O1xufVxuXG4vLyBDb252ZXJ0cyByb290Oi9wYXRoL3RvL2ZpbGUubWQgdG8gL3BhdGgvdG8vZmlsZS5tZFxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZpbGVQYXRoUHJlZml4KHBhdGg6c3RyaW5nKTpzdHJpbmcge1xuXHRpZiAoIXBhdGggfHwgcGF0aC5pbmRleE9mKCc6JykgPCAwKSByZXR1cm4gcGF0aDtcblx0Y29uc3QgcCA9IHBhdGguc3BsaXQoJzonKTtcblx0cmV0dXJuIHBbMV07XG59XG5cbi8vIEFsbG93cyBwYXJzaW5nIHRoZSB0d28gdHlwZXMgb2YgcGF0aHMgc3VwcG9ydGVkIGJ5IHRoZSBBUEk6XG4vL1xuLy8gcm9vdDovRG9jdW1lbnRzL015RmlsZS5tZDovY29udGVudFxuLy8gQUJDREVGRy9jb250ZW50XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdWJQYXRoKHA6c3RyaW5nKTpTdWJQYXRoIHtcblx0cCA9IHJ0cmltU2xhc2hlcyhsdHJpbVNsYXNoZXMocCkpO1xuXG5cdGNvbnN0IG91dHB1dDpTdWJQYXRoID0ge1xuXHRcdHZhbHVlOiAnJyxcblx0XHRsaW5rOiAnJyxcblx0XHRhZGRyZXNzaW5nVHlwZTogSXRlbUFkZHJlc3NpbmdUeXBlLklkLFxuXHR9O1xuXG5cdGNvbnN0IHByZWZpeCA9ICdyb290Oic7XG5cdGlmIChwLmluZGV4T2YocHJlZml4KSA9PT0gMCkge1xuXHRcdG91dHB1dC5hZGRyZXNzaW5nVHlwZSA9IEl0ZW1BZGRyZXNzaW5nVHlwZS5QYXRoO1xuXG5cdFx0Y29uc3Qgc2Vjb25kSWR4ID0gcC5pbmRleE9mKCc6JywgcHJlZml4Lmxlbmd0aCk7XG5cblx0XHRpZiAoc2Vjb25kSWR4IDwgMCkge1xuXHRcdFx0b3V0cHV0LnZhbHVlID0gcDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b3V0cHV0LnZhbHVlID0gcC5zdWJzdHIoMCwgc2Vjb25kSWR4KTtcblx0XHRcdG91dHB1dC5saW5rID0gbHRyaW1TbGFzaGVzKHAuc3Vic3RyKHNlY29uZElkeCArIDEpKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgcyA9IHAuc3BsaXQoJy8nKTtcblx0XHRpZiAocy5sZW5ndGggPj0gMSkgb3V0cHV0LnZhbHVlID0gc1swXTtcblx0XHRpZiAocy5sZW5ndGggPj0gMikgb3V0cHV0LmxpbmsgPSBzWzFdO1xuXHR9XG5cblx0cmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNYXRjaGluZ1JvdXRlKHBhdGg6c3RyaW5nLCByb3V0ZXM6Um91dGVzKTpNYXRjaGVkUm91dGUge1xuXHRsZXQgc3BsaXR0ZWRQYXRoID0gcGF0aC5zcGxpdCgnLycpO1xuXHRzcGxpdHRlZFBhdGguc3BsaWNlKDAsIDEpO1xuXG5cdGlmIChzcGxpdHRlZFBhdGgubGVuZ3RoID49IDIpIHtcblx0XHRjb25zdCBiYXNlUGF0aCA9IGAke3NwbGl0dGVkUGF0aFswXX0vJHtzcGxpdHRlZFBhdGhbMV19YDtcblx0XHRpZiAocm91dGVzW2Jhc2VQYXRoXSkge1xuXHRcdFx0c3BsaXR0ZWRQYXRoLnNwbGljZSgwLCAyKTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJvdXRlOiByb3V0ZXNbYmFzZVBhdGhdLFxuXHRcdFx0XHRiYXNlUGF0aDogYmFzZVBhdGgsXG5cdFx0XHRcdHN1YlBhdGg6IHBhcnNlU3ViUGF0aChgLyR7c3BsaXR0ZWRQYXRoLmpvaW4oJy8nKX1gKSxcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYmFzZVBhdGggPSBzcGxpdHRlZFBhdGhbMF07XG5cdGlmIChyb3V0ZXNbYmFzZVBhdGhdKSB7XG5cdFx0c3BsaXR0ZWRQYXRoLnNwbGljZSgwLCAxKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cm91dGU6IHJvdXRlc1tiYXNlUGF0aF0sXG5cdFx0XHRiYXNlUGF0aDogYmFzZVBhdGgsXG5cdFx0XHRzdWJQYXRoOiBwYXJzZVN1YlBhdGgoYC8ke3NwbGl0dGVkUGF0aC5qb2luKCcvJyl9YCksXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuIl19