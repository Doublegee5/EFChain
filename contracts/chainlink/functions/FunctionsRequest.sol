// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Functions {
    enum Location {
        Inline,
        Remote
    }

    enum CodeLanguage {
        JavaScript,
        // add others if needed
    }

    struct Request {
        Location location;
        CodeLanguage language;
        string source;
    }

    function initializeRequest(
        Request memory self,
        Location location,
        CodeLanguage language,
        string memory source
    ) internal pure {
        self.location = location;
        self.language = language;
        self.source = source;
    }
}
