// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Functions {
    enum Location { Inline, Remote }
    enum CodeLanguage { JavaScript, Solidity }

    struct Request {
        string code;
        Location location;
        CodeLanguage language;
    }

    function initializeRequest(
        Request memory self,
        Location location,
        CodeLanguage language,
        string memory code
    ) internal pure {
        self.code = code;
        self.location = location;
        self.language = language;
    }
}
